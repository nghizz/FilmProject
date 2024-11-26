import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SeatSelectionComponent } from './seat-seletion/seat-seletion.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'seat-selection/:showtime', component: SeatSelectionComponent },
  { path: 'movie-details/:id', component: MovieDetailComponent },  // Route yêu cầu tham số 'id'
  { path: 'movie-details', redirectTo: '/movie-details/1' },  // Redirect nếu không có tham số 'id', ví dụ: đưa về phim có id = 1
  { path: '', redirectTo: '/movie-details/1', pathMatch: 'full' },  // Redirect mặc định khi vào trang chính
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
