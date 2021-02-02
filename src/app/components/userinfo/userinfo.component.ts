import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/user.service';
import { Loading } from 'notiflix';
import { User } from 'src/app/models/user';
import { Report } from 'notiflix';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
  providers: [UserService]
})

export class UserinfoComponent implements OnInit {

  public formGroup: FormGroup;
  public formControl: FormControl;
  public user: User;
  public name: string = '';

  constructor(
    private _builder: FormBuilder,
    private _userService: UserService
  ) {

    Loading.Init({
      svgColor: '#E41912',
    });

    this.formGroup = this._builder.group({
      Name: [this.name, Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Address: ['', Validators.required],
      Password: ['', Validators.required]
    });

  }

  ngOnInit() {

    Loading.Dots('Cargando datos del usuario...');
    this.getUserData()

  }


  async getUserData() {

    let promise = new Promise<User>((resolve) => {
      this._userService.getUserInfo().subscribe(
        res => {
          resolve(res.user)
        }
      )
    })

    let user: User = await promise;
    this.fillFieldsWhithUserData(user);
    return user;

  }

  fillFieldsWhithUserData(user: User) {
    if (user != null) {

      let { name, lastName, address, email, phone } = user

      this.formGroup = this._builder.group({
        Name: [name, Validators.required],
        LastName: [lastName, Validators.required],
        Email: [email, [Validators.required, Validators.email]],
        Phone: [phone, [Validators.required, Validators.pattern('[0-9]*')]],
        Address: [address, Validators.required],
        Password: ['', Validators.required]
      })

      Loading.Remove();
    }
  }

  onSubmit(userData) {

    //get User data
    let { Email, Password } = userData
    let verificationStr = `{"password":"${Password}"}`

    const VerifycationPromise = new Promise( (resolve, reject) => {
      this._userService.verifyPassword(JSON.parse(verificationStr)).subscribe(
        res => resolve(res),
        err => reject(err)
      )
    } )

    VerifycationPromise.then(() => {
      
      const updateUserPromise = new Promise( (resolve, reject) => {
        this._userService.updateUser(userData).subscribe(
          res => resolve(res),
          err => resolve(err)
        )
      } )

      updateUserPromise.then( () => {
        this.reLogUser(Email, Password)
      })
      .catch((err: any)=> {
        Report.Failure(
          'Error al actualizar los datos de la cuenta.',
          `${err.error.message}`,
          'Ok'
        )
      })
      .catch(()=> {

      })


    })
    .catch((err: any) => {
      Report.Failure(
        'Error al verificar la cuenta',
        `${err.error.message}`,
        'Ok'
      )
    }) 

  }

  reLogUser(email: string, password: string) {
    let strLoggin: string = `{"email":"${email}","password":"${password}"}`
    let objectUserData: object = JSON.parse(strLoggin)

    let promise = new Promise((resolved, rejected) => {
      this._userService.logIn(objectUserData).subscribe(
        res => resolved(res),
        err => rejected(err)
      )
    })

    promise.then((res: any) => {
      let { token } = res
      localStorage.removeItem('token')
      localStorage.setItem('token', token)
      location.href = "/userinfo"
    })
    .catch((err: any)=> {
      Report.Failure(
        'Error al relogear',
        `${err.error.message}`,
        'Ok'
      )
    })
    .catch(() => {
    })
  }

  showPasswordValidation(e) {
    e.preventDefault()
    const validationBlock = document.getElementById('psw-val')

    if (validationBlock.classList.contains('hidden')) {
      validationBlock.classList.remove('hidden')
    }
    else {
      validationBlock.classList.add('hidden')
    }

  }

  preventDef(e) {
    e.stopPropagation()
  }

}
