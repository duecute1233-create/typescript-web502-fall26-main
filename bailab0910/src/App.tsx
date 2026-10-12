import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
import EditPage from "./pages/EditPage";
import AddPage from "./pages/AddPage";
function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="#" className="text-xl font-semibold">
            <strong>WEB502 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="#" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="#" className="hover:text-gray-200">
              Danh sách
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/add" element={<AddPage/>} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
