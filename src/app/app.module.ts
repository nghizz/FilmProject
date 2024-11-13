import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Thêm CommonModule để sử dụng ngClass và các pipes như currency

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SeatSelectionComponent } from './seat-seletion/seat-seletion.component'; // Sửa lại tên class component cho chính xác
=======
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFilmComponent } from './search-film/search-film.component';
import { IndexComponent } from './index/index.component';
>>>>>>> hieu

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    LoginComponent,
    SeatSelectionComponent // Đảm bảo tên của component là đúng
  ],
  imports: [
    BrowserModule,
    CommonModule, // Thêm CommonModule để hỗ trợ các tính năng cần thiết như ngClass, currency pipe
    AppRoutingModule
  ],
  providers: [],
=======
    SearchFilmComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
>>>>>>> hieu
  bootstrap: [AppComponent]
})
export class AppModule { }
