import {AfterViewInit, Component} from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {UserContextService} from "../../service/user-context.service";
import {UserAccount} from "../../model/model";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  role?: string | null;
  username?: string | null;

  constructor(
    private storageService: StorageService,
    private userContextService: UserContextService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngAfterViewInit(): void {
    this.userContextService.getUserAccount.subscribe(value => {
      if (value.role === "ROLE_ADMINISTRATOR") this.role = "Администратор";
      else if (value.role === "ROLE_USER") this.role = "Пользователь";
      this.username = value.username;
    });
  }

  onLoginBtnClick() {
    if (this.role) {
      this.userContextService.userAccountData = {} as UserAccount;
      this.role = null;
      this.username = null;
      this.authService.setLoggedStatus(false);
    }
    this.router.navigate(['/login']);

  }
}
