import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { TwoFactorComponent } from './pages/two-factor/two-factor.component';
import { SessionGuard } from './shared/guards/session.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SessionGuard],
    children: [
      {
        path: 'two-factor',
        component: TwoFactorComponent,
      },
    ],
  },
  {
    path: '',
    component: HomepageComponent,
    canActivate: [SessionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
