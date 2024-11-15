import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Để hỗ trợ các tính năng như ngClass, currency pipe
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SeatSelectionComponent } from './seat-seletion/seat-seletion.component'; // Đảm bảo tên component chính xác
import { SearchFilmComponent } from './search-film/search-film.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeatSelectionComponent, // Đã sửa tên thành SeatSelectionComponent
    SearchFilmComponent,
    IndexComponent,
    SearchFilmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
