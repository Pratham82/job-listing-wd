import { IJobCard } from '../types/jobs.types'
export const getFilteredJobs = ({
  allJobs,
  filters,
}: {
  allJobs: IJobCard[]
  filters: {
    minExp: number
    minJdSalary: number
    jobRole: string
    location: string
  }
}) => {
  const { minExp = 0, minJdSalary = 0, jobRole = '', location = '' } = filters
  let filteredJobs = allJobs
  if (jobRole) {
    filteredJobs = filteredJobs.filter(jobs => jobs.jobRole.includes(jobRole))
  }

  if (location) {
    filteredJobs = filteredJobs.filter(jobs => jobs.location.includes(location))
  }

  filteredJobs = filteredJobs
    .filter(jobs => jobs.minExp >= minExp)
    .filter(jobs => jobs.minJdSalary >= minJdSalary)

  return filteredJobs
}
