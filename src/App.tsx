import { JobFilter, JobListing } from './components'

import { useEffect, useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { fetchAllJobs } from './redux/slice/jobsSlice'
import { useAppDispatch } from './redux/hooks'
import CircularProgress from '@mui/material/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'

function App() {
  const { jdList = [], loading: isLoading } = useSelector(
    (state: RootState) => state.jobs
  )

  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState<string | number>('')

  const handleSelectedFilter = (
    e: React.SyntheticEvent<Element, Event>,
    value: {
      title: string
      value: string | number
    } | null
  ) => {
    setSelectedFilter(value.value)
  }

  console.log('🚀 ~ App ~ selectedFilter:', selectedFilter)

  useEffect(() => {
    dispatch(fetchAllJobs(currentPage))
  }, [currentPage, dispatch])

  if (isLoading) {
    return <CircularProgress />
  }

  /**
   * * Min exp.
   * * Company name
   * * Location
   * * Tech stack
   * * Role
   * * Min base pay
   */

  const minExpFilterData = {
    label: 'Min Experience',
    options: [
      { title: '1', value: 1 },
      { title: '2', value: 2 },
      { title: '3', value: 3 },
      { title: '4', value: 4 },
      { title: '5', value: 5 },
      { title: '6', value: 6 },
      { title: '7', value: 7 },
      { title: '8', value: 8 },
      { title: '9', value: 9 },
      { title: '10', value: 10 },
    ],
    width: 200,
  }

  return (
    <>
      {/*  */}
      <JobFilter
        state={minExpFilterData}
        actions={{
          handleSelectedFilter,
        }}
      />
      <InfiniteScroll
        dataLength={jdList?.length}
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
    </>
  )
}

export default App
