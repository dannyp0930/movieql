import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { Movie } from "../store/types/interface";

export default function Movies() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const client = useApolloClient();
  useEffect(() => {
    client
      .query({
        query: gql`
          {
            popularMovies {
              id
              title
            }
          }
        `,
      })
      .then((res) => setPopularMovies(res.data.popularMovies));
  }, [client]);
  return (
    <div>
      {popularMovies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </div>
  );
}
