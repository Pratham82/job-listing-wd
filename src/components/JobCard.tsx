import { IJobCardProps } from '../types/./jobCard.types'

import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Modal from '@mui/material/Modal'

export default function JobCard(props: IJobCardProps) {
  const {
    companyName = '',
    jobRole,
    location,
    jobDetailsFromCompany,
    minExp,
    minJdSalary,
    maxJdSalary,
  } = props.state

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const minSal = minJdSalary !== null ? `${minJdSalary} - ` : 'Upto '
  const salaryRange = `Estimated Salary: ${minSal} ${maxJdSalary} LPA`

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    color: 'text.primary',
    p: 4,
    borderRadius: 5,
  }

  return (
    <Card
      sx={{
        boxShadow: 3,
        p: 2,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxWidth: 360,
        maxHeight: 500,
        position: 'relative',
      }}
    >
      {companyName && (
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          {companyName}
        </Typography>
      )}
      <Typography
        sx={{
          fontSize: 16,
          textTransform: 'capitalize',
        }}
      >
        {jobRole}
      </Typography>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 'bold',
        }}
      >
        {location}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 'bold',
        }}
      >
        {salaryRange}
      </Typography>
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 'medium',
          textAlign: 'left',
        }}
      >
        About us
        {jobDetailsFromCompany}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundImage:
            'linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1))',
          backdropFilter: 'blur(4px)', //
          backgroundColor: 'transparent',
          p: 1,
          left: 2,
        }}
      >
        <Button
          onClick={handleOpen}
          sx={{
            width: '95%',
          }}
        >
          <Link
            // href={jdLink}
            sx={{
              cursor: 'pointer',
            }}
          >
            View Job
          </Link>
        </Button>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'left',
            color: 'text.secondary',
          }}
        >
          Minimum Experience
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 'medium',
            textAlign: 'left',
          }}
        >
          {minExp} years
        </Typography>
        <Button
          variant="contained"
          sx={{
            width: '95%',
            mt: 2,
            backgroundColor: '#54EFC3',
            color: 'black',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: '#44be9c',
              borderColor: '#45a58a',
              boxShadow: 'none',
            },
          }}
        >
          ⚡ Easy Apply
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            Job Description
          </Typography>
          <Box>
            <Typography
              id="modal-modal-title"
              sx={{
                fontSize: 14,
                fontWeight: 'bold',
                mt: 1,
              }}
            >
              About Company:
            </Typography>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {jobDetailsFromCompany}
          </Typography>
        </Box>
      </Modal>
    </Card>
  )
}
