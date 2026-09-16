# Giới thiệu ngắn gọn về lập trình TypeScript

## TypeScript là gì?

TypeScript là một siêu tập hợp (superset) của JavaScript, được phát triển bởi Microsoft, bổ sung tính năng kiểm tra kiểu tĩnh (static typing) và các tính năng lập trình hướng đối tượng. TypeScript giúp mã nguồn dễ đọc, dễ bảo trì và giảm lỗi trong các dự án lớn.

### Tại sao nên học TypeScript?

- **Kiểm tra lỗi sớm**: Kiểu tĩnh giúp phát hiện lỗi trong quá trình phát triển.
- **Hỗ trợ dự án lớn**: Cung cấp cấu trúc rõ ràng, dễ mở rộng và bảo trì.
- **Tích hợp tốt với JavaScript**: Biên dịch thành JavaScript, tương thích với mọi môi trường chạy JavaScript.
- **Cộng đồng mạnh mẽ**: Được sử dụng rộng rãi trong các framework như Angular, React, Vue.

### So sánh với JavaScript

| Tiêu chí         | TypeScript                           | JavaScript                      |
| ---------------- | ------------------------------------ | ------------------------------- |
| **Kiểu dữ liệu** | Kiểu tĩnh, kiểm tra tại compile-time | Kiểu động, kiểm tra tại runtime |
| **Cú pháp**      | Thêm kiểu, interface, generics       | Cú pháp linh hoạt, ít ràng buộc |
| **Hỗ trợ IDE**   | Tự động gợi ý, kiểm tra lỗi tốt      | Hạn chế hơn                     |
| **Hiệu suất**    | Tương tự (biên dịch thành JS)        | Trực tiếp thực thi              |

### Khi nào nên chọn TypeScript?

- Dự án lớn, phức tạp, cần bảo trì lâu dài.
- Làm việc với đội nhóm lớn, yêu cầu mã nguồn thống nhất.
- Sử dụng các framework như Angular hoặc cần tích hợp chặt chẽ với các thư viện JavaScript lớn.

## Chuẩn bị môi trường

### IDE

Sử dụng các IDE hỗ trợ TypeScript để có trải nghiệm tốt nhất:

- **Visual Studio Code**: Tích hợp sẵn hỗ trợ TypeScript, gợi ý thông minh, kiểm tra lỗi.
- **WebStorm**: Hỗ trợ mạnh mẽ cho các dự án lớn.
- **Sublime Text** hoặc **Atom** với plugin TypeScript.

### Cài đặt Node.js

1. Tải và cài đặt Node.js từ [nodejs.org](https://nodejs.org).
2. Kiểm tra cài đặt:
   ```bash
   node -v
   npm -v
   ```

### Cài đặt TypeScript

Cài đặt TypeScript toàn cục qua npm:

```bash
npm install -g typescript
```

Kiểm tra phiên bản:

```bash
tsc -v
```

### Biên dịch TypeScript code

1. Tạo file `.ts` (ví dụ: `typescript.ts`).
2. **Chạy trực tiếp file `.ts`**:
   - Sử dụng `tsx` để chạy trực tiếp mà không cần biên dịch:
     ```bash
     npm install -g tsx
     tsx typescript.ts
     ```

### Biên dịch sử dụng tsconfig.json

1. Tạo file `tsconfig.json` để cấu hình biên dịch:
   ```bash
   tsc --init
   ```
2. Cấu hình `tsconfig.json` (ví dụ):
   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "outDir": "./dist",
       "strict": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules"]
   }
   ```
3. Biên dịch file TypeScript thành JavaScript:
   ```bash
   tsc typescript.ts
   ```
   Kết quả tạo ra file `typescript.js` có thể chạy bằng Node.js:
   ```bash
   node typescript.js
   ```
4. Biên dịch toàn bộ dự án:
   ```bash
   tsc
   ```
   Hoặc tự động biên dịch khi file thay đổi:
   ```bash
   tsc --watch
   ```

## Chuẩn bị kiến thức

- **Kiến thức cơ bản về JavaScript**: Hiểu cú pháp, biến, hàm, object, array.
- **Hiểu về kiểu dữ liệu**: Biết về kiểu tĩnh, interface, type alias trong TypeScript.
- **Làm quen với công cụ**: Nắm cách sử dụng Node.js, npm và IDE.
- **Thực hành**: Bắt đầu với các dự án nhỏ như tạo hàm, class, hoặc tích hợp với framework.

TypeScript là lựa chọn mạnh mẽ để nâng cao chất lượng mã nguồn và hiệu quả phát triển. Bắt đầu với các ví dụ đơn giản và dần dần áp dụng vào dự án thực tế để làm quen!

## Lab 1

- 1.  Viết 1 hàm trả về chu vi và diện tích hình chữ nhật
- 2.  Viết 1 hàm tính tổng nhiều số (không biết trước số lượng tham số), sử dụng rest parameter
- 3.  Viết hàm trả về số lượng xuất hiện của 1 kí tự trong chuỗi
- 4.  Viết hàm trả về boolean kiểm tra 1 số có phải số nguyên tố
