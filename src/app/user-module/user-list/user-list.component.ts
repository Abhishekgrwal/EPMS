import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { log } from 'console';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { ConfirmationModalComponent } from 'src/app/sharedModule/confirmation-modal/confirmation-modal.component';
import { userCol } from 'src/app/sharedModule/tableColumn';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  theader: string[] = ['SrNo.', 'Name', 'Email', 'Role', 'Actions'];
  currentPage: number = 0;
  searchText: string = '';
  tableCols = userCol;

  constructor(
    private _userService: UserServiceService,
    private _router: Router,
    private dialog: MatDialog,
    private _toastr: ToasterService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  ///get user list
  getUserList() {
    this._userService.getUSerList().subscribe(
      (res: any) => {
        this.userList = res;
      },
      (err: any) => {
        //error handling
      }
    );
  }

  //navigate to edit page
  navigate(userId: string) {
    this._router.navigate([`user/edit-user/${userId}`]);
  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }

  deleteUser(userId: string) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '600px',
      height: '210px',
      data: {
        message: 'Are you sure to delete this user?',
        buttonName: 'Delete',
        heading: 'Delete',
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this._userService.deleteUser(userId).subscribe(
          (res) => {
            this.getUserList();
          },
          (err: any) => {}
        );
      }
    });
  }

  handleAction(event: any): void {
    console.log(`Action '${event.action}' performed on row:`, event.row);
    event?.action === 'edit'
      ? this.navigate(event.row.id)
      : this.deleteUser(event.row.id);
  }
}
