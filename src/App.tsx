import { JobFilter, JobListing } from './components'

import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import {
  fetchAllJobs,
  filterMinExp,
  setCurrentPage,
} from './redux/slice/jobsSlice'
import { useAppDispatch } from './redux/hooks'
import CircularProgress from '@mui/material/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IJobCard } from './types/jobs.types'

function App() {
  const {
    jdList = [],
    loading: isLoading,
    minExp,
    currentPage,
  } = useSelector((state: RootState) => state.jobs)

  const dispatch = useAppDispatch()

  const handleSelectedFilter = (
    e: React.SyntheticEvent<Element, Event>,
    value: {
      title: string
      value: string | number
    } | null
  ) => {
    dispatch(filterMinExp(value?.value))
  }

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
      <JobFilter
        state={minExpFilterData}
        actions={{
          handleSelectedFilter,
        }}
      />
      <InfiniteScroll
        dataLength={filteredResults.length}
        next={() => {
          dispatch(setCurrentPage(currentPage + 1))
          dispatch(filterMinExp(minExp))
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
