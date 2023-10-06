import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
  blockHeader: {
    display: 'flex',
    paddingTop: 20,
    marginBottom: 12,
    padding: '0 20px',
  },
  tradesTable: {},
  tableHeader: {},
  headerCell: {
    padding: 0,
    borderBottom: 'none',
    background: theme.palette.background.default,
  },
  headerLabel: {
    display: 'flex',
    gap: 4,
  },
  currencyLabel: {
    color: theme.palette.secondary.contrastText,
  },
  amount: {
    textAlign: 'right',
    justifyContent: 'flex-end',
  },
  time: {
    textAlign: 'right',
    justifyContent: 'flex-end',
  },
  tableCell: {
    padding: 0,
    borderBottom: 0,
  },
  cellValue: {
    fontWeight: 400,
  },
  tableRow: {
    height: 22,
  },
  tableWrapper: {
    height: 'calc(100% - 80px)',
    overflowY: 'scroll',
    padding: '0 20px',

    '&::-webkit-scrollbar': {
      width: 4,
      '-webkit-apperarance': 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.background.paper,
      borderRadius: 6,
    },
  },
  butTrade: {
    color: theme.palette.success.main,
  },
  sellTrade: {
    color: theme.palette.error.main,
  },
}))
