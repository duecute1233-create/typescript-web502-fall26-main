import { useState, useEffect } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { Form, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
interface Movie {
    id: string;
    title: string;
    director: string;
    year: number;
    genre: string;
    duration: number;
  }

function EditPage() {
    const{id} = useParams();
    const [movie, setMovie] = useState<Movie>({
    id:"",
    title: "",
    director: "",
    year: 0,
    genre: "",
    duration: 0,
  })
    useEffect(()=>{
        api.get(`/movies/${id}`).then((res)=> {setMovie(res.data); reset(res.data)})
    },[])
  const nav = useNavigate();
  
  const {  register, handleSubmit, formState: { errors }, reset } = useForm<Movie>();

  function EditPage(data: Movie){
    setMovie(data)
    api.put(`/movies/${data.id}`, data).then(()=> {alert("Cập nhật thành công"); nav("/")})
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Sửa thông tin</h1>

      <form className="space-y-6" onSubmit={handleSubmit(EditPage)}>
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title")}
          />
        </div>
         <div>
          <label htmlFor="director" className="block font-medium mb-1">
            Director
          </label>
          <input
            type="text"
            id="director"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("director")}
          />
        </div>
         <div>
          <label htmlFor="year" className="block font-medium mb-1">
            Year
          </label>
          <input
            type="number"
            id="year"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("year")}
          />
        </div>
         <div>
          <label htmlFor="genre" className="block font-medium mb-1">
            genre
          </label>
          <input
            type="text"
            id="genre"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("genre")}
          />
        </div>
         <div>
          <label htmlFor="duration" className="block font-medium mb-1">
            duration
          </label>
          <input
            type="number"
            id="duration"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("duration")}
          />
        </div>
        

        

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditPage;
