import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    padding: '0 20px',
  },
  blockHeader: {
    display: 'flex',
    paddingTop: 20,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  rowData: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 21,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    textDecoration: 'underline',
  },
  data: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },
  currency: {
    fontSize: 14,
    marginTop: 2,
  },
  chartData: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: -30,
    marginBottom: 16,
    '& path': {
      stroke: 'none',
    },
  },
  greenColor: {
    color: theme.palette.success.main,
  },
}))
