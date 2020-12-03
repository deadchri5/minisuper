import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Report } from 'notiflix';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public formContol: FormControl;

  public MyObject = {
    message: '',
    name: ''
  }

  constructor(
    private _userService: UserService,
    private _builder: FormBuilder,
    private _router: Router
    ) { 
      this.registerForm = this._builder.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

  onSubmit(userData: Object) {

    let promise = new Promise((resolve, rejected) => {
      this._userService.registerUser(userData).subscribe(
        response => {
          this.MyObject.message = response.message;
          this.MyObject.name = response.user.Name
          resolve();
        },
        err => {
          rejected();
        }
      );
    });

    promise.then(() => {
      this._router.navigate(['/login']);
      Report.Success(this.MyObject.message, `Gracias por registrarte a abarrotes topacio ${this.MyObject.name}, por favor inicia sesión`, 'ok');
    });

    promise.catch(() => {
      Report.Failure('error', 'Este correo o telefono ya esta registrado en nuestra base de datos', 'ok');
    });


  }

}
