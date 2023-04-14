import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Student} from "../model/model";
import {from, Observable, of} from "rxjs";
import studentsJson from "src/assets/students.json";
@Injectable({providedIn: 'root'})
export class StudentService {
  private apiUrl: string = environment.apiBaseUrl + "/api/students";

  constructor(
    private http: HttpClient
  ) {
  }

  public getAll<T = Student[]>(groupId: number): Observable<T>{
    if (environment.noBackend) {
      return of(JSON.parse(JSON.stringify(studentsJson)));
    } else {
      return this.http.get<T>(this.apiUrl + "/get-all?group_id=" + groupId);
    }
  }

  public create<T = Student>(student: Student, groupId: number): Observable<T> {
    return this.http.post<T>(this.apiUrl + "/create?group_id=" + groupId, student); //FIXME!!!!!!!!!!!!!!!!!!!!!!!
  }
}
