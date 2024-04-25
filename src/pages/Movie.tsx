import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddWatchBtn from '../ui/AddWatchBtn'
import styled from 'styled-components'
import RatingDetail from '../components/RatingDetail'
import { useSelector } from 'react-redux'
import { selectRating } from '../store/ratingSlice'

// TODO:
// details of the movie
// genres
// vote_average
// imdb_id
const MovieDetail = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  padding: 4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`
const MovieBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
const PosterAdd = styled.div`
  position: relative;
`
const PosterItem = styled.img`
  min-width: 300px;
  min-height: 400px;
`
const GenreList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  & li {
    list-style: none;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: white;
    & a {
      color: #f5c518;
    }
    &::after {
      content: ' ';
    }
  }
`
const MovieInfo = styled.div`
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  color: white;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;


`
const MovieHeader = styled.div`
display: flex;
justify-content: space-between;
`

const MovieBody = styled.div`
display: flex;
`
function Movie() {
  const [movie, setMovie] = useState(null)
  let { movieId } = useParams()
  const ratingArr = useSelector(selectRating)
  let rating = 0
  ratingArr.forEach((item) => {
    if(item.id === movieId){
        rating = item.rate
    }
}
)
  useEffect(() => {
    const fetchThisMovie = async () => {
      if (!movieId) return
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/' +
            movieId +
            '?language=en-US&api_key=dcd345ec48e9703490f93056cc03c057'
        )
        const data = response.data
        setMovie(data)
      } catch (error) {
        console.error('Failed to fetch movie:', error)
      }
    }
    fetchThisMovie()
  }, [movieId])

  return (
    <>
      {movie ? (
        <MovieDetail>
          <MovieBox>
            <h1>{movie.original_title}</h1>
            <MovieHeader>
            <GenreList>
              <li>
                <a href={`https://www.imdb.com/title/${movie.imdb_id}`}>IMDB</a>
              </li>
              {movie.genres.map((genre, index) => (
                <li key={index}>{genre.name}</li>
              ))}
            </GenreList>
            <RatingDetail movie={movie}/>
</MovieHeader>
<MovieBody>
            
            <PosterAdd>
              <AddWatchBtn movie={movie} size={40} />
              <PosterItem
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
              />
            </PosterAdd>
            <MovieInfo>
             
            <p>Release Date: {movie.release_date}</p>
            <p>Runtime: {movie.runtime} minutes</p>
              <h3>Overview</h3>
            <p>{movie.overview}</p>
            </MovieInfo>
            </MovieBody>
          </MovieBox>
        </MovieDetail>
      ) : (
        <p>Loading movies...</p>
      )}
    </>
  )
}

export default Movie
