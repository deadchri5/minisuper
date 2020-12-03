import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

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

  constructor (
    private _builder: FormBuilder,
    private _userService: UserService
    ) { 

    this.formGroup = this._builder.group({
      Name: [this.name, Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email] ],
      Phone: ['', [Validators.required, Validators.pattern('[0-9]*')] ],
      Address: ['', Validators.required]
    });

  }

  ngOnInit() {
    let promise = new Promise((resolve, reject) => {
      this._userService.getUserInfo().subscribe(
        response => {
          this.user = response.user;
          resolve();
        }
      );
    });

    promise.then(() => {
      this.name = this.user.name;
      this.formGroup = this._builder.group({
        Name: [this.user.name, Validators.required],
        LastName: [this.user.lastName, Validators.required],
        Email: [this.user.email, [Validators.required, Validators.email] ],
        Phone: [this.user.phone, [Validators.required, Validators.pattern('[0-9]*')] ],
        Address: [this.user.address, Validators.required]
      });
    });

    

  }

  onSubmit(userData) {
    this._userService.updateUser(userData).subscribe(
      response => {
        console.log (response);
      }
    );
  }

}
