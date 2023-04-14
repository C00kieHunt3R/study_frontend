import {Component, ViewChild} from '@angular/core';
import {StudentService} from "../../service/student.service";
import {Group, Student} from "../../model/model";
import {GroupService} from "../../service/group.service";
import {MatDialog} from "@angular/material/dialog";
import {GroupEditingModalComponent} from "./group-editing-modal/group-editing-modal.component";
import {StudentEditingModalComponent} from "./student-editing-modal/student-editing-modal.component";
import {Observable} from "rxjs";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  groups: Group[] = [
    {
      id: 1,
      name: "6402",
      students: [
        {
          id: 1,
          name: "Михаил",
          birthdate: new Date("2001-01-17"),
          number: 123214
        },
        {
          id: 2,
          name: "Кирилл",
          birthdate: new Date("2001-01-17"),
          number: 123214
        },
        {
          id: 3,
          name: "Максим",
          birthdate: new Date("2001-01-17"),
          number: 123214
        },
        {
          id: 4,
          name: "Аноним",
          birthdate: new Date("2001-01-17"),
          number: 123214
        }
      ]
    },
    {
      id: 2,
      name: "6403",
      students: [
        {
          id: 5,
          name: "Иван",
          birthdate: new Date("2001-01-17"),
          number: 123214
        },
        {
          id: 6,
          name: "Пупков",
          birthdate: new Date("2001-01-17"),
          number: 123214
        }
      ]
    }
  ]
  displayedColumns: string[] = ['position', 'name', 'birthdate', 'number', 'controls']

  constructor(
    private groupService: GroupService,
    private dialog: MatDialog
  ) {

  }

  onStudentDeleteBtnClick(student: Student, group: Group) {
    this.groups.forEach(g => {
      if (g.id == group.id) {
        g.students.splice(g.students.indexOf(student), 1);
        g.students = [...g.students];
      }
    });
  }

  onGroupEditBtnClick(group: Group | undefined) {
    if (group) {
      this.showGroupEditingModal(Object.assign({}, group)).subscribe(value => {
        if (value)
          this.groups.forEach(g => {
            if (g.id == group.id) {
              g.name = value.name;
            }
          });
      });
    } else {
      this.showGroupEditingModal({} as Group).subscribe(value => {
        if (value) {
          value.students = [];
          this.groups.push(value);
        }
      })
    }
  }

  onStudentEditBtnClick(student: Student | undefined, group: Group): void {
    if (student) {
      this.showStudentEditingModal(Object.assign({}, student)).subscribe(value => {
        this.groups.forEach(g => {
          if (g.id == group.id) {
            g.students[g.students.indexOf(student)] = value;
            g.students = [...g.students];
          }
        });
      });
    } else {
      this.showStudentEditingModal({} as Student).subscribe(value => {
        this.groups.forEach(g => {
          if (g.id == group.id) {
            g.students.push(value);
            g.students = [...g.students];
          }
        });
      });
    }
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
}
