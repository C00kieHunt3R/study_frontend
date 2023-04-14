import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Group, Student} from "../model/model";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import GroupsJSON from "../../assets/groups.json";

@Injectable({providedIn: "root"})
export class GroupService {
  private apiUrl: string = environment.apiBaseUrl + "/api/students";
  constructor(
    private http: HttpClient
  ) {
  }

  public getAll<T = Group[]>(groupId: number): Observable<T>{
    if (environment.noBackend) {
      return of(JSON.parse(JSON.stringify(GroupsJSON)));
    } else {
      return this.http.get<T>(this.apiUrl + "/get-all?group_id=" + groupId);
    }
  }
}
