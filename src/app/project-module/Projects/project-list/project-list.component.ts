import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { log } from 'console';
import { ProjectService } from 'src/app/Services/project.service';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { ConfirmationModalComponent } from 'src/app/sharedModule/confirmation-modal/confirmation-modal.component';
import { projectCol } from 'src/app/sharedModule/tableColumn';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  searchText: any;
  tableCols: any = [];

  projectList: any = [];

  constructor(
    private dialog: MatDialog,
    private _router: Router,
    private _projectService: ProjectService,
    private _userSer: UserServiceService
  ) {}

  ngOnInit(): void {
    this.getProjectdata();
    this.tableCols = projectCol;
  }

  getProjectdata() {
    this._projectService.getProjectList().subscribe((res: any) => {
      this.projectList = res;
      this.getUserList();
    });
  }

  getUserList() {
    this._userSer.getUSerList().subscribe((res: any) => {
      this.getAssignedUser(res);
    });
  }

  getAssignedUser(userList: []) {
    const data = this.projectList.map((project: any) => {
      return {
        ...project,
        assignedUsers: project.assignedUsers
          .map((userId: any) => {
            const user: any = userList.find((u: any) => u.id === userId);
            return user ? `${user.firstName} ${user.lastName}` : 'User';
          })
          .toString(),
      };
    });

    this.projectList = data;
  }

  navigate(userId: string) {
    this._router.navigate([`project/edit-project/${userId}`]);
  }

  deleteUser(projectId: string) {
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
        this._projectService.deleteProject(projectId).subscribe((res) => {
          this.getProjectdata();
        });
      }
    });
  }

  navigateToTask(projectId: string) {
    this._router.navigate([`/project/${projectId}/task-list`]);
  }

  handleAction(event: any): void {
    console.log(`Action '${event.action}' performed on row:`, event.row);
    if (event.action === 'edit') {
      this.navigate(event.row.id);
    } else if (event.action === 'delete') {
      this.deleteUser(event.row.id);
    } else if (event.action === 'addTask') {
      this.navigateToTask(event.row.id);
    }
  }
}
