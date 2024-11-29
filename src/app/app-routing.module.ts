import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SeatSelectionComponent } from './seat-seletion/seat-seletion.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'seat-selection/:showtime', component: SeatSelectionComponent },
  { path: 'movie-details/:id', component: MovieDetailComponent },
  //{ path: 'movie-details', redirectTo: '/movie-details/1' },
  { path: 'movie-list', component: MovieListComponent },
  { path: 'payment', component: PaymentComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
