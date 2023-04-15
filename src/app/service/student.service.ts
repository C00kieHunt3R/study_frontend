import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Student} from "../model/model";
import {from, Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class StudentService {
  private apiUrl: string = environment.apiBaseUrl + "/api/students";

  constructor(
    private http: HttpClient
  ) {
  }

  public getAll<T = Student[]>(groupId: number): Observable<T> {
    return this.http.get<T>(this.apiUrl + "/get-all?groupId=" + groupId);
  }

  public create<T = Student>(student: Student, groupId: number): Observable<T> {
    return this.http.post<T>(this.apiUrl + "/create?groupId=" + groupId, student);
  }

  public update<T = Student>(id: number, student: Student): Observable<T> {
    return this.http.put<T>(this.apiUrl + "/update?id=" + id, student);
  }

  public delete<T = boolean>(id: number): Observable<T> {
    return this.http.delete<T>(this.apiUrl + "/delete?id=" + id);
  }
}
