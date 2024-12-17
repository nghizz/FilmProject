import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeComponent } from './pages/home/home.component'; 
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { PaymentComponent } from './booking/payment/payment.component'; 
import { SeatSelectionComponent } from './booking/seat-seletion/seat-seletion.component';
import { PromotionComponent } from './booking/promotion/promotion.component'; 
import { LoginRegisterComponent } from './auth/login-register/login-register.component';

const routes: Routes = [
  { path: 'login', component:LoginRegisterComponent},
  { path: 'home', component: HomeComponent },
  { path: 'homepage', component: HomePageComponent},
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