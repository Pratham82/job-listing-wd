import { IJobFilterProps } from '../types/jobFilter.types'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import isEmpty from 'lodash.isempty'

export default function JobFilter(props: IJobFilterProps) {
  const { label = '', options = [], width = 300 } = props.state
  const { dispatchFunction, dispatch } = props.actions

  const customFilterHandler = (
    e: React.SyntheticEvent<Element, Event>,
    value: {
      title: string
      value: string | number
    } | null
  ) => {
    dispatch(dispatchFunction(value?.value))
  }

  if (isEmpty(props.state)) {
    return null
  }

  return (
    <Autocomplete
      id="highlights-demo"
      sx={{ width }}
      aria-placeholder="test"
      onChange={customFilterHandler}
      options={options}
      isOptionEqualToValue={(op, val) => op.value === val.value}
      getOptionLabel={option => option.title}
      renderInput={params => (
        <TextField {...params} label={label} margin="normal" />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.title, inputValue, { insideWords: true })
        const parts = parse(option.title, matches)

        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        )
      }}
    />
  )
}
