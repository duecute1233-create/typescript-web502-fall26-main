# Lesson 8 - React + TypeScript: Call API với JSON Server + Axios

## 1. Mục tiêu bài học

Sau bài học này, sinh viên có thể:

- Hiểu API là gì.
- Call API bằng Axios.
- Hiểu sơ lược về `useEffect`.
- Lấy danh sách Todo từ API.
- Hiển thị dữ liệu lên giao diện.
- Xóa Todo bằng API `DELETE`.

---

# 2. Ôn lại kiến thức Lesson 7

Ở Lesson 7, chúng ta đã biết:

```text
State
useState
Props
Event
Component
```

Ví dụ:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
```

Ở Lesson 8, chúng ta sẽ lấy dữ liệu từ API:

```text
JSON Server
     ↓
    API
     ↓
  Axios
     ↓
   React
     ↓
 useState
     ↓
 Todo List
```

---

# 3. API là gì?

API là cách để các ứng dụng trao đổi dữ liệu với nhau.

Ví dụ:

```text
React
  │
  │ Request
  ↓
API Server
  │
  │ Response
  ↓
React
```

Ví dụ API trả về danh sách Todo:

```json
[
  {
    "id": "1",
    "title": "Học React",
    "completed": false
  },
  {
    "id": "2",
    "title": "Học TypeScript",
    "completed": true
  }
]
```

React nhận dữ liệu này và hiển thị lên giao diện.

---

# 4. JSON Server là gì?

**JSON Server** giúp chúng ta tạo một REST API giả lập từ một file JSON.

Thay vì phải xây dựng Backend bằng Node.js/Express, chúng ta có thể nhanh chóng tạo API để học React.

Ví dụ:

```text
db.json
   ↓
JSON Server
   ↓
http://localhost:3000/todos
```

---

# 5. Cài đặt JSON Server

Trong project React, chạy:

```bash
npm install json-server
```

---

# 6. Tạo file db.json

Tạo file:

```text
db.json
```

ở thư mục gốc của project:

```text
react-ts-demo
│
├── src
│
├── db.json
├── package.json
└── vite.config.ts
```

Nội dung:

```json
{
  "todos": [
    {
      "id": "1",
      "title": "Học React",
      "completed": false
    },
    {
      "id": "2",
      "title": "Học TypeScript",
      "completed": false
    },
    {
      "id": "3",
      "title": "Làm bài tập",
      "completed": true
    }
  ]
}
```

---

# 7. Chạy JSON Server

Chạy:

```bash
npx json-server db.json
```

JSON Server sẽ tạo API.

Mặc định:

```text
http://localhost:3000
```

API Todo:

```text
http://localhost:3000/todos
```

Mở trình duyệt:

```text
http://localhost:3000/todos
```

Nếu thấy:

```json
[
  {
    "id": "1",
    "title": "Học React",
    "completed": false
  }
]
```

thì API đã hoạt động.

---

# 8. REST API cơ bản

JSON Server cung cấp các API cơ bản:

| Method | URL        | Chức năng         |
| ------ | ---------- | ----------------- |
| GET    | `/todos`   | Lấy danh sách     |
| GET    | `/todos/1` | Lấy một Todo      |
| POST   | `/todos`   | Thêm Todo         |
| PUT    | `/todos/1` | Cập nhật Todo     |
| PATCH  | `/todos/1` | Cập nhật một phần |
| DELETE | `/todos/1` | Xóa Todo          |

Trong Lesson 8, chúng ta tập trung:

```text
GET
DELETE
```

---

# 9. Tạo Type cho Todo

Trong React, tạo interface:

```tsx
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
```

Giải thích:

```text
id
→ định danh Todo

title
→ nội dung Todo

completed
→ Todo đã hoàn thành hay chưa
```

Nên tách type dùng chung thành file:

```text
src
│
├── components
│   └── TodoItem.tsx
│
├── types
│   └── todo.ts
│
└── App.tsx
```

`src/types/todo.ts`:

```tsx
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
```

---

# 10. Cài đặt Axios

Axios là thư viện giúp gửi HTTP request đến API.

Trong project React, chạy:

```bash
npm install axios
```

Sau khi cài đặt, `package.json` sẽ có thêm Axios trong `dependencies`.

---

# 11. Axios là gì?

Axios giúp chúng ta gọi API dễ dàng hơn.

Với `fetch`, chúng ta thường phải làm:

```tsx
const response = await fetch("http://localhost:3000/todos");

