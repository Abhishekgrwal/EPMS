import { NgModule } from '@angular/core';
import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { SharedModuleModule } from '../sharedModule/shared-module/shared-module.module';

@NgModule({
  declarations: [UserListComponent, UserCreationComponent],
  imports: [UserModuleRoutingModule, SharedModuleModule],
})
export class UserModuleModule {}
