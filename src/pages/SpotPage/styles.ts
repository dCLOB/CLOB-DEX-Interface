import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    width: '100%',
    minHeight: 'calc(100vh - 80px)',
  },
  block: {
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  rightConrainter: {
    width: 'calc(100% - 280px)',
  },
  leftContainer: {
    width: 280,
  },
  swapHeader: {
    display: 'flex',
    height: 64,
  },
  marketData: {
    display: 'flex',
    height: 78,
  },
  tradingContainer: {
    display: 'flex',
    height: 668,
  },
  chart: {
    width: 'calc(100% - 280px)',
  },
  tradeContainer: {
    width: 280,
    display: 'flex',
    flexDirection: 'column',
  },
  orderbook: {
    height: 446,
  },
  tradesHistory: {
    height: 'calc(100% - 450px)',
  },
  accordion: {
    minHeight: 'calc(100% - 814px)',
    borderBottom: 'none',
  },
  orderform: {
    minHeight: 372,
  },
  assets: {
    height: 245,
  },
  marginData: {
    height: 206,
  },
  desc: {
    minHeight: 'calc(100% - 835px)',
    borderBottom: 0,
  },
}))
