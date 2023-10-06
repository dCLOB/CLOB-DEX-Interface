import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  reportsTab: {
    width: '100%',
  },
  title: {
    marginTop: 32,
    marginBottom: 20,
  },
  filtersRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  filters: {
    display: 'flex',
    gap: 20,
    width: '80%',
    alignItems: 'flex-end',
  },
  cancelAllButton: {
    width: '100%',
    maxWidth: 192,
  },
  resetButton: {
    width: '100%',
    maxWidth: 100,
  },
  dropdownControl: {
    height: 48,
    background: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: 174,
    padding: '0 13px',
    marginTop: 20,
    '& > div > svg > path': {
      stroke: theme.palette.text.primary,
    },
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
      width: '15%',
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
    alignItems: 'center',
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
  pairColumn: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
  },
  currencyLabel: {
    color: theme.palette.text.disabled,
    marginTop: 2,
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  greenColor: {
    color: theme.palette.success.main,
  },
  redColor: {
    color: theme.palette.error.main,
  },
}))
