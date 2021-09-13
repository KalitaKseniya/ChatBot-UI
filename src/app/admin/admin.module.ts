import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from '../shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { UserCreatePageComponent } from '../users/user-create-page/user-create-page.component';
import { UsersPageComponent } from '../users/users-page/users-page.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserEditPageComponent } from '../users/user-edit-page/user-edit-page/user-edit-page.component';
import { UserChangePasswordComponent } from '../users/user-change-password/user-change-password.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    UserEditPageComponent,
    UserCreatePageComponent,
    UsersPageComponent,
    UserChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/users', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'user/create', component: UserCreatePageComponent},
          {path: 'users', component: UsersPageComponent, pathMatch: 'full'},
          {path: 'user/:id/edit', component: UserEditPageComponent},
          {path: 'user/:id/change-password', component: UserChangePasswordComponent},
        ]
      }
    ]),
     NgMultiSelectDropDownModule.forRoot(),
    ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
