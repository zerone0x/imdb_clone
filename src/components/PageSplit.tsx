import { IconContext } from 'react-icons'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import { setCurrentPage } from '../store/watchListSlice'
import { useDispatch } from 'react-redux'

const PaginationContainer = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  gap: 10px;
  cursor: pointer;

  .page-item {
    padding: 10px 13px;
    border-radius: 50%;
    &:hover {
      background: grey;
      color: black;
    }
  }

  .active {
    color: white;
    background: black;
  }
`

interface WatchListItemProp {
  id: number
  genres: { name: string }[]
  poster_path: string
  runtime: number
  overview: string
  vote_average: number
  backdrop_path: string
  media_type: string
  original_title?: string
  original_name?: string
  release_date?: string
  first_air_date?: string
}

interface PageSplitProps {
  movieData: [] | WatchListItemProp[]
  moviesPerPage: number
}

function PageSplit({ movieData, moviesPerPage }: PageSplitProps) {
  const dispatch = useDispatch()
  const handlePageClick = (data: { selected: number }) => {
    dispatch(setCurrentPage(data.selected + 1))
  }
  return (
    <PaginationContainer
      breakLabel="..."
      pageCount={Math.ceil(movieData.length / moviesPerPage)}
      onPageChange={handlePageClick}
      pageClassName={'page-item'}
      activeClassName={'active'}
      previousLabel={
        <IconContext.Provider value={{ color: 'black', size: '36px' }}>
          <AiFillLeftCircle />
        </IconContext.Provider>
      }
      nextLabel={
        <IconContext.Provider value={{ color: 'black', size: '36px' }}>
          <AiFillRightCircle />
        </IconContext.Provider>
      }
    />
  )
}

export default PageSplit
