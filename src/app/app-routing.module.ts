import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { SeatSelectionComponent } from './seat-seletion/seat-seletion.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'seat-selection', component: SeatSelectionComponent},
  {path: 'index', component: IndexComponent},
  { path: '', redirectTo: '/index', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
