import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SeatSelectionComponent } from './seat-seletion/seat-seletion.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'seat-selection', component: SeatSelectionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
