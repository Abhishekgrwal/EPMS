import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './sharedModule/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './Pipes/filter.pipe';
import { LoginComponent } from './Auth/login/login.component';
import { SharedModuleModule } from './sharedModule/shared-module/shared-module.module';
import { InterceptorInterceptor } from './Auth/interceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, NavBarComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    SharedModuleModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
