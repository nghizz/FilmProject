# FilmProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Tạo một component mới

ng generate component <tên component>

## Tải code từ git về folder
git clone https://github.com/nghizz/FilmProject.git


# Quy trình làm việc với Git khi nhiều người cùng tham gia

## 1. Pull (cập nhật) mã nguồn mới nhất từ kho từ xa
Trước khi bắt đầu chỉnh sửa, hãy luôn cập nhật mã nguồn mới nhất về thư mục của bạn để tránh xung đột:

```bash
git pull origin main
```

> **Lưu ý**: Thay `main` bằng nhánh mà bạn đang làm việc (ví dụ: `master`, `dev`, hoặc tên nhánh cụ thể).

## 2. Thực hiện các thay đổi
Chỉnh sửa, thêm tệp, hoặc xóa tệp trong dự án của bạn.

## 3. Kiểm tra trạng thái của Git
Để kiểm tra các tệp đã thay đổi, thêm, hoặc bị xóa, sử dụng lệnh:

```bash
git status
```

## 4. Thêm tệp vào staging area
Thêm tất cả các thay đổi vào staging area:

```bash
git add .
```

Hoặc chỉ thêm tệp cụ thể:

```bash
git add filename
```

## 5. Commit các thay đổi
Sau khi thêm tệp vào staging, commit các thay đổi với thông điệp mô tả:

```bash
git commit -m "Mô tả thay đổi của bạn"
```

## 6. Pull lại từ kho từ xa trước khi push
Để đảm bảo bạn không ghi đè các thay đổi của người khác, hãy pull lại một lần nữa:

```bash
git pull origin main
```

> **Lưu ý**: Nếu xảy ra **xung đột (conflict)**, Git sẽ yêu cầu bạn giải quyết xung đột trước khi tiếp tục.

## 7. Push mã lên kho từ xa
Sau khi giải quyết xung đột (nếu có), bạn có thể đẩy mã lên kho:

```bash
git push origin main
```

## Lưu ý quan trọng
- **Luôn pull trước khi push** để đảm bảo bạn làm việc với mã nguồn mới nhất.
- **Giải quyết xung đột** nếu có, bằng cách chỉnh sửa các tệp bị xung đột và commit lại.
- **Sử dụng nhánh riêng** (branch) khi làm việc nhóm để giảm thiểu khả năng xảy ra xung đột.

