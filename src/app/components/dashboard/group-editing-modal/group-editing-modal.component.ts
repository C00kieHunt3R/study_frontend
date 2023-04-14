import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GroupCreationModalData} from "../../../model/model";

@Component({
  selector: 'app-group-creation-modal',
  templateUrl: './group-editing-modal.component.html',
  styleUrls: ['./group-editing-modal.component.scss']
})
export class GroupEditingModalComponent {
  constructor(
    public dialogRef: MatDialogRef<GroupEditingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupCreationModalData
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
