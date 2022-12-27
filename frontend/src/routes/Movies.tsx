import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Movie } from "../store/types/interface";

const ALl_MOVIES = gql`
  {
    popularMovies {
      title
      id
    }
    topRatedMovies {
      id
      title
    }
    upcomingMovies {
      id
      title
    }
  }
`;

export default function Movies() {
  const { data, loading, error } = useQuery(ALl_MOVIES);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Could not fetch :(</h1>;
  }
  return (
    <ul>
      <h1>Popluar Movies</h1>
      {data.popularMovies.map((movie: Movie) => (
        <li key={movie.id}>
          <Link to={`movie/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
      <h1>Top Rated Movies</h1>
      {data.topRatedMovies.map((movie: Movie) => (
        <li key={movie.id}>
          <Link to={`movie/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
      <h1>Upcoming Movies</h1>
      {data.upcomingMovies.map((movie: Movie) => (
        <li key={movie.id}>
          <Link to={`movie/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
}
