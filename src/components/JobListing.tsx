import { IJobListingProps } from '../types/jobListing.types'
import JobCard from './JobCard'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import isEmpty from 'lodash.isempty'

export default function LayoutGrid(props: IJobListingProps) {
  const { jobs } = props.state
  const { totalCount, jdList } = jobs

  if (isEmpty(jdList)) {
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
      {totalCount && (
        <Typography
          sx={{
            color: 'text.secondary',
            alignSelf: 'flex-start',
            mb: 2,
          }}
        >
          Result: {totalCount}
        </Typography>
      )}
      <Grid container spacing={2}>
        {jdList?.map((job, i) => {
          return (
            <Grid item>
              <JobCard state={job} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
