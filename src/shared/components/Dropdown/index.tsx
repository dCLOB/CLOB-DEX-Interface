import { FormControl, InputLabel, MenuItem as MuiMenuItem, Select, SelectProps, Typography } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { Options } from './types'
import { useStyles } from './styles'
import clsx from 'clsx'

type SelectFieldProps = SelectProps &
  Options & {
    minWidth?: number
    controlClassName?: string
  }

export const Dropdown = ({
  label,
  name,
  options = [],
  onChange,
  value,
  controlClassName,
  ...rest
}: SelectFieldProps): JSX.Element => {
  const classes = useStyles()

  return (
    <FormControl className={clsx(classes.formControlRoot, controlClassName)}>
      <Typography variant="body2" className={classes.label}>
        {label}
      </Typography>
      <Select
        className={classes.select}
        id={name}
        displayEmpty
        MenuProps={{
          disablePortal: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          getContentAnchorEl: null,
        }}
        onChange={onChange}
        value={value}
        {...rest}
      >
        {options.map((option, index) => {
          return (
            <MuiMenuItem key={option.value} value={option.value} id={`${index}-${name}`}>
              {option.label}
            </MuiMenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
