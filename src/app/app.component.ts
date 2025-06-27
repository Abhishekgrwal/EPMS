import { Component } from '@angular/core';
import { AuthServiceService } from './Services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'EPMS';
  isLoggedInUser: boolean = false;
  constructor(private _authService: AuthServiceService) {
    this._authService.isLoggedInUser.subscribe((res: any) => {
      if (res || this._authService.getToken()) this.isLoggedInUser = true;
      else this.isLoggedInUser = false;
    });
  }
}