const data = await response.json();
```

Với Axios:

```tsx
const response = await axios.get("http://localhost:3000/todos");

const data = response.data;
```

Axios tự động chuyển response JSON thành JavaScript object.

Có thể hiểu:

```text
fetch
 ↓
Response
 ↓
response.json()
 ↓
data

Axios
 ↓
response
 ↓
response.data
```

---

# 12. Import Axios

Trong file cần gọi API:

```tsx
import axios from "axios";
```

Ví dụ:

```tsx
import axios from "axios";

const response = await axios.get("http://localhost:3000/todos");

console.log(response.data);
```

---

# 13. Call API GET bằng Axios

Ví dụ đơn giản:

```tsx
import axios from "axios";

const getTodos = async () => {
  const response = await axios.get("http://localhost:3000/todos");

  console.log(response.data);
};
```

Luồng hoạt động:

```text
getTodos()
   ↓
axios.get()
   ↓
GET /todos
   ↓
JSON Server
   ↓
response.data
```

---

# 14. Vấn đề: Khi nào gọi API?

React Component có thể render nhiều lần.

Chúng ta không muốn mỗi lần Component render lại đều gọi API.

React cung cấp Hook:

```text
useEffect
```

để xử lý các **side effect**, trong đó có việc gọi API.

---

# 15. Giới thiệu useEffect

Import:

```tsx
import { useEffect } from "react";
```

Cú pháp:

```tsx
useEffect(() => {
  // code cần thực hiện
}, []);
```

Ví dụ:

```tsx
useEffect(() => {
  console.log("Component được render");
}, []);
```

`[]` có nghĩa là Effect chỉ chạy một lần sau lần render đầu tiên.

Có thể hiểu đơn giản:

```text
Component render
       ↓
   useEffect
       ↓
   gọi API
```

---

# 16. useEffect với Axios

Ví dụ:

```tsx
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((response) => {
      console.log(response.data);
    });
  }, []);

  return <h1>Todo List</h1>;
}

export default App;
```

Khi `App` được render lần đầu:

```text
App render
   ↓
useEffect
   ↓
axios.get()
   ↓
GET /todos
   ↓
Nhận dữ liệu
   ↓
console.log(response.data)
```

---

# 17. Kết hợp useEffect + useState + Axios

Bây giờ chúng ta lưu dữ liệu API vào State.

```tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get<Todo[]>("http://localhost:3000/todos").then((response) => {
      setTodos(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Todo List</h1>

      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}

export default App;
```

Ở đây:

```tsx
axios.get<Todo[]>(...)
```

giúp TypeScript biết dữ liệu API trả về là:

```text
Todo[]
```

---

# 18. Giải thích luồng hoạt động

```text
App render
    ↓
todos = []
    ↓
useEffect chạy
    ↓
axios.get("/todos")
    ↓
API trả dữ liệu
    ↓
response.data
    ↓
setTodos(response.data)
    ↓
todos thay đổi
    ↓
React render lại
    ↓
Hiển thị Todo
```

Đây là một trong những luồng quan trọng nhất khi làm React với API.

---

# 19. Tách TodoItem thành Component

Không nên viết toàn bộ Todo List trong `App.tsx`.

Tạo:

```text
src
│
├── components
│   └── TodoItem.tsx
│
├── types
│   └── todo.ts
│
└── App.tsx
```

`TodoItem.tsx`:

```tsx
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <div>
      <span>{todo.title}</span>
    </div>
  );
}

export default TodoItem;
```

---

# 20. TodoItem hoàn chỉnh

```tsx
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <div>
      <span>{todo.title}</span>

      {todo.completed && <span> - Đã hoàn thành</span>}
    </div>
  );
}

export default TodoItem;
```

---

# 21. App hiển thị Todo bằng Axios

```tsx
import { useEffect, useState } from "react";
import axios from "axios";

