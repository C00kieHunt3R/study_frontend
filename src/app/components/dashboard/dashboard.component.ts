import {Component, ViewChild} from '@angular/core';
import {StudentService} from "../../service/student.service";
import {Group, Student} from "../../model/model";
import {GroupService} from "../../service/group.service";
import {MatDialog} from "@angular/material/dialog";
import {GroupEditingModalComponent} from "./group-editing-modal/group-editing-modal.component";
import {StudentEditingModalComponent} from "./student-editing-modal/student-editing-modal.component";
import {Observable} from "rxjs";
import {MatTable} from "@angular/material/table";
import {group} from "@angular/animations";
import {UserContextService} from "../../service/user-context.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  groups?: Group[];
  displayedColumns: string[] = ['position', 'name', 'birthdate', 'number', 'controls'];
  isAuthenticated: boolean = false;
  constructor(
    private groupService: GroupService,
    private studentService: StudentService,
    private userContextService: UserContextService,
    private dialog: MatDialog
  ) {
    this.groupService.getAll().subscribe(value => {
      this.groups = value;
    });
    this.userContextService.getUserAccount.subscribe(user => {
      if (user.role === "ROLE_ADMINISTRATOR") this.isAuthenticated = true;
    });
  }

  onStudentDeleteBtnClick(student: Student, group: Group): void {
    this.studentService.delete(student.id).subscribe(response => {
      if (response) {
        this.groups?.forEach(g => {
          if (g.id == group.id) {
            g.students.splice(g.students.indexOf(student), 1);
            g.students = [...g.students];
          }
        });
      }
    });

  }

  onGroupEditBtnClick(group: Group | undefined): void {
    if (group) {
      this.updateGroup(group);
    } else {
      this.createGroup();
    }
  }

  onStudentEditBtnClick(student: Student | undefined, group: Group): void {
    if (student) {
      this.updateStudent(student, group);
    } else {
      this.createStudent(group);
    }
  }

  createGroup(): void {
    this.showGroupEditingModal({} as Group).subscribe(value => {
      if (value) {
        value.students = [];
        this.groupService.create(value).subscribe(response => {
          this.groups!.push(response);
        });
      }
    });
  }

  updateGroup(group: Group): void {
    this.showGroupEditingModal(Object.assign({}, group)).subscribe(value => {
      if (value)
        this.groupService.update(value.id, value).subscribe(response => {
          let index = this.groups!.indexOf(group);
          this.groups![index] = response;
        });
    });
  }

  createStudent(group: Group): void {
    this.showStudentEditingModal({} as Student).subscribe(value => {
      this.studentService.create(value, group.id).subscribe(response => {
        let index = this.groups!.indexOf(group);
        this.groups![index].students.push(response);
        this.groups![index].students = [...this.groups![index].students];
      });
    });
  }

  updateStudent(student: Student, group: Group): void {
    this.showStudentEditingModal(Object.assign({}, student)).subscribe(value => {
      this.studentService.update(value.id, value).subscribe(response => {
        let index = this.groups!.indexOf(group);
        this.groups![index].students[this.groups![index].students.indexOf(student)] = response;
        this.groups![index].students = [...this.groups![index].students];
      });
    });
  }

  showStudentEditingModal(student: Student): Observable<any> {
    const dialogRef = this.dialog.open(StudentEditingModalComponent, {
      data: {student: student},
    });
    return dialogRef.afterClosed();
  }

  showGroupEditingModal(group: Group): Observable<any> {
    const dialogRef = this.dialog.open(GroupEditingModalComponent, {
      data: {group: group},
    });
    return dialogRef.afterClosed();
  }

  onGroupDeleteBtnClick(group: Group): void {
    this.groupService.delete(group.id).subscribe(response => {
      if (response) {
        let index = this.groups!.indexOf(group);
        this.groups!.splice(index, 1);
      }
    });
  }
}
