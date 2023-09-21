import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canAccessAuthGuard } from '../core/guards/can-access-auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyComponent } from './pages/verify/verify.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [canAccessAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [canAccessAuthGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [canAccessAuthGuard],
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    canActivate: [canAccessAuthGuard],
  },
  {
    path: 'verify/:token',
    component: VerifyComponent,
    canActivate: [canAccessAuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
