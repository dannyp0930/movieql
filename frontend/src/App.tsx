import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movie from "./routes/Movie";
import Movies from "./routes/Movies";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Movies/>}/>
          <Route path="movie/:id" element={<Movie/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
