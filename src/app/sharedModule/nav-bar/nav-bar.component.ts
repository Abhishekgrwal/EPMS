import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  userName: string = '';
  role: string = '';
  constructor(
    private _router: Router,
    private _authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.userName = this._authService.getUserName();
    this.role = this._authService.getRole();
  }

  async logout() {
    localStorage.clear();
    this._router.navigate(['/']);
    this._authService.isLoggedInUser.next(false);
  }
}
