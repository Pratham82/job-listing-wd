import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { JOBS_URL } from '../../constants'

import { IJobsInitialStateType, IJobsResult } from '../../types/jobs.types'

const initialState: IJobsInitialStateType = {
  loading: false,
  jobs: {
    jdList: [],
    totalCount: 0,
  },
  error: '',
}

export const fetchAllJobs = createAsyncThunk<
  { data: IJobsResult },
  void,
  { rejectValue: string }
>('fetch-jobs', () => {
  return axios.post(
    JOBS_URL,
    {
      limit: 10,
      offset: 0,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
})

export const jobSlice = createSlice({
  name: 'Jobs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllJobs.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAllJobs.fulfilled, (state, action) => {
      state.loading = false
      state.jobs = action.payload.data
      state.error = ''
    })
    builder.addCase(fetchAllJobs.rejected, (state, action) => {
      state.loading = false
      state.jobs = {
        jdList: [],
        totalCount: 0,
      }
      state.error = action.error.message
    })
  },
})

export default jobSlice.reducer
