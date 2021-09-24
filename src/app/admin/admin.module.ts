import { AccountPageComponent } from './../account-page/account-page.component';
import { AlertComponent } from './../shared/components/alert/alert.component';
import { ForbiddenPageComponent } from './../forbidden-page/forbidden-page.component';
import { AuthGuard } from './../shared/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from '../shared/components/admin-layout/admin-layout.component';
import { UserCreatePageComponent } from '../users/user-create-page/user-create-page.component';
import { UsersPageComponent } from '../users/users-page/users-page.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserEditPageComponent } from '../users/user-edit-page/user-edit-page/user-edit-page.component';
import { UserChangePasswordComponent } from '../users/user-change-password/user-change-password.component';
import { RolesPageComponent } from '../roles/roles-page/roles-page.component';
import { RoleCreatePageComponent } from '../roles/role-create-page/role-create-page.component';
import { RoleEditPageComponent } from '../roles/role-edit-page/role-edit-page.component';
import { ChatsPageComponent } from '../chats/chats-page/chats-page.component';
import { ChatEditPageComponent } from '../chats/chat-edit-page/chat-edit-page.component';
import { ChatCreatePageComponent } from '../chats/chat-create-page/chat-create-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserEditPageComponent,
    UserCreatePageComponent,
    UsersPageComponent,
    UserChangePasswordComponent,
    RolesPageComponent,
    RoleCreatePageComponent,
    RoleEditPageComponent,
    ForbiddenPageComponent,
    AlertComponent,
    ChatsPageComponent,
    ChatEditPageComponent,
    ChatCreatePageComponent,
    AccountPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/', pathMatch: 'full' },
          {
            path: 'user/create',
            component: UserCreatePageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'users',
            component: UsersPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'user/:id/edit',
            component: UserEditPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'user/:id/change-password',
            component: UserChangePasswordComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'roles',
            component: RolesPageComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
          },
          {
            path: 'role/create',
            component: RoleCreatePageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'role/:id/edit-permissions',
            component: RoleEditPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'forbidden',
            component: ForbiddenPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'chats',
            component: ChatsPageComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard],
          },
          {
            path: 'chat/create',
            component: ChatCreatePageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'chat/:id/edit',
            component: ChatEditPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'account',
            component: AccountPageComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class AdminModule {}
