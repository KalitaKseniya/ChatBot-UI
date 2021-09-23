import { AuthGuard } from './../shared/auth.guard';
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
import { RolesPageComponent } from '../roles/roles-page/roles-page.component';
import { RoleCreatePageComponent } from '../roles/role-create-page/role-create-page.component';
import { RoleEditPageComponent } from '../roles/role-edit-page/role-edit-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    UserEditPageComponent,
    UserCreatePageComponent,
    UsersPageComponent,
    UserChangePasswordComponent,
    RolesPageComponent,
    RoleCreatePageComponent,
    RoleEditPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/users', pathMatch: 'full', canActivate: [AuthGuard]},
          {path: 'login', component: LoginPageComponent, canActivate: [AuthGuard]},
          {path: 'user/create', component: UserCreatePageComponent, canActivate: [AuthGuard]},
          {path: 'users', component: UsersPageComponent, canActivate: [AuthGuard]},
          {path: 'user/:id/edit', component: UserEditPageComponent, canActivate: [AuthGuard]},
          {path: 'user/:id/change-password', component: UserChangePasswordComponent, canActivate: [AuthGuard]},
          {path: 'roles', component: RolesPageComponent, pathMatch: 'full', canActivate: [AuthGuard]},
          {path: 'role/create', component: RoleCreatePageComponent, canActivate: [AuthGuard]},
          {path: 'role/:id/edit-permissions', component: RoleEditPageComponent, canActivate: [AuthGuard]},
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
