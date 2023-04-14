import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {startWith, take} from "rxjs";
import {UserAccount} from "../../model/model";
import {StorageService} from "../../service/storage.service";
import {UserContextService} from "../../service/user-context.service";

interface IFormValue {
  login: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: FormGroup = new FormGroup({
    login: new FormControl('', Validators.minLength(3)),
    password: new FormControl('', Validators.minLength(3)),
  });

  constructor(
    private authService: AuthService,
    private userContextService: UserContextService
  ) {
  }

  onSubmit() {
    const fromData: IFormValue = this.loginData.value;

    this.authService.login({
      username: fromData.login,
      password: fromData.password,
      role: '',
    }).pipe(
      take(1),
    ).subscribe((response: UserAccount) => {
        this.userContextService.userAccountData = response;
      }
    );
  }
}
