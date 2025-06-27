import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/Services/task.service';
import { ConfirmationModalComponent } from 'src/app/sharedModule/confirmation-modal/confirmation-modal.component';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  searchText: string = '';
  theader = ['name', 'description', 'dueDate', 'Priority', 'Status', 'Action'];
  taskList: any = [];
  projectId: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any[]>([]);
  constructor(
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _taskService: TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.projectId = id;
        this.gettaskList(id);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  gettaskList(id: string) {
    this._taskService.getTaskList(id).subscribe((res: any) => {
      this.taskList = res;
      this.dataSource.data = res;
    });
  }

  applyFilter(value: any) {
    var filteredValue = value.target.value;
    this.dataSource.filter = filteredValue?.trim().toLowerCase();
  }

  navigateTotaskCreation() {
    this._router.navigate([`/project/${this.projectId}/task-creation`]);
  }

  edittask(taskid: string) {
    this._router.navigate([`/project/${this.projectId}/edit-task/${taskid}`]);
  }

  navigateToProjectList() {
    this._router.navigate(['/project/project-list']);
  }

  deleteUser(taskId: string) {
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
        this._taskService.deleteTask(taskId).subscribe((res) => {
          this.gettaskList(this.projectId);
        });
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    const data = this.dataSource.data;
    const prevIndex = data.findIndex((d) => d === event.item.data);
    moveItemInArray(data, prevIndex, event.currentIndex);
    this.dataSource.data = [...data];
  }
}
