# Lesson 9 - React + TypeScript: React Hook Form

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Hiểu tại sao cần Form Library trong React.
- Cài đặt và sử dụng **React Hook Form**.
- Tạo Form thêm Todo.
- Hiểu `register()`, `handleSubmit()`, `errors`.
- Validate dữ liệu Form.
- Kết hợp React Hook Form + Axios.
- Gửi `POST /todos` lên JSON Server.
- Cập nhật danh sách Todo sau khi thêm.
- Hiểu luồng hoạt động của React Hook Form.

---

# 2. Ôn lại Lesson 8

Ở Lesson 8, chúng ta đã làm được:

```text
JSON Server
    ↓
Axios
    ↓
GET /todos
    ↓
React
    ↓
useState
    ↓
Todo List
```

Và xóa:

```text
Click Xóa
    ↓
axios.delete()
    ↓
DELETE /todos/:id
    ↓
setTodos()
    ↓
UI cập nhật
```

Lesson 9 sẽ bổ sung:

```text
Form
 ↓
React Hook Form
 ↓
Validate
 ↓
Axios POST
 ↓
JSON Server
 ↓
Todo mới
 ↓
UI cập nhật
```

---

# 3. Vấn đề khi xử lý Form bằng useState

Giả sử chúng ta muốn tạo Form:

```text
[ Nhập công việc... ] [Thêm]
```

Cách đơn giản có thể sử dụng:

```tsx
const [title, setTitle] = useState("");
```

Input:

```tsx
<input value={title} onChange={(event) => setTitle(event.target.value)} />
```

Khi Submit:

```tsx
const handleSubmit = () => {
  console.log(title);
};
```

Cách này hoàn toàn đúng.

Tuy nhiên khi Form có nhiều field:

```text
title
description
email
phone
password
...
```

chúng ta phải tạo nhiều State và nhiều `onChange`.

Ví dụ:

```tsx
const [title, setTitle] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
```

Form càng lớn thì code càng nhiều.

Đây là một trong những lý do chúng ta sử dụng:

```text
React Hook Form
```

---

# 4. React Hook Form là gì?

**React Hook Form** là thư viện giúp quản lý Form trong React.

Cài đặt:

```bash
npm install react-hook-form
```

Sau khi cài đặt:

```text
React
  ↓
React Hook Form
  ↓
Quản lý Form
  ↓
Validate
  ↓
Submit
```

React Hook Form cung cấp nhiều API, trong Lesson 9 chúng ta tập trung vào:

```text
useForm()
register()
handleSubmit()
formState.errors
```

---

# 5. Cách React Hook Form hoạt động

Có thể hình dung:

```text
Input
  ↓
register()
  ↓
React Hook Form
  ↓
Theo dõi dữ liệu
  ↓
Validate
  ↓
handleSubmit()
  ↓
onSubmit(data)
```

Ví dụ:

```tsx
const { register, handleSubmit } = useForm();
```

Đăng ký Input:

```tsx
<input {...register("title")} />
```

Submit:

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

Function:

```tsx
const onSubmit = (data) => {
  console.log(data);
};
```

Nếu nhập:

```text
Học React
```

thì:

```tsx
data;
```

sẽ có:

```tsx
{
  title: "Học React";
}
```

---

# 6. useForm()

Import:

```tsx
import { useForm } from "react-hook-form";
```

Sử dụng:

```tsx
const { register, handleSubmit } = useForm();
```

Có thể hiểu:

```text
useForm()
    ↓
React Hook Form
    ↓
register()
handleSubmit()
errors
...
```

---

# 7. register() là gì?

`register()` dùng để đăng ký một input với React Hook Form.

Ví dụ:

```tsx
<input {...register("title")} />
```

Tên field là:

```text
title
```

Khi người dùng nhập:

```text
Học React
```

React Hook Form sẽ quản lý dữ liệu:

```tsx
{
  title: "Học React";
}
```

---

# 8. Tại sao có {...register()}?

Đây là cú pháp Spread Operator đã học ở JavaScript.

Ví dụ:

```tsx
register("title");
```

React Hook Form trả về một số thuộc tính cần thiết cho Input.

Có thể hiểu đơn giản:

```tsx
<input
  name="title"
  onChange={...}
  onBlur={...}
  ref={...}
/>
```

Thay vì tự viết tất cả, chúng ta sử dụng:

```tsx
<input {...register("title")} />
```

