import { configureStore } from '@reduxjs/toolkit'
import jobReducer from './slice/jobsSlice'

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
