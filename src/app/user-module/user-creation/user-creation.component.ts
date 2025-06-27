import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss'],
})
export class UserCreationComponent implements OnInit {
  userForm!: FormGroup;
  roleArray: any = ['Project Manager', 'Developer'];
  isEditMode: boolean = false;
  userId!: string;
  hide: boolean = true;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  nameRegex = /^[A-Za-z]+$/;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserServiceService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {
    this.formInit();
  }

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.userId = id;
        this.getUserFromId(id);
      }
    });
  }

  //for Form Initilaisation
  formInit() {
    this.userForm = this._fb.group({
      firstName: [
        null,
        [Validators.required, Validators.pattern(this.nameRegex)],
      ],
      lastName: [
        null,
        [Validators.required, Validators.pattern(this.nameRegex)],
      ],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      role: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  getUserFromId(userId: string) {
    this._userService.getUserById(userId).subscribe(
      (user: any) => {
        this.userForm.patchValue({
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          password: user?.password,
          role: user?.role,
        });
      },
      (err) => {}
    );
  }

  submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isEditMode ? this.updateUser() : this.userCreation();
  }

  userCreation() {
    this._userService.createUser(this.userForm.value).subscribe((res: any) => {
      this._router.navigate(['/user/user-list']);
    });
  }

  updateUser() {
    this._userService
      .updateUser(this.userForm.value, this.userId)
      .subscribe((res: any) => {
        this._router.navigate(['/user/user-list']);
      });
  }
}
