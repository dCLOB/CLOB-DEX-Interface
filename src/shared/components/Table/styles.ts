import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  tableWrapper: {
    width: '100%',
  },
  tableHeader: {
    height: 46,
  },
  tableHeaderCell: {
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    borderTop: `1px solid ${theme.palette.secondary.main}`,
    paddingTop: 0,
    paddingBottom: 0,
    '&:first-child': {
      padding: 0,
    },
    '&:last-child': {
      padding: 0,
    },
  },
  headerCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontWeight: 700,
    color: theme.palette.text.disabled,
    background: 'transparent',
  },
  tableRow: {
    height: 37,
    '&:first-child': {
      height: 49,
      '& > td': {
        paddingTop: 12,
      },
    },
  },
  tableRowCell: {
    borderBottom: 'none',
    paddingTop: 0,
    paddingBottom: 0,
    textTransform: 'capitalize',
    '&:first-child': {
      padding: 0,
    },
    '&:last-child': {
      padding: 0,
    },
  },
  rightAlign: {
    justifyContent: 'flex-end',
  },
}))
