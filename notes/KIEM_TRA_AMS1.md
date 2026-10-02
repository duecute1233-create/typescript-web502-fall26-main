# BÀI KIỂM TRA 60 PHÚT
## React + TypeScript + Axios + JSON Server

**Thời gian:** 60 phút  
**Tổng điểm:** 10 điểm

## Đề bài

Xây dựng ứng dụng **Quản lý danh sách sân bóng** sử dụng React + TypeScript + Axios + JSON Server.

API:

```text
http://localhost:3000/pitches
```

Dữ liệu mẫu:

```json
{
  "pitches": [
    {
      "id": "1",
      "name": "Sân bóng số 01",
      "price": 200000,
      "location": "Hà Đông",
      "type": "Sân 5"
    },
    {
      "id": "2",
      "name": "Sân bóng số 02",
      "price": 250000,
      "location": "Thanh Xuân",
      "type": "Sân 7"
    },
    {
      "id": "3",
      "name": "Sân bóng số 03",
      "price": 180000,
      "location": "Cầu Giấy",
      "type": "Sân 5"
    },
    {
      "id": "4",
      "name": "Sân bóng số 04",
      "price": 300000,
      "location": "Hà Đông",
      "type": "Sân 7"
    }
  ]
}
```

---

## Câu 1 – Hiển thị danh sách sân bóng – 3 điểm

Sử dụng Axios và `useEffect` để lấy dữ liệu từ:

```text
GET /pitches
```

Hiển thị danh sách sân bóng gồm:

- STT
- Tên sân
- Giá thuê/giờ
- Địa điểm
- Loại sân

Dữ liệu phải được lưu vào `useState`.

---

## Câu 2 – Xóa sân bóng – 2.5 điểm

Mỗi sân bóng có nút:

```text
[Xóa]
```

Khi click **Xóa**, thực hiện:

```text
DELETE /pitches/:id
```

Sau khi xóa thành công, sân bóng phải được xóa khỏi danh sách đang hiển thị.

---

## Câu 3 – Tìm kiếm sân bóng bằng JSON Server – 2.5 điểm

Tạo ô tìm kiếm:

```text
[Tìm kiếm tên sân...]
```

Khi người dùng nhập từ khóa, gửi yêu cầu tìm kiếm trực tiếp lên **JSON Server**.

Yêu cầu:

- Không lọc danh sách bằng `filter()` ở phía React.
- Sử dụng API của JSON Server để tìm kiếm.
- Tìm kiếm theo trường `name`.
- Kết quả tìm kiếm được cập nhật lên giao diện.
- Ví dụ:

```text
GET /pitches?name_like=02
```

Kết quả hiển thị:

```text
Sân bóng số 02
```

---

## Câu 4 – Cột tự sinh – 1 điểm

Thêm cột:

```text
Giá thuê 2 giờ
```

Giá trị được tự động tính:

```text
Giá thuê 2 giờ = Giá thuê/giờ × 2
```

Cột này **không được lưu vào `db.json`** mà phải được tính tự động khi hiển thị danh sách.

---

## Câu 5 – Câu lấy điểm 10 – 1 điểm

Thêm chức năng lọc sân bóng theo **Loại sân**:

```text
[Tất cả loại sân ▼]
```

Các lựa chọn:

```text
Tất cả
Sân 5
Sân 7
```

Khi người dùng chọn loại sân, gửi request lên **JSON Server** để lấy dữ liệu phù hợp.

Ví dụ:

```text
GET /pitches?type=Sân 5
```

Kết quả:

```text
Sân bóng số 01
Sân bóng số 03
```

Nếu chọn **Tất cả**, hiển thị toàn bộ danh sách sân bóng.

---

# Tổng điểm

| Nội dung | Điểm |
|---|---:|
| Câu 1 – Hiển thị danh sách | 3 điểm |
| Câu 2 – Xóa sân bóng | 2.5 điểm |
| Câu 3 – Tìm kiếm bằng JSON Server | 2.5 điểm |
| Câu 4 – Cột tự sinh | 1 điểm |
| Câu 5 – Lọc theo loại sân | 1 điểm |
| **Tổng cộng** | **10 điểm** |

## Yêu cầu công nghệ

- React
- TypeScript
- Axios
- JSON Server
- `useState`
- `useEffect`
- Không sử dụng thư viện quản lý State/API khác.
