import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service'; 
import { Router } from '@angular/router';
import { Report } from 'notiflix';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public searchForm: FormGroup;
  public formControl: FormControl;

  constructor(
    private _builder: FormBuilder,
    private _userService: UserService,
    private _router: Router
    ) 
    { 
      this.searchForm = this._builder.group({
        email: ['', [Validators.required, Validators.email] ],
        password: ['', Validators.required]
      });
    }

  ngOnInit() {
    window.scroll(0, 120);
  }

  onSubmit(userData) {

    let promise = new Promise((resolve, reject) => {
      this._userService.logIn(userData).subscribe(
        response => {
          resolve(response.token);
        },
        err => {
          reject(err);
        }
      );
    });

    promise.then((token: string) => {
      localStorage.setItem('token', token);
      location.href="/products";
    });

    promise.catch((err) => {
      Report.Failure( err.error.status, err.error.message, 'Ok' );
    });
    
  }

}