Đây là cách phổ biến khi sử dụng React Hook Form.

---

# 9. handleSubmit() là gì?

`handleSubmit()` dùng để xử lý việc Submit Form.

Ví dụ:

```tsx
const onSubmit = (data) => {
  console.log(data);
};
```

Form:

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

Luồng:

```text
Click Submit
      ↓
handleSubmit()
      ↓
Kiểm tra Form
      ↓
Validate
      ↓
Nếu hợp lệ
      ↓
onSubmit(data)
```

Nếu dữ liệu không hợp lệ:

```text
Click Submit
      ↓
handleSubmit()
      ↓
Validate
      ↓
Có lỗi
      ↓
Không gọi onSubmit()
```

Đây là điểm rất quan trọng.

---

# 10. Tạo TodoForm

Tạo file:

```text
src
├── components
│   ├── TodoItem.tsx
│   └── TodoForm.tsx
│
├── types
│   └── todo.ts
│
└── App.tsx
```

Todo Form:

```tsx
import { useForm } from "react-hook-form";

interface TodoFormData {
  title: string;
}

function TodoForm() {
  const { register, handleSubmit } = useForm<TodoFormData>();

  const onSubmit = (data: TodoFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} />

      <button type="submit">Thêm</button>
    </form>
  );
}

export default TodoForm;
```

---

# 11. TypeScript với React Hook Form

Ở đây chúng ta có:

```tsx
interface TodoFormData {
  title: string;
}
```

Sau đó:

```tsx
useForm<TodoFormData>();
```

Nhờ vậy TypeScript biết Form có:

```text
title: string
```

Function:

```tsx
const onSubmit = (data: TodoFormData) => {
  console.log(data);
};
```

Nếu:

```tsx
data.title;
```

TypeScript biết đây là:

```text
string
```

---

# 12. Form hiện tại hoạt động như thế nào?

Khi người dùng nhập:

```text
Học React Hook Form
```

React Hook Form quản lý dữ liệu:

```text
title
  ↓
"Học React Hook Form"
```

Khi click:

```text
[Thêm]
```

luồng:

```text
Submit
  ↓
handleSubmit()
  ↓
validate
  ↓
onSubmit()
  ↓
data
```

`data`:

```json
{
  "title": "Học React Hook Form"
}
```

---

# 13. Validate dữ liệu là gì?

Validate nghĩa là **kiểm tra dữ liệu trước khi xử lý**.

Ví dụ Todo không được để trống.

Không hợp lệ:

```text
[                  ] [Thêm]
```

Hợp lệ:

```text
[ Học React ] [Thêm]
```

Chúng ta có thể đặt Rule:

```text
title
 ↓
required
```

Ngoài ra có thể kiểm tra:

```text
Không được để trống
Ít nhất 3 ký tự
Không quá 100 ký tự
```

---

# 14. Validate bằng React Hook Form

Sử dụng:

```tsx
register("title", {
  required: "Vui lòng nhập công việc",
});
```

Ví dụ:

```tsx
<input
  {...register("title", {
    required: "Vui lòng nhập công việc",
  })}
/>
```

Nếu không nhập:

```text
Vui lòng nhập công việc
```

---

# 15. formState.errors

React Hook Form cung cấp:

```tsx
formState.errors;
```

Chúng ta lấy:

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<TodoFormData>();
```

Sau đó:

```tsx
{
  errors.title && <p>{errors.title.message}</p>;
}
```

Luồng:

```text
User Submit
     ↓
Validate
     ↓
Có lỗi?
   ↙   ↘
 Có     Không
 ↓        ↓
errors   onSubmit()
```

---

# 16. TodoForm có Validate

Code hoàn chỉnh:

```tsx
import { useForm } from "react-hook-form";

interface TodoFormData {
  title: string;
}

function TodoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormData>();

  const onSubmit = (data: TodoFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Nhập công việc..."
        {...register("title", {
          required: "Vui lòng nhập công việc",
        })}
      />

      {errors.title && <p>{errors.title.message}</p>}

      <button type="submit">Thêm</button>
    </form>
  );
}

export default TodoForm;
```

---

# 17. Validate nhiều Rule

React Hook Form cho phép khai báo nhiều Rule.

Ví dụ:

```tsx
register("title", {
  required: "Vui lòng nhập công việc",
  minLength: {
    value: 3,
    message: "Công việc phải có ít nhất 3 ký tự",
  },
  maxLength: {
    value: 100,
    message: "Công việc không được quá 100 ký tự",
  },
});
```

Có thể hiểu:

```text
title
 │
 ├── required
 │
 ├── minLength
 │
 └── maxLength
