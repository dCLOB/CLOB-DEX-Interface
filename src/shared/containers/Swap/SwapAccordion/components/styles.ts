import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  pairColumn: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
  },
  changeMark: {
    height: 24,
    width: 4,
  },
  changeMarkGreen: {
    background: theme.palette.success.main,
  },
  changeMarkRed: {
    background: theme.palette.error.main,
  },
  currencyLabel: {
    color: theme.palette.text.disabled,
  },
  columnData: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  positiveChange: {
    color: theme.palette.success.main,
  },
  negativeChange: {
    color: theme.palette.error.main,
  },
  postionActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  link: {
    textDecoration: 'none',
  },
  amount: {
    width: 64,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    marginLeft: 39,
    marginRight: 14,
    borderRadius: 4,
    background: theme.palette.background.paper,
  },
  orderTypeLink: {
    textDecoration: 'underline',
  },
  price: {
    width: '13%',
  },
  avgPrice: {
    width: '20%',
  },
  date: {
    paddingLeft: '20px !important',
  },
  expandIcon: {
    cursor: 'pointer',
  },
  mainRow: {
    height: 37,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  openOrdersRow: {
    height: 'auto !important',
    minHeight: 37,
    '&:first-child': {
      minHeight: 49,
    },
    '& > td:first-child': {
      width: '20%',
    },
  },
  expandedPairColumn: {
    paddingLeft: 30,
  },
  expandedRow: {
    height: 24,
    marginBottom: 12,
    // '&:first-child': {
    //   marginTop: 12,
    // },
  },
  dataRow: {
    display: 'flex',
    gap: 4,
  },
  checkbox: {
    padding: 0,
    width: 16,
    height: 16,
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  actions: {
    gap: 20,
  },
}))
