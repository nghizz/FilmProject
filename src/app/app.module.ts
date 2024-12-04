import { CommonModule } from '@angular/common'; // Để hỗ trợ các tính năng như ngClass, currency pipe
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { PaymentComponent } from './payment/payment.component';
import { PromotionComponent } from './promotion/promotion.component';
import { RegisterComponent } from './register/register.component';
import { SearchFilmComponent } from './search-film/search-film.component';
import { SeatSelectionComponent } from './seat-seletion/seat-seletion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeatSelectionComponent,
    RegisterComponent,
    HomeComponent,
    HomePageComponent,
    SearchFilmComponent,
    PromotionComponent,
    MovieDetailComponent,
    MovieListComponent,
    PaymentComponent,
    
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

