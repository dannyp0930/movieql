import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Movie } from "../store/types/interface";

const IMG_URL = "https://image.tmdb.org/t/p/original";

const ALl_MOVIES = gql`
  {
    popularMovies {
      title
      id
      poster_path
    }
    topRatedMovies {
      id
      title
      poster_path
    }
    upcomingMovies {
      id
      title
      poster_path
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const GridTitle = styled.h2`
  font-size: 30px;
  font-weight: 300;
  margin: 30px;
`

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
`;

const PosterContainer = styled.div`
  height: 400px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;

const PosterBg = styled.div<{ background: string }>`
  background-image: url(${(props) => props.background});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

export default function Movies() {
  const { data, loading } = useQuery(ALl_MOVIES);
  return (
    <Container>
      <Header>
        <Title>Apollo Movies</Title>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <GridTitle>Popular Movies</GridTitle>
      <MoviesGrid>
        {data?.popularMovies?.map((movie: Movie) => (
          <PosterContainer key={movie.id}>
            <Link to={`movie/${movie.id}`}>
              <PosterBg background={IMG_URL + movie.poster_path} />
            </Link>
          </PosterContainer>
        ))}
      </MoviesGrid>
      <GridTitle>Top Rated Movies</GridTitle>
      <MoviesGrid>
        {data?.topRatedMovies?.map((movie: Movie) => (
          <PosterContainer key={movie.id}>
            <Link to={`movie/${movie.id}`}>
              <PosterBg background={IMG_URL + movie.poster_path} />
            </Link>
          </PosterContainer>
        ))}
      </MoviesGrid>
      <GridTitle>Upcoming Movies</GridTitle>
      <MoviesGrid>
        {data?.upcomingMovies?.map((movie: Movie) => (
          <PosterContainer key={movie.id}>
            <Link to={`movie/${movie.id}`}>
              <PosterBg background={IMG_URL + movie.poster_path} />
            </Link>
          </PosterContainer>
        ))}
      </MoviesGrid>
    </Container>
  );
}
