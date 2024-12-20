export interface Movie {
  id?: number;
  name: string;
  genre: string;
  duration: number;
  releaseDate: string;
  description?: string;
  imageUrl: string;
  showtimes?: string[]; // Danh sách giờ chiếu
}
