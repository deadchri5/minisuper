import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Confirm, Notify } from 'notiflix';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.scss'],
  providers: [UserService]
})
export class UsercardComponent {

  //Form control
  formControl: FormControl;
  formGroup: FormGroup;

  @Input() users: User[];

  constructor(
    private _builder: FormBuilder,
    private _userService: UserService
  ) { 
    this.formGroup = _builder.group({
      limitOfQuerys: ['10', Validators.required],
      param: ['', Validators.required]
    });
  }

  deleteUser(ID) {

    let objt = {
      ID: ID
    }

    Confirm.Show(
      'Borrar usuario',
      `¿Quieres borrar al usuario con el ID ${ID}?`,
      'Si',
      'No',
      //If you want delete the user
      () => {
        this._userService.deleteUser(objt).subscribe(
          response => {
            Notify.Success(response.message);
          }
        );
      },
      () => {
        Notify.Failure('No se elimino ningún usuario.');
      }
    );

  }

  onSubmit (search) {
    this._userService.getUsers(search).subscribe(
      response => {
        console.log(response);
        this.users = response.users;
      }
    );

  }

}
