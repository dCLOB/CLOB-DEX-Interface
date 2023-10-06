import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  marketsHeaderContainer: {
    display: 'flex',
    gap: 24,
    alignItems: 'center',
  },
  dataLabel: {
    textDecoration: 'underline',
    textTransform: 'capitalize',
  },
  severalValues: {
    display: 'flex',
    gap: 4,
  },
  time: {
    textDecoration: 'underline',
  },
  indexValue: {
    color: theme.palette.primary.main,
  },
  greenColor: {
    color: theme.palette.success.main,
  },
  redColor: {
    color: theme.palette.error.main,
  },
  dropdownControl: {
    height: 57,
    background: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    borderRadius: 6,
    minWidth: 194,
    padding: '0 13px',
    cursor: 'pointer',
  },
  pairValue: {
    display: 'flex',
    alignItems: 'center',
    gap: 13,
  },
}))
