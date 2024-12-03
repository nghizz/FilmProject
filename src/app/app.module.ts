import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SeatSelectionComponent } from './seat-seletion/seat-seletion.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MovieService } from './services/api/movie.service';
import { RouterModule } from '@angular/router';
import { SearchFilmComponent } from './search-film/search-film.component';
import { PromotionComponent } from './promotion/promotion.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  providers:[
    provideHttpClient(withFetch()),
    MovieService,
    provideClientHydration(),
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
