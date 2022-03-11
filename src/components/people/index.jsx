import { useMemo, useState } from 'react'
import { useQuery, useQueries, useInfiniteQuery } from 'react-query'
import { Link } from 'react-router-dom'
import Person from '../person'
import InfiniteScroll from 'react-infinite-scroller'
import ClipLoader from 'react-spinners/ClipLoader'
import './styles.css'

const People = () => {
  const [page, setPage] = useState(1)
  const [color, setColor] = useState('#DADADA')
  const [loading, setLoading] = useState(true)

  const fetchPeople = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `https://swapi.dev/api/people/?page=${pageParam}`
    )

    return response.json()
  }
  const {
    data: personData,
    status: personStatus,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery('people', fetchPeople, {
    getNextPageParam: (lastPage) =>
      lastPage?.next
        ? lastPage?.next.substr(lastPage?.next.length - 1)
        : undefined,
  })

  return (
    <div>
      <h1 className="appTitle">People of Star Wars</h1>
      {personStatus === 'loading' && (
        <div className="fetchLoading">
          <ClipLoader color={color} loading={loading} size={50} />
          Loading data...
        </div>
      )}
      {personStatus === 'error' && (
        <div className="fetchError">Error fetching data</div>
      )}
      {personStatus === 'success' && (
        <InfiniteScroll
          hasMore={hasNextPage}
          loadMore={fetchNextPage}
          loader={
            <div className="fetchLoading" key={page}>
              <ClipLoader color={color} loading={loading} size={50} />
              Loading data...
            </div>
          }
        >
          {personData?.pages?.map((page) =>
            page?.results?.map((person, index) => (
              <Link
                key={index}
                to={`characterdetails/${index + 1}`}
                className="listLink"
              >
                <Person key={person?.name} person={person} />
              </Link>
            ))
          )}
        </InfiniteScroll>
      )}
    </div>
  )
}

export default People
