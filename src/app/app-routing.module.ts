import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { SecurityGuard } from './login/security.guard';


const routes: Routes = [
  {path:'', component:HomeComponent },
  {path:'home', component:HomeComponent , canActivate:[SecurityGuard]},
  {path:'contact-us', component:ContactUsComponent, canActivate:[SecurityGuard] },
  {path:'login', component:LoginComponent },
  {path:'about-us', component:AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
