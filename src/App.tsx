import { useEffect } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { fetchAllJobs } from './redux/slice/jobsSlice'
import { useAppDispatch } from './redux/hooks'
import { JobListing } from './components'
import CircularProgress from '@mui/material/CircularProgress'

function App() {
  const {
    jobs,
    loading: isLoading,
    error,
  } = useSelector((state: RootState) => state.jobs)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllJobs())
  }, [dispatch])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <JobListing
      state={{
        jobs: jobs,
      }}
    />
  )
}

export default App
