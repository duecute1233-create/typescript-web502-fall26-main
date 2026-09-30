import { useState } from "react";

function ListPage() {
  // const item = { id: "1", title: "Học React", completed: false };
  const data = [
    {
      id: "1",
      title: "Học React",
      completed: false,
    },
    {
      id: "2",
      title: "Học TypeScript",
      completed: false,
    },
    {
      id: "3",
      title: "Làm bài tập",
      completed: true,
    },
  ];
  const [todos, setTodos] = useState(data); // array rong []
  // map trong jsnc
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
            {todos.map((item) => {
              return (
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    {item.id}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.completed ? "Hoan thanh" : "Chua hoan thanh"}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">Edit</td>
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
