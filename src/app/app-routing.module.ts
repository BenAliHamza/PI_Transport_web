import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch : "full" , loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'signup', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'co-transport', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) } ,
  {path : "**"  , redirectTo : "" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
