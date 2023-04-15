import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Group, Student} from "../model/model";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import GroupsJSON from "../../assets/groups.json";

@Injectable({providedIn: "root"})
export class GroupService {
  private apiUrl: string = environment.apiBaseUrl + "/api/groups";

  constructor(
    private http: HttpClient
  ) {
  }

  public getById<T = Group>(id: number): Observable<T> {
    return this.http.get<T>(this.apiUrl + "/get?id=" + id);
  }

  public getAll<T = Group[]>(): Observable<T> {
    return this.http.get<T>(this.apiUrl + "/get-all");
  }
  public create<T = Group>(group: Group): Observable<T> {
    return this.http.post<T>(this.apiUrl + "/create", group);
  }

  public update<T = Group>(id: number, group: Group): Observable<T> {
    return this.http.put<T>(this.apiUrl + "/update?id=" + id, group);
  }

  public delete<T = boolean>(id: number): Observable<T> {
    return this.http.delete<T>(this.apiUrl + "/delete?id=" + id);
  }
}
