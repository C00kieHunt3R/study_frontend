import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StudentEditingModalData} from "../../../model/model";

@Component({
  selector: 'app-student-editing',
  templateUrl: './student-editing-modal.component.html',
  styleUrls: ['./student-editing-modal.component.scss']
})
export class StudentEditingModalComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentEditingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentEditingModalData
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
