import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {startWith, take} from "rxjs";
import {UserAccount} from "../../model/model";
import {StorageService} from "../../service/storage.service";
import {UserContextService} from "../../service/user-context.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private userContextService: UserContextService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  onSubmit() {
    const formData: IFormValue = this.loginData.value;
    this.authService.login({
      username: formData.login,
      password: formData.password,
      role: '',
    }).pipe(
      take(1),
    ).subscribe((response: UserAccount) => {
        this.userContextService.userAccountData = response;
        this.authService.setLoggedStatus(true);
        AuthService.setToken(btoa(formData.login + ':' + formData.password));
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.snackBar.open("Неверные учетные данные. Повторите ввод данных.", "ОК", {duration: 3000});
      }
    );
  }
}