```

---

# 18. Ví dụ Validate đầy đủ

```tsx
<input
  placeholder="Nhập công việc..."
  {...register("title", {
    required: "Vui lòng nhập công việc",

    minLength: {
      value: 3,
      message: "Công việc phải có ít nhất 3 ký tự",
    },

    maxLength: {
      value: 100,
      message: "Công việc không được quá 100 ký tự",
    },
  })}
/>
```

Hiển thị lỗi:

```tsx
{
  errors.title && <p>{errors.title.message}</p>;
}
```

---

# 19. Validate bằng pattern

Có thể kiểm tra dữ liệu bằng Regex.

Ví dụ chỉ cho phép chữ, số và khoảng trắng:

```tsx
pattern: {
  value: /^[a-zA-ZÀ-ỹ0-9\s]+$/,
  message: "Tiêu đề chứa ký tự không hợp lệ",
}
```

Ví dụ Email:

```tsx
register("email", {
  required: "Vui lòng nhập email",

  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Email không hợp lệ",
  },
});
```

Trong Lesson 9, sinh viên chỉ cần hiểu:

```text
required
minLength
maxLength
pattern
```

---

# 20. POST Todo bằng Axios

Lesson 8 đã có:

```text
GET /todos
DELETE /todos/:id
```

Lesson 9 thêm:

```text
POST /todos
```

Axios:

```tsx
axios.post(url, data);
```

Ví dụ:

```tsx
await axios.post("http://localhost:3000/todos", {
  title: "Học React Hook Form",
  completed: false,
});
```

JSON Server sẽ tạo Todo mới.

---

# 21. Luồng POST

```text
User nhập Form
       ↓
React Hook Form
       ↓
Validate
       ↓
onSubmit(data)
       ↓
axios.post()
       ↓
POST /todos
       ↓
JSON Server
       ↓
Tạo Todo
```

---

# 22. Tách API thành Function

Trong `TodoForm.tsx`:

```tsx
const createTodo = async (data: TodoFormData) => {
  await axios.post("http://localhost:3000/todos", {
    title: data.title,
    completed: false,
  });
};
```

Sau đó:

```tsx
const onSubmit = async (data: TodoFormData) => {
  await createTodo(data);
};
```

---

# 23. Vấn đề cập nhật danh sách

Sau khi POST thành công:

```text
POST /todos
```

JSON Server đã có Todo mới.

Nhưng React đang có State:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
```

State chưa tự động biết Todo mới.

Có hai cách.

### Cách 1

Gọi lại API:

```text
POST
 ↓
GET /todos
 ↓
setTodos()
```

### Cách 2

Lấy Todo vừa tạo rồi thêm trực tiếp vào State.

Trong Lesson 9, nên sử dụng **Cách 2** để sinh viên hiểu rõ State.

---

# 24. TodoForm nhận onAdd

TodoForm không nên tự quản lý danh sách Todo.

App đang sở hữu:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
```

Vì vậy App truyền Function xuống:

```tsx
<TodoForm onAdd={addTodo} />
```

Props:

```tsx
interface TodoFormProps {
  onAdd: (todo: Todo) => void;
}
```

Luồng:

```text
App
 │
 │ onAdd
 ↓
TodoForm
 │
 │ submit
 ↓
axios.post()
 │
 ↓
Todo mới
 │
 ↓
onAdd(todo)
 │
 ↓
App
 │
 ↓
setTodos()
```

---

# 25. TodoForm hoàn chỉnh

```tsx
import axios from "axios";
import { useForm } from "react-hook-form";
import type { Todo } from "../types/todo";

interface TodoFormData {
  title: string;
}

interface TodoFormProps {
  onAdd: (todo: Todo) => void;
}

