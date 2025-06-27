import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreationComponent } from './user-creation/user-creation.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'user-list',
    component: UserListComponent,
  },
  {
    path: 'user-creation',
    component: UserCreationComponent,
  },
  {
    path: 'edit-user/:id',
    component: UserCreationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserModuleRoutingModule {}
