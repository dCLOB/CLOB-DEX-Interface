import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    padding: '0 20px',
  },
  orderbookHeader: {
    display: 'flex',
    paddingTop: 22,
    marginBottom: 12,
  },
  orderbookSubheader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
    alignItems: 'center',
  },
  orderbookView: {
    display: 'flex',
    height: 'fit-content',
  },
  iconItem: {
    marginRight: 16,
    height: 'fit-content',
    opacity: 0.3,
    cursor: 'pointer',
    '& #changeFill': {
      fill: theme.palette.text.primary,
    },
  },
  iconActive: {
    opacity: 1,
  },
  accurrancyDropdown: {
    backgroundColor: 'transparent',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 18,
    marginBottom: 12,
  },
  tableHeaderItem: {
    display: 'flex',
    alignItems: 'center',
    width: '33%',
    justifyContent: 'flex-end',
    gap: 3,
    '& > p': {
      height: '100%',
      fontSize: 12,
      display: 'flex',
      alignItems: 'center',
    },
    '& > span': {
      fontSize: 12,
      lineHeight: 'normal',
    },
    '&:first-child': {
      justifyContent: 'flex-start',
    },
  },
  marketPrice: {
    height: 50,
    padding: theme.spacing(0, 5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Roboto, sans-serif',
  },
  totalWithArrow: {
    fontFamily: 'Roboto, sans-serif',
  },
  price: {
    marginLeft: 8,
    color: theme.palette.success.main,
  },
  orderbookItemWrapper: {
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 0,
      '-webkit-apperarance': 'none',
    },
    '&:last-child': {
      justifyContent: 'flex-start',
    },
  },
  invisible: {
    display: 'none',
  },
  fullHeight: {
    height: 'calc(72% - 40px)',
  },
  headerLabel: {
    wordBreak: 'normal',
  },
  negative: {
    color: theme.palette.error.main,
  },
  negativeArrow: {
    '& svg': {
      transform: 'scale(1, -1)',
      '& path': {
        fill: theme.palette.error.main,
      },
    },
  },
  accurancyContainer: {
    display: 'flex',
    marginBottom: 12,
    gap: 8,
  },
  accurancyButton: {
    cursor: 'pointer',
    height: 24,
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    width: 'fit-content',
    borderRadius: 4,
    '&:hover': {
      background: theme.palette.background.paper,
    },
  },
  activeAccurancyButton: {
    background: theme.palette.background.paper,
  },
}))
