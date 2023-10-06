import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100vw',
    background: theme.palette.background.default,
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  loginLayout: {
    height: '100vh',
    maxWidth: '100vw',
    background: theme.palette.background.default,
  },
  content: {
    display: 'flex',
    minHeight: 'calc(100vh - 80px)',
  },
  pageWrapper: {
    width: '100%',
    height: '100%',
    minHeight: 'calc(100vh - 80px)',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
}))
