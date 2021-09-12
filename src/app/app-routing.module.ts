import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { UsersPageComponent } from './users/users-page/users-page.component';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      //{path: '', redirectTo: 'admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'users', component: UsersPageComponent},
      //{path: 'user/create', component: Use}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
