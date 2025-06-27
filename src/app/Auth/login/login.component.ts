import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'console';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { ToasterService } from 'src/app/Services/toastr.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userList: any = [];
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthServiceService,
    private _router: Router,
    private _toastr: ToasterService
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this._authService.Login(email, password).subscribe(
      (res: any) => {
        if (res.length > 0) {
          localStorage.setItem('token', window.btoa(JSON.stringify(res[0])));
          this._router.navigate(['/dashboard']);
          this._authService.isLoggedInUser.next(true);
        } else {
          this._authService.isLoggedInUser.next(false);
          this._toastr.errorToaster('User Not Found');
        }
      },
      (err: any) => {
        this._authService.isLoggedInUser.next(false);

        //error handling
      }
    );
  }
}
