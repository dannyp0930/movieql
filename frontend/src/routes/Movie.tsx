import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query ($movieId: Int!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`;

export default function Movie() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: parseInt(id || ""),
    },
  });
  console.log(data);
  if (loading) {
    return <h1>Fetching movie...</h1>
  }
  return <div>{data.movie.title}</div>;
}
