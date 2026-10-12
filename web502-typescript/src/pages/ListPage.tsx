import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

function ListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();     

  useEffect(() => {
    function getTodos() {
      axios.get("http://localhost:3000/todos").then((res) => {
        setTodos(res.data);
      });
    }
    getTodos();
  }, []);
  function handleDelete(id: string) {
    axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
      setTodos((prev) => prev.filter((item) => item.id !== id));
    });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Description
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {todos.map((item: Todo) => {
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    {item.id}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.completed ? "Hoan thanh" : "Chua hoan thanh"}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" onClick={() => handleDelete(item.id)}  >Delete</button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"  onClick={() => navigate(`/edit/${item.id}`)}>  Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;