function TodoForm({ onAdd }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>();

  const onSubmit = async (data: TodoFormData) => {
    try {
      const response = await axios.post<Todo>("http://localhost:3000/todos", {
        title: data.title,
        completed: false,
      });

      onAdd(response.data);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Nhập công việc..."
        {...register("title", {
          required: "Vui lòng nhập công việc",

          minLength: {
            value: 3,
            message: "Công việc phải có ít nhất 3 ký tự",
          },

          maxLength: {
            value: 100,
            message: "Công việc không được quá 100 ký tự",
          },
        })}
      />

      <button type="submit">Thêm</button>

      {errors.title && <p>{errors.title.message}</p>}
    </form>
  );
}

export default TodoForm;
```

---

# 26. reset() là gì?

React Hook Form cung cấp:

```tsx
reset();
```

Dùng để đưa Form về trạng thái ban đầu.

Ví dụ trước khi Submit:

```text
[ Học React Hook Form ] [Thêm]
```

Sau khi POST thành công:

```tsx
reset();
```

Form trở thành:

```text
[                    ] [Thêm]
```

Luồng:

```text
Submit
 ↓
Validate
 ↓
POST
 ↓
Thành công
 ↓
reset()
 ↓
Input rỗng
```

---

# 30. Luồng hoạt động toàn bộ Lesson 9

Đây là phần sinh viên cần đặc biệt nhớ.

```text
                    APP
                     │
              todos + setTodos
                     │
          ┌──────────┴──────────┐
          │                     │
          ↓                     ↓
      TodoForm              TodoItem
          │                     │
          │                     │
     React Hook Form          Xóa
          │                     │
          ↓                     ↓
      register()          onDelete(id)
          │                     │
          ↓                     ↓
       Input              axios.delete()
          │                     │
          ↓                     ↓
   handleSubmit()          DELETE API
          │
          ↓
       Validate
          │
     ┌────┴────┐
     │         │
    Lỗi       OK
     │         │
     ↓         ↓
  errors    onSubmit()
               │
               ↓
          axios.post()
               │
               ↓
          POST /todos
               │
               ↓
          JSON Server
               │
               ↓
          Todo mới
               │
               ↓
            onAdd()
               │
               ↓
          setTodos()
               │
               ↓
           React render
```

---

# 31. So sánh Form useState và React Hook Form

## Cách dùng useState

```tsx
const [title, setTitle] = useState("");

<input value={title} onChange={(event) => setTitle(event.target.value)} />;
```

Submit:

```tsx
const handleSubmit = () => {
  console.log(title);
};
```

Validate:

```tsx
if (!title) {
  // lỗi
}
```

---

## React Hook Form

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<TodoFormData>();
```

Input:

```tsx
<input
  {...register("title", {
    required: "Vui lòng nhập công việc",
  })}
/>
```

Submit:

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

Validate:

```tsx
errors.title;
```

Có thể hiểu:

```text
useState

Input
 ↓
onChange
 ↓
setState
 ↓
State
```

Trong khi:

```text
React Hook Form

Input
 ↓
register()
 ↓
React Hook Form
 ↓
Validate
 ↓
handleSubmit()
 ↓
data
```

---

# 32. Vì sao React Hook Form tiện hơn khi Form lớn?

Ví dụ Form có:

```text
Tên
Email
Số điện thoại
Mật khẩu
Địa chỉ
Ngày sinh
...
```

Nếu dùng `useState`:

```tsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const [address, setAddress] = useState("");
```

Và rất nhiều:

```text
onChange
validate
error
submit
```

React Hook Form gom phần lớn việc quản lý Form:

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
```

Đặc biệt hữu ích khi Form có nhiều field và nhiều Rule validate.

---

# 33. Một điểm quan trọng: Validate ở Frontend

React Hook Form validate:

```text
Browser
 ↓
React
 ↓
React Hook Form
 ↓
Validate
```

Ví dụ:

```text
title rỗng
 ↓
Không gửi POST
```

Điều này giúp trải nghiệm người dùng tốt hơn.

Tuy nhiên:

> **Frontend validation không thay thế Backend validation.**

Trong project thực tế:

```text
Frontend
 ↓
Validate
 ↓
API
 ↓
Backend
 ↓
Validate lại
 ↓
Database
```

Ví dụ:

```text
React Hook Form
    ↓
required
    ↓
POST /todos
    ↓
Express
    ↓
Joi/Zod
    ↓
Database
```

Đây là kiến thức rất quan trọng khi chuyển sang Backend.

---

# 34. Các Rule Validate quan trọng

| Rule        | Ý nghĩa              |
| ----------- | -------------------- |
| `required`  | Không được để trống  |
| `minLength` | Độ dài tối thiểu     |
| `maxLength` | Độ dài tối đa        |
| `min`       | Giá trị tối thiểu    |
| `max`       | Giá trị tối đa       |
| `pattern`   | Kiểm tra Regex       |
| `validate`  | Tự viết hàm kiểm tra |

Ví dụ:

```tsx
register("title", {
  required: "Bắt buộc nhập",

  minLength: {
    value: 3,
    message: "Tối thiểu 3 ký tự",
  },

  maxLength: {
    value: 100,
    message: "Tối đa 100 ký tự",
  },
});
```

---

# 35. `validate` - Tự viết Logic

React Hook Form cũng cho phép tự viết validation.

Ví dụ không cho phép Todo có nội dung:

```text
test
```

Có thể:

```tsx
validate: (value) => {
  if (value.toLowerCase() === "test") {
    return "Không được nhập test";
  }

  return true;
};
```

Ví dụ đầy đủ:

```tsx
register("title", {
  required: "Vui lòng nhập công việc",

  minLength: {
    value: 3,
    message: "Tối thiểu 3 ký tự",
  },

  validate: (value) => {
    if (value.toLowerCase() === "test") {
      return "Không được nhập test";
    }

    return true;
  },
});
```

Quy tắc:

```text
return true
    ↓
Hợp lệ

return "Thông báo lỗi"
    ↓
Không hợp lệ
```

---

# 36. Bài tập thực hành

## Bài 1 - Tạo Todo Form

Tạo:

```text
TodoForm.tsx
```

Có:

```text
[ Nhập công việc... ] [Thêm]
```

Sử dụng:

```tsx
useForm();
register();
handleSubmit();
```

---

## Bài 2 - Validate bắt buộc

Không cho phép Submit khi:

```text
title = ""
```

Hiển thị:

```text
Vui lòng nhập công việc
```

---

## Bài 3 - Validate độ dài

Yêu cầu:

```text
Ít nhất 3 ký tự
Tối đa 100 ký tự
```

---

## Bài 4 - POST Todo

Khi Submit hợp lệ:

```text
axios.post()
```

Gửi:

```json
{
  "title": "Học React Hook Form",
  "completed": false
}
```

đến:

```text
POST /todos
```

---

## Bài 5 - Cập nhật giao diện

Sau khi thêm thành công:

```text
Todo mới
```

phải xuất hiện ngay trên giao diện.

---

## Bài 6 - Reset Form

Sau khi thêm thành công:

```tsx
reset();
```

Input trở thành:

```text
[                    ]
```

---

# 37. Bài tập nâng cao

Hoàn thiện giao diện:

```text
--------------------------------------

              TODO LIST

--------------------------------------

[ Nhập công việc................ ] [Thêm]

Lỗi: Vui lòng nhập công việc

--------------------------------------

□ Học React                         [Xóa]

□ Học TypeScript                   [Xóa]

☑ Làm bài tập                      [Xóa]

□ Học React Hook Form              [Xóa]

--------------------------------------
```

Yêu cầu:

```text
GET       → lấy Todo
POST      → thêm Todo
DELETE    → xóa Todo

React Hook Form
      ↓
register
      ↓
validate
      ↓
handleSubmit
      ↓
Axios
      ↓
JSON Server
```

---

# 38. Kiến thức cần nhớ

### React Hook Form

```tsx
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<FormData>();
```

### Register

```tsx
<input {...register("title")} />
```

### Submit

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

### Validate

```tsx
register("title", {
  required: "Bắt buộc nhập",
});
```

### Error

```tsx
{
  errors.title && <p>{errors.title.message}</p>;
}
```

### POST

```tsx
axios.post(url, data);
```

### Reset

```tsx
reset();
```

---

# 39. Tổng kết Lesson 9

```text
POST
React Hook Form
register()
handleSubmit()
errors
reset()
Validation
```

Luồng hoàn chỉnh:

```text
                  React
                    │
        ┌───────────┴───────────┐
        │                       │
      GET                     FORM
        │                       │
      Axios               React Hook Form
        │                       │
   JSON Server              register()
        │                       │
     todos                  Validate
        │                       │
     useState              handleSubmit()
        │                       │
        │                    onSubmit()
        │                       │
        │                   axios.post()
        │                       │
        │                  JSON Server
        │                       │
        └───────────┬───────────┘
                    ↓
                  UI
```

**Điểm quan trọng nhất của Lesson 9:** Cần hiểu được luồng:

```text
register
   ↓
validate
   ↓
handleSubmit
   ↓
onSubmit
   ↓
axios.post
   ↓
cập nhật state
   ↓
render lại UI
```
