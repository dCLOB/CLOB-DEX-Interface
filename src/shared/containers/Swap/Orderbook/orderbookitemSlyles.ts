import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  orderItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 12,
    position: 'relative',
    height: 24,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
  },
  orderAmount: {
    fontSize: 12,
    width: '33%',
    textAlign: 'right',
    fontFamily: 'Roboto, sans-serif',
    height: 24,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontWeight: 400,
  },
  orderTotal: {
    fontSize: 12,
    width: '33%',
    textAlign: 'right',
    fontFamily: 'Roboto, sans-serif',
    whiteSpace: 'nowrap',
    zIndex: 1,
    fontWeight: 400,
  },
  orderbookItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 0,
      '-webkit-apperarance': 'none',
    },
  },
  orderPrice: {
    fontSize: 12,
    width: '33%',
    zIndex: 1,
    fontWeight: 400,
  },
}))
