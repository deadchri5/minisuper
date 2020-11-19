import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service'; 

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
    private _userService: UserService
    ) 
    { 
      this.searchForm = this._builder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit() {
    window.scroll(0, 120);
  }

  onSubmit(userData) {
    this._userService.logIn(userData).subscribe(
      response => {
        localStorage.setItem('token', response.token);
      }
    );
  }

}