import TodoItem from "./components/TodoItem";
import type { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get<Todo[]>("http://localhost:3000/todos").then((response) => {
      setTodos(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Todo List</h1>

      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default App;
```

---

# 22. Thêm trạng thái Loading

Khi gọi API, dữ liệu chưa xuất hiện ngay.

Có thể tạo State:

```tsx
const [loading, setLoading] = useState(true);
```

Sau khi API trả về:

```tsx
setTodos(response.data);
setLoading(false);
```

Hiển thị:

```tsx
if (loading) {
  return <p>Đang tải...</p>;
}
```

---

# 23. Xử lý lỗi API

Khi làm việc với API, request có thể xảy ra lỗi.

Axios cho phép sử dụng `try/catch`:

```tsx
try {
  const response = await axios.get<Todo[]>("http://localhost:3000/todos");

  setTodos(response.data);
} catch (error) {
  console.error(error);
}
```

Có thể tạo State để hiển thị lỗi:

```tsx
const [error, setError] = useState("");
```

Khi xảy ra lỗi:

```tsx
catch (error) {
  console.error(error);
  setError("Không thể tải danh sách Todo");
}
```

Hiển thị:

```tsx
if (error) {
  return <p>{error}</p>;
}
```

---

# 24. Tạo Function getTodos

Thay vì viết trực tiếp toàn bộ logic trong `useEffect`, chúng ta có thể tạo Function:

```tsx
const getTodos = async () => {
  const response = await axios.get<Todo[]>("http://localhost:3000/todos");

  setTodos(response.data);
  setLoading(false);
};
```

Sau đó gọi:

```tsx
useEffect(() => {
  getTodos();
}, []);
```

---

# 25. Xóa Todo

JSON Server hỗ trợ:

```text
DELETE /todos/:id
```

Ví dụ xóa Todo có id `1`:

```text
DELETE http://localhost:3000/todos/1
```

Với Axios:

```tsx
await axios.delete(`http://localhost:3000/todos/${id}`);
```

Axios tự tạo HTTP request với method:

```text
DELETE
```

---

# 26. Tạo Function deleteTodo

Trong `App.tsx`:

```tsx
const deleteTodo = async (id: string) => {
  await axios.delete(`http://localhost:3000/todos/${id}`);
};
```

Sau khi xóa thành công, cần cập nhật State.

Có thể sử dụng:

```tsx
setTodos(todos.filter((todo) => todo.id !== id));
```

Hoàn chỉnh:

```tsx
const deleteTodo = async (id: string) => {
  await axios.delete(`http://localhost:3000/todos/${id}`);

  setTodos(todos.filter((todo) => todo.id !== id));
};
```

---

# 27. Truyền Function xuống TodoItem

`TodoItem` cần nhận Function xóa.

Props:

```tsx
interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
}
```

Component:

```tsx
function TodoItem({ todo, onDelete }: TodoItemProps) {
  return (
    <div>
      <span>{todo.title}</span>

      <button onClick={() => onDelete(todo.id)}>Xóa</button>
    </div>
  );
}
```

---

# 28. App truyền Function xuống TodoItem

```tsx
{
  todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
  ));
}
```

Luồng hoạt động:

```text
App
 │
 │ deleteTodo()
 ↓
TodoItem
 │
 │ click
 ↓
onDelete(todo.id)
 │
 ↓
axios.delete()
 │
 ↓
DELETE API
 │
 ↓
setTodos()
 │
 ↓
UI cập nhật
```

Đây chính là kiến thức Props + Event + State đã học ở các Lesson trước được áp dụng vào API thực tế.

---

# 29. TodoItem hoàn chỉnh

```tsx
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onDelete }: TodoItemProps) {
  return (
    <div>
      <span>{todo.title}</span>

      {todo.completed && <span> - Đã hoàn thành</span>}

      <button onClick={() => onDelete(todo.id)}>Xóa</button>
    </div>
  );
}

export default TodoItem;
```

---

# 30. App hoàn chỉnh

```tsx
import { useEffect, useState } from "react";

import axios from "axios";

import TodoItem from "./components/TodoItem";
import type { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const getTodos = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<Todo[]>("http://localhost:3000/todos");

      setTodos(response.data);
    } catch (error) {
      console.error(error);
      setError("Không thể tải danh sách Todo");
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);

      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
      setError("Không thể xóa Todo");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Todo List</h1>

      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
      ))}
    </div>
  );
}

export default App;
```

---

# 31. Vì sao dùng Axios thay cho fetch?

Trong bài này, chúng ta chuyển từ `fetch` sang Axios.

## Với fetch

```tsx
const response = await fetch("http://localhost:3000/todos");

const data = await response.json();
```

## Với Axios

```tsx
const response = await axios.get<Todo[]>("http://localhost:3000/todos");

const data = response.data;
```

Axios giúp code gọi API ngắn gọn hơn và cung cấp nhiều tính năng thuận tiện khi project lớn hơn.

Một điểm quan trọng:

```text
fetch
→ cần response.json()

