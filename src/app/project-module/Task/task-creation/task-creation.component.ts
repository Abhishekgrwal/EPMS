import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss'],
})
export class TaskCreationComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode: boolean = false;
  projectId!: string;
  taskId!: string;
  priorityList = ['High', 'Medium', 'Low'];
  statusList = ['To Do', 'WIP', 'Testing', 'Done'];
  heading: string = 'Task Creation';

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _taskService: TaskService
  ) {
    this.taskForm = this._fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      status: [null, Validators.required],
      dueDate: [null, Validators.required],
      priority: [null, Validators.required],
      projectId: [null],
    });
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      const projectId = params.get('id');
      const taskId = params.get('taskid');
      if (projectId) {
        this.projectId = projectId;
        this.taskForm.controls['projectId'].setValue(projectId);
      }
      if (taskId) {
        this.taskId = taskId;
        this.heading = 'Edit Task';
        this.isEditMode = true;
        this.taskById(taskId);
      }
    });
  }

  taskById(taskId: string) {
    this._taskService.getTaskById(taskId).subscribe((res: any) => {
      this.taskForm.patchValue({
        name: res[0]?.name,
        description: res[0]?.description,
        status: res[0]?.status,
        dueDate: res[0]?.dueDate,
        priority: res[0]?.priority,
        projectId: res[0]?.projectId,
      });
    });
  }

  navigateToProjectList() {
    this._router.navigate([`/project/${this.projectId}/task-list`]);
  }

  submit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isEditMode ? this.updateTask() : this.createTask();
  }

  createTask() {
    this._taskService.createTask(this.taskForm.value).subscribe((res: any) => {
      this.navigateToProjectList();
    });
  }
  updateTask() {
    this._taskService
      .updateTask(this.taskForm.value, this.taskId)
      .subscribe((res: any) => {
        this.navigateToProjectList();
      });
  }
}
