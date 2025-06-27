import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.scss'],
})
export class ProjectCreationComponent implements OnInit {
  creationForm!: FormGroup;
  heading: string = 'Project Creation';
  userList: any = [];
  isEditMode: boolean = false;
  projectId: string = '';
  constructor(
    private _fb: FormBuilder,
    private _projectService: ProjectService,
    private _userSerice: UserServiceService,
    private _activateRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.formInit();
  }

  formInit() {
    this.creationForm = this._fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      assignedUsers: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUserList();
    this._activateRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.projectId = id;
        this.getProjectById(id);
        this.heading = 'Edit Project';
      }
    });
  }

  getUserList() {
    this._userSerice.getUSerList().subscribe((res: any) => {
      this.userList = res;
    });
  }

  getProjectById(projectid: string) {
    this._projectService.getProjectById(projectid).subscribe((res: any) => {
      this.creationForm.patchValue({
        name: res?.name,
        description: res?.description,
        startDate: res?.startDate,
        endDate: res?.endDate,
        assignedUsers: res?.assignedUsers,
      });

      console.log(this.creationForm.value);
    });
  }

  submit() {
    if (this.creationForm.invalid) {
      this.creationForm.markAllAsTouched();
      return;
    }

    this.isEditMode ? this.updateProject() : this.createProject();
  }

  createProject() {
    this._projectService
      .createProjects(this.creationForm.value)
      .subscribe((res: any) => {
        this.navigateToProjectList();
      });
  }

  updateProject() {
    this._projectService
      .updateProject(this.creationForm.value, this.projectId)
      .subscribe((res: any) => {
        this.navigateToProjectList();
      });
  }

  navigateToProjectList() {
    this._router.navigate(['/project/project-list']);
  }
}
