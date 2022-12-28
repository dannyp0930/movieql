import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IMG_URL } from "../util/API";

const GET_MOVIE = gql`
  query ($movieId: Int!) {
    movie(id: $movieId) {
      id
      title
      poster_path
      vote_average
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Image = styled.div<{ bg: string }>`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => IMG_URL + props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

export default function Movie() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: parseInt(id || ""),
    },
  });
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data?.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.vote_average}</Subtitle>
      </Column>
      <Image bg={data?.movie?.poster_path} />
    </Container>
  );
}
