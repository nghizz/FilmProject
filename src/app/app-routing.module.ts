import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilmsEditComponent } from './admins/films-edit/films-edit.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeComponent } from './pages/home/home.component'; 
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { PaymentComponent } from './booking/payment/payment.component'; 
import { SeatSelectionComponent } from './booking/seat-seletion/seat-seletion.component';
import { PromotionComponent } from './booking/promotion/promotion.component'; 
import { ProfileComponent } from './users/profile-user/profile-user.component';
import { LoginRegisterComponent } from './auth/login-register/login-register.component';
import { FilmsmanagementComponent } from './admins/films-management/films-management.component';
import { TicketsManagementComponent } from './admins/tickets-management/tickets-management.component';
import { MovieBookingComponent } from './movies/movie-booking/movie-booking.component';
import { MovieReviewComponent } from './movies/movie-review/movie-review.component'; 
import { FilmsAddComponent } from './admins/films-add/films-add.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'login', component:LoginRegisterComponent},
  { path: 'home', component: HomeComponent },
  { path: 'homepage', component: HomePageComponent},
  { path: 'add-movie', component: FilmsAddComponent},
  { path: 'movie-booking/:id', component: MovieBookingComponent },
  { path: 'movie-detail/:id', component: MovieDetailComponent},
  { path: 'payment', component: PaymentComponent },
  { path: 'filmedit/:id', component: FilmsEditComponent},
  { path: 'films', component: FilmsmanagementComponent  },
  { path: 'promotion', component: PromotionComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'seat-selection', component: SeatSelectionComponent }, // Trang chọn ghế
  { path: 'manage-tickets', component: TicketsManagementComponent},
  { path: '**', redirectTo: 'movie-list' }, // Xử lý các route không tồn tại
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }