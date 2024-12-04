import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { SeatSelectionComponent } from './seat-seletion/seat-seletion.component';
import { PromotionComponent } from './promotion/promotion.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'homepage', component: HomePageComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'movie-details/:id', component: MovieDetailComponent },
  { path: 'movie-list', component: MovieListComponent },
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
