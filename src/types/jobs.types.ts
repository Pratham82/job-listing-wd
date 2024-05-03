export interface IJobCard {
  jdUid: string
  jdLink: string
  jobDetailsFromCompany: string
  maxJdSalary: number
  minJdSalary: number
  salaryCurrencyCode: string
  location: string
  minExp: number
  maxExp: number
  jobRole: string
  companyName: string
}

export interface IJobsResult {
  jdList?: IJobCard[] | null
  totalCount: number
}

export interface IJobsInitialStateType {
  loading: boolean
  jobs: IJobsResult
  error: string | undefined
  jdList: IJobCard[] | undefined
  minExp: number
  currentPage: number
  minJdSalary: 0
  jobRole: string
  location: string
}
