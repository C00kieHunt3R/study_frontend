import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserAccount} from "../model/model";
import {environment} from "../../environments/environment";

@Injectable({providedIn: "root"})
export class AuthService {
  private apiUrl: string = environment.apiBaseUrl + "/api/auth"
  constructor(
    private http: HttpClient
  ) {
  }

  public login<T = UserAccount>(userAccount: UserAccount): Observable<T> {
    return this.http.post<T>(this.apiUrl + "/login", userAccount);
  }
}
