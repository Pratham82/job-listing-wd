import {
  ActionCreatorWithPayload,
  Dispatch,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit'
import { IJobsInitialStateType } from './jobs.types'

export interface IJobFilterProps {
  state: {
    label: string
    options: { title: string; value: string | number }[]
    width: number
  }
  actions: {
    dispatchFunction: ActionCreatorWithPayload<
      string | number | undefined,
      | 'Jobs/filterMinExp'
      | 'Jobs/filterJobRole'
      | 'Jobs/filterMinBasePay'
      | 'Jobs/filterLocation'
    >
    dispatch: ThunkDispatch<
      {
        jobs: IJobsInitialStateType
      },
      undefined,
      UnknownAction
    > &
      Dispatch<UnknownAction>
  }
}

export type handleSelectedFilterParams = {
  event: React.SyntheticEvent<Element, Event>
  alue: {
    title: string
    value: string | number
  } | null
}
