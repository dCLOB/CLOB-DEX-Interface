import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  reportsPage: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
  },
  mainContent: {
    width: 'calc(100% - 320px)',
    padding: '0 20px',
  },
}))
