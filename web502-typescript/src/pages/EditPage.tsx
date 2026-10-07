import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface TodoFormData {
  title: string;
  completed: boolean;
}

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>();

  // Lấy dữ liệu cũ
  useEffect(() => {
    axios
      .get(`http://localhost:3000/todos/${id}`)
      .then((res) => {
        reset({
          title: res.data.title,
          completed: res.data.completed,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, reset]);

  // Cập nhật
  const onSubmit = async (data: TodoFormData) => {
    try {
      await axios.put(
        `http://localhost:3000/todos/${id}`,
        data
      );

      alert("Cập nhật thành công!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Chỉnh sửa Todo
      </h1>

      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">
            Title
          </label>

          <input
            type="text"
            {...register("title", {
              required: "Title không được để trống",
            })}
            className="w-full border rounded-lg px-3 py-2"
          />

          {errors.title && (
            <span className="text-red-500 text-sm">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Completed */}
        <div>
          <label className="block font-medium mb-1">
            Completed
          </label>

          <select
            {...register("completed", {
              setValueAs: (value) => value === "true",
            })}
            className="w-full border rounded-lg px-3 py-2 bg-white"
          >
            <option value="false">
              Chưa hoàn thành
            </option>

            <option value="true">
              Hoàn thành
            </option>
          </select>
        </div>

        {/* Button */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Cập nhật
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPage;