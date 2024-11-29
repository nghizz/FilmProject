export interface Movie {
    id: number;
    name: string;
    genre: string;
    duration: number; // Thời lượng phim
    description: string; // Mô tả phim
    trailerUrl: string; // URL trailer
    director: string; // Đạo diễn
    imageUrl: string; // URL ảnh của phim
}