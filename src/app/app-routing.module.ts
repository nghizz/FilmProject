import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeComponent } from './pages/home/home.component'; 
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { PaymentComponent } from './booking/payment/payment.component'; 
import { RegisterComponent } from './auth/register/register.component'; 
import { SeatSelectionComponent } from './booking/seat-seletion/seat-seletion.component';
import { PromotionComponent } from './booking/promotion/promotion.component'; 
import { ProfileComponent } from './users/profile-user/profile-user.component';

const routes: Routes = [

  { path: 'profile', component: ProfileComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'homepage', component: HomePageComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'movie-details/:id', component: MovieDetailComponent },
  { path: 'payment', component: PaymentComponent },

  { path: 'promotion', component: PromotionComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'seat-selection', component: SeatSelectionComponent }, // Trang chọn ghế
  { path: '**', redirectTo: 'movie-list' }, // Xử lý các route không tồn tại
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }