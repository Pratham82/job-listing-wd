import { IJobCard } from './types/jobs.types'
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
} from './redux/slice/jobsSlice'
import { RootState } from './redux/store'
import { useAppDispatch } from './redux/hooks'

import { useCallback, useEffect, useMemo } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'
import Box from '@mui/material/Box'

function App() {
  const {
    jdList = [],
    loading: isLoading,
    minExp,
    currentPage,
  } = useSelector((state: RootState) => state.jobs)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllJobs(currentPage))
  }, [currentPage, dispatch])

  // TODO: Create a filter function
  const getFilteredJobs = useCallback(
    (jobList: IJobCard[]) => {
      if (!minExp) {
        return jdList
      }
      return jobList.filter(job => job.minExp >= minExp)
    },
    [jdList, minExp]
  )
  const filteredResults = useMemo(() => {
    return getFilteredJobs(jdList)
  }, [getFilteredJobs, jdList])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 2,
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
      </Box>
      <InfiniteScroll
        dataLength={filteredResults.length}
        next={() => {
          dispatch(setCurrentPage(currentPage + 1))
          // dispatch(filterMinExp(minExp))
        }}
        scrollableTarget="scrollableDiv"
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <JobListing
          state={{
            jobs: filteredResults,
          }}
        />
      </InfiniteScroll>
    </>
  )
}

export default App
