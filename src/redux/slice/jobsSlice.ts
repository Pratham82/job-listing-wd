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
  currentPage: 0,
  // Filters
  minExp: 0,
  minJdSalary: 0,
  jobRole: '',
  location: '',
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
    filterMinExp: (state, action) => {
      state.minExp = action.payload
    },
    filterMinBasePay: (state, action) => {
      state.minJdSalary = action.payload
    },
    filterJobRole: (state, action) => {
      state.jobRole = action.payload
    },
    filterLocation: (state, action) => {
      state.location = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    clearFilters: state => {
      state.minExp = initialState.minExp
      state.minJdSalary = initialState.minJdSalary
      state.location = initialState.location
      state.jobRole = initialState.jobRole
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

export const {
  filterMinExp,
  filterJobRole,
  filterMinBasePay,
  setCurrentPage,
  filterLocation,
  clearFilters,
} = jobSlice.actions

export default jobSlice.reducer
