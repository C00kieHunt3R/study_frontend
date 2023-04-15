import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserAccount} from "../model/model";
import {environment} from "../../environments/environment";
import {UserContextService} from "./user-context.service";

@Injectable({providedIn: "root"})
export class AuthService {
  private apiUrl: string = environment.apiBaseUrl + "/api/auth";
  private userAccount?: UserAccount;
  private isLoggedIn: boolean = false;

  public get isLogged(): boolean {
    return this.isLoggedIn;
  }

  public setLoggedStatus(status: boolean): void {
    this.isLoggedIn = status;
  }


  constructor(
    private http: HttpClient,
  ) {
  }

  public login<T = UserAccount>(userAccount: UserAccount): Observable<T> {
    return this.http.post<T>(this.apiUrl + "/login", userAccount);
  }

  public static getToken(): string | null {
    return localStorage.getItem("token");
  }
  public static setToken(token: string): void {
    localStorage.setItem("token", token);
  }

}
