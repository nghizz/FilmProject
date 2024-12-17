import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchFilmComponent } from './movies/search-film/search-film.component'; // Thêm component này
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { SeatSelectionComponent } from './booking/seat-seletion/seat-seletion.component';
import { PromotionComponent } from './booking/promotion/promotion.component';
import { ProfileComponent } from './users/profile-user/profile-user.component';
import { HistoryPaymentComponent } from './users/history-payment/history-payment.component';
import { FilmsManagementComponent } from './admins/films-management/films-management.component';
import { TicketsManagementComponent } from './admins/tickets-management/tickets-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomePageComponent,
    SearchFilmComponent, // Đảm bảo khai báo component này
    MovieDetailComponent,
    PaymentComponent,
    SeatSelectionComponent,
    PromotionComponent,
    ProfileComponent,
    HistoryPaymentComponent,
    FilmsManagementComponent,
    TicketsManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }