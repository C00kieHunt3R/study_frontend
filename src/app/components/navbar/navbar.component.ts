import {AfterViewInit, Component} from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {UserContextService} from "../../service/user-context.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit{
  role?: string | null;
  constructor(
    private storageService: StorageService,
    private userContextService: UserContextService
  ) {
  }

  ngAfterViewInit(): void {
    this.userContextService.getUserAccount.subscribe(value => {
      if (value.role === "ROLE_ADMINISTRATOR") this.role = "Администратор";
      else if (value.role === "ROLE_USER") this.role = "Пользователь";
    });
  }
}
