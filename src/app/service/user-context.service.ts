import {Injectable} from "@angular/core";
import {UserAccount} from "../model/model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class UserContextService {
  private userAccountSubject: BehaviorSubject<UserAccount> = new BehaviorSubject<UserAccount>({} as UserAccount);
  private userAccount: Observable<UserAccount> = this.userAccountSubject.asObservable();
  public get getUserAccount(): Observable<UserAccount> {
    return this.userAccount;
  }
  public set userAccountData(userAccount: UserAccount) {
    this.userAccountSubject.next(userAccount);
  }
  constructor(
  ) {
  }
}
