import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DoctorPanelComponent } from './doctor-panel/doctor-panel.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';


const routes: Routes = [
  {path:'', component:HomeComponent },
  {path:'home', component:HomeComponent , canActivate:[LoginGuard]},
  {path:'contact-us', component:ContactUsComponent,canActivate:[LoginGuard] },
  {path:'login', component:LoginComponent },
  {path:'about-us', component:AboutUsComponent },
  {path:'doctor-panel', component:DoctorPanelComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
