import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { fetchAllJobs } from './redux/slice/jobsSlice'
import { useAppDispatch } from './redux/hooks'
import { JobListing } from './components'
import CircularProgress from '@mui/material/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'

function App() {
  const {
    jobs,
    jdList,
    loading: isLoading,
  } = useSelector((state: RootState) => state.jobs)

  const [currentPage, setCurrentPage] = useState(0)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllJobs(currentPage))
  }, [currentPage, dispatch])

  console.log({ currentPage })

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <InfiniteScroll
      dataLength={jobs?.jdList?.length}
      next={() => setCurrentPage(currentPage + 1)}
      scrollableTarget="scrollableDiv"
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <JobListing
        state={{
          jobs: jdList,
        }}
      />
    </InfiniteScroll>
  )
}

export default App
