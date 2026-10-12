import { useState, useEffect } from "react";
import api from "../service/api"
import { Link } from "react-router-dom";
import { get } from "react-hook-form";
interface Movie {
    id: string;
    title: string;
    director: string;
    year: number;
    genre: string;
    duration: number;
  }
function ListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);


   function getMovies(){
    api.get("/movies").then((res) => setMovies(res.data))

   }
   useEffect(()=> getMovies(), [])
   function handleDelete(id: string){
    if(window.confirm("Bạn có thực sự muốn xóa mục này?")){
      api.delete(`/movies/${id}`).then(() => getMovies());
    }
   }
   const [key, setKey] = useState("")
   function handleSearch(){
    api.get(`/movies?title_like=${key}`).then((res) => setMovies(res.data))
   }
   const filterYear =(e: React.ChangeEvent)=>{
    const year = (e.target as HTMLSelectElement).value
    if(year === ""){
      getMovies()
    } else if(year ==="desc"){
      api.get(`/movies?title_like=${key}&_sort=year&_order=desc`).then((res)=> setMovies(res.data))
    }else if (year ==="asc"){
      api.get(`/movies?title_like=${key}&_sort=year&_order=asc`).then((res) => setMovies(res.data))
   }
  }
const filterDuration =(e: React.ChangeEvent)=>{
    const duration = (e.target as HTMLSelectElement).value
    if(duration === ""){
      getMovies()
    } else if(duration ==="desc"){
      api.get(`/movies?title_like=${key}&_sort=duration&_order=desc`).then((res)=> setMovies(res.data))
    }else if (duration ==="asc"){
      api.get(`/movies?title_like=${key}&_sort=duration&_order=asc`).then((res) => setMovies(res.data))
   }
  }

  return (
    
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>
      <div>Sắp xếp theo năm
        <select name="" id="year" onChange={filterYear}>
          <option value="">Mặc Định</option>
          <option value="desc">Giảm dần</option>
          <option value="asc">Tăng dần</option>
        </select>
      </div>
      <div>Sắp xếp theo thời lượng
        <select name="" id="duration" onChange={filterDuration}>
          <option value="">Mặc Định</option>
          <option value="desc">Giảm dần</option>
          <option value="asc">Tăng dần</option>
        </select>
      </div>

      <div ><Link to={"/add"}>Thêm mới</Link>

      </div>
      <div>
        <input type="text" value={key}
        placeholder="Nhập tên mà bạn cần tìm"
        onChange={(e)=> setKey(e.target.value)} />
        <button onClick={()=>handleSearch()}> Tìm kiếm</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                title
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                director
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                year
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                genre
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                duration
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Actions
              </th>
            </tr>
            
          </thead>
            
          <tbody>
            {movies.map((movie)=>(
              <tr className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">{movie.id}</td>
              <td className="px-4 py-2 border border-gray-300">{movie.title}</td>
              <td className="px-4 py-2 border border-gray-300">{movie.director}</td>
              <td className="px-4 py-2 border border-gray-300">{movie.year}</td>
              <td className="px-4 py-2 border border-gray-300">{movie.genre}</td>
              <td className="px-4 py-2 border border-gray-300">{movie.duration}</td>
              <td className="px-4 py-2 border border-gray-300"><button onClick={()=> handleDelete(movie.id)}>Xóa</button> <br />  
              <button> <Link to={`/edit/${movie.id}`}>Sửa</Link></button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
