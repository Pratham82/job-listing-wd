import { IJobListingProps } from '../types/jobListing.types'
import JobCard from './JobCard'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import isEmpty from 'lodash.isempty'

export default function LayoutGrid(props: IJobListingProps) {
  const { jobs } = props.state
  console.log('🚀 ~ LayoutGrid ~ jobs:', jobs)

  if (isEmpty(jobs)) {
    return null
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={2}>
        {jobs?.map(job => {
          return (
            <Grid item key={job.jdUid}>
              <JobCard state={job} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
