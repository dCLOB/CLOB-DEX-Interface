import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  subheader: {
    display: 'flex',
  },
  subheaderItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '0 25px',
    borderRight: `1px solid ${theme.palette.secondary.main}`,
    '&:first-child': {
      gap: 13,
    },
  },
  negative: {
    color: theme.palette.error.main,
  },
  positive: {
    color: theme.palette.success.main,
  },
}))
