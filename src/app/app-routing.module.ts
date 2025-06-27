import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-module/user-list/user-list.component';
import { UserCreationComponent } from './user-module/user-creation/user-creation.component';
import { LoginComponent } from './Auth/login/login.component';
import { AuthGuardGuard } from './Auth/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    data: { role: ['Admin', 'Developer', 'Project Manager'] },
    loadChildren: () =>
      import('./dashboard-module/dashboard-module.module').then(
        (c) => c.DashboardModuleModule
      ),
    canActivate: [AuthGuardGuard],
  },

  {
    path: 'user',
    data: { role: ['Admin'] },
    loadChildren: () =>
      import('./user-module/user-module.module').then(
        (c) => c.UserModuleModule
      ),
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'project',
    data: { role: ['Admin', 'Developer', 'Project Manager'] },
    loadChildren: () =>
      import('./project-module/project-module.module').then(
        (c) => c.ProjectModuleModule
      ),
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