axios
→ sử dụng response.data
```

---

# 32. Axios và các HTTP Method

Axios hỗ trợ các HTTP Method phổ biến:

```tsx
axios.get(url);
```

```tsx
axios.post(url, data);
```

```tsx
axios.put(url, data);
```

```tsx
axios.patch(url, data);
```

```tsx
axios.delete(url);
```

Trong Lesson 8, chúng ta tập trung:

```text
GET
DELETE
```

Các method còn lại sẽ được sử dụng ở các Lesson tiếp theo.

---

# 33. Một vấn đề quan trọng với useEffect

Đoạn:

```tsx
useEffect(() => {
  getTodos();
}, []);
```

`[]` rất quan trọng.

Nó giúp Effect chạy sau lần render đầu tiên.

Có thể hiểu đơn giản:

```text
App mở
   ↓
Render
   ↓
useEffect
   ↓
axios.get()
   ↓
GET /todos
```

Nếu bỏ `[]`:

```tsx
useEffect(() => {
  getTodos();
});
```

Effect có thể chạy sau mỗi lần render.

Điều này có thể dẫn đến việc gọi API nhiều lần không cần thiết.

---

# 34. Kiến thức useEffect cần nhớ ở Lesson 8

Ở bài này chỉ cần nhớ:

```tsx
useEffect(() => {
  // code
}, []);
```

Dùng để thực hiện các công việc sau khi Component render, ví dụ:

```text
Gọi API
Đăng ký event
Làm việc với trình duyệt
Đồng bộ dữ liệu
```

Chưa cần đi sâu vào tất cả trường hợp sử dụng `useEffect`.

---

# 35. Bài tập thực hành

## Bài 1 - Hiển thị Todo

Sử dụng JSON Server:

```text
GET /todos
```

Sử dụng Axios để gọi API.

Hiển thị:

```text
Todo List

1. Học React
2. Học TypeScript
3. Làm bài tập
```

---

## Bài 2 - TodoItem

Tách Todo thành Component:

```text
TodoItem
```

Props:

```tsx
interface TodoItemProps {
  todo: Todo;
}
```

---

## Bài 3 - Xóa Todo

Thêm button:

```text
[Xóa]
```

Khi click:

```text
axios.delete()
       ↓
DELETE /todos/:id
```

Todo phải biến mất khỏi giao diện.

---

## Bài 4 - Loading

Khi đang gọi API:

```text
Đang tải...
```

Sau khi API trả về:

```text
Todo List
```

---

## Bài 5 - Xử lý lỗi

Khi JSON Server không chạy hoặc API lỗi:

```text
Không thể tải danh sách Todo
```

---

# 36. Bài tập nâng cao

Thêm giao diện:

```text
-------------------------------
           TODO LIST
-------------------------------

[ Nhập công việc... ] [Thêm]

□ Học React             [Xóa]
□ Học TypeScript        [Xóa]
☑ Làm bài tập           [Xóa]

-------------------------------
```

Ở Lesson 8:

- Chưa bắt buộc xử lý `POST`.
- Chưa bắt buộc xử lý `PUT/PATCH`.
- Tập trung vào `GET`, `DELETE`, `useEffect`, Axios.
- Có thể tự tìm hiểu thêm cách xử lý lỗi với Axios.

---

# 37. Tổng kết Lesson 8

Sau bài học này, sinh viên đã kết nối được:

```text
React
  ↓
useEffect
  ↓
Axios
  ↓
JSON Server
  ↓
API
  ↓
useState
  ↓
Props
  ↓
Event
```

Luồng GET:

```text
Component render
       ↓
useEffect
       ↓
axios.get()
       ↓
GET /todos
       ↓
JSON Server
       ↓
response.data
       ↓
setTodos(response.data)
       ↓
React render
       ↓
Todo List
```

Luồng DELETE:

```text
Click Xóa
    ↓
onDelete(id)
    ↓
axios.delete()
    ↓
DELETE /todos/:id
    ↓
API xóa dữ liệu
    ↓
setTodos()
    ↓
Todo biến mất
```

---

# 38. Kiến thức đã học đến Lesson 8

```text
Lesson 1
JSX
Component
Function Component

        ↓

Lesson 2
Props
Event
Callback Function

        ↓

Lesson 7
State
useState

        ↓

Lesson 8
API
JSON Server
Axios
useEffect
GET
DELETE
Loading
Error Handling
```

Đây là nền tảng để bước sang:

```text
Lesson tiếp theo
POST + Form
        ↓
PUT / PATCH
        ↓
CRUD hoàn chỉnh
        ↓
React Router
        ↓
API Service
        ↓
Axios Instance
```
