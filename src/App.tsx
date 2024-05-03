import { JobFilter, JobListing } from './components'
import {
  minExpFilterData,
  jobRoleFilterData,
  minBasePayFilterData,
  locationFilterData,
} from './data'
import {
  fetchAllJobs,
  filterMinExp,
  filterJobRole,
  filterMinBasePay,
  setCurrentPage,
  filterLocation,
  clearFilters,
} from './redux/slice/jobsSlice'
import { RootState } from './redux/store'
import { useAppDispatch } from './redux/hooks'

import { useEffect } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'
import Box from '@mui/material/Box'
import { getFilteredJobs } from './utils'
import { Button } from '@mui/material'

function App() {
  const {
    jdList = [],
    loading: isLoading,
    currentPage,
    // Filters
    minExp = 0,
    minJdSalary = 0,
    jobRole = '',
    location = '',
  } = useSelector((state: RootState) => state.jobs)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllJobs(currentPage))
  }, [currentPage, dispatch])

  const res = getFilteredJobs({
    allJobs: jdList,
    filters: {
      minExp,
      minJdSalary,
      jobRole,
      location,
    },
  })

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 2,
          alignItems: 'center',
        }}
      >
        <JobFilter
          state={minExpFilterData}
          actions={{
            dispatchFunction: filterMinExp,
            dispatch,
          }}
        />
        <JobFilter
          state={minBasePayFilterData}
          actions={{
            dispatchFunction: filterMinBasePay,
            dispatch,
          }}
        />
        <JobFilter
          state={jobRoleFilterData}
          actions={{
            dispatchFunction: filterJobRole,
            dispatch,
          }}
        />
        <JobFilter
          state={locationFilterData}
          actions={{
            dispatchFunction: filterLocation,
            dispatch,
          }}
        />
        <Button
          sx={{
            height: '90%',
          }}
          variant="contained"
          onClick={() => dispatch(clearFilters())}
        >
          Clear
        </Button>
      </Box>
      <InfiniteScroll
        dataLength={res.length}
        next={() => {
          dispatch(setCurrentPage(currentPage + 1))
        }}
        scrollableTarget="scrollableDiv"
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <JobListing
          state={{
            jobs: res,
          }}
        />
      </InfiniteScroll>
    </Box>
  )
}

export default App
