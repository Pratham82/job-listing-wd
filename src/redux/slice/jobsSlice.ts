import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { JOBS_URL } from '../../constants'

import { IJobsInitialStateType, IJobsResult } from '../../types/jobs.types'
import uniqBy from 'lodash.uniqby'

const initialState: IJobsInitialStateType = {
  loading: false,
  jobs: {
    jdList: [],
    totalCount: 0,
  },
  error: '',
  jdList: [],
  minExp: 0,
  currentPage: 0,
}

export const fetchAllJobs = createAsyncThunk<
  { data: IJobsResult },
  void,
  { rejectValue: string }
>('fetch-jobs', offset => {
  return axios.post(
    JOBS_URL,
    {
      limit: 10,
      offset,
    },
    {
      headers: {
        'Content-type': 'application/json',
      },
    }
  )
})

export const jobSlice = createSlice({
  name: 'Jobs',
  initialState,

  reducers: {
    // TODO : Create a reducer for filtering jdList
    // TODO : Create a state for current page
    // TODO : Min Exp
    filterMinExp: (state, action) => {
      state.minExp = action.payload
    },
    // TODO : Min base pay
    // TODO : current page
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAllJobs.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAllJobs.fulfilled, (state, action) => {
      state.loading = false
      state.jobs = action.payload.data
      state.error = ''
      state.jdList = uniqBy(
        state.jdList?.concat(action?.payload?.data?.jdList),
        'jdUid'
      )
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

export const { filterMinExp, setCurrentPage } = jobSlice.actions

export default jobSlice.reducer
