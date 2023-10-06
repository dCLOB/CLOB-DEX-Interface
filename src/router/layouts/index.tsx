import React from 'react'
import { Box } from '@material-ui/core'
import { useStyles } from './styles'
import { Header } from 'shared/containers/Header'

export const Layout = ({ children }: any): JSX.Element => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Header />
      <Box className={classes.content}>
        <Box className={classes.pageWrapper}>{children}</Box>
      </Box>
    </Box>
  )
}
