import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmationModalData {
  message: string;
  buttonName: string;
  heading: string;
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  buttonName: string = 'Confirm';
  message: string = '';
  heading: string = '';

  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: ConfirmationModalData
  ) {
    this.message = data ? data.message : '';
    this.buttonName = data ? data?.buttonName : 'Confirm';
    this.heading = data ? data.heading : '';
  }

  ngOnInit(): void {}

  confirmation() {
    this.dialogRef.close(true);
  }
}
