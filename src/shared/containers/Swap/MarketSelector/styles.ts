import { makeStyles, Theme } from '@material-ui/core'
import { paletteColors } from 'theme/materialTheme'

export const useStyles = makeStyles((theme: Theme) => ({
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
    '& > svg > path': {
      stroke: theme.palette.text.primary,
    },
    zIndex: 3,
  },
  pairValue: {
    display: 'flex',
    alignItems: 'center',
    gap: 13,
  },
  marketSelectorArrow: {
    transform: 'rotate(180deg)',
  },
  marketSelectorWrapper: {
    position: 'relative',
  },
  marketSelectorCover: {
    width: '100vw',
    height: '100vh',
    left: 0,
    top: 0,
    position: 'fixed',
    zIndex: 2,
  },
  marketSelectorModal: {
    position: 'absolute',
    zIndex: 3,
    background: theme.palette.background.paper,
    width: 508,
    height: 354,
    left: 20,
    top: 61,
    borderRadius: 6,
  },
  greenColor: {
    color: theme.palette.success.main,
  },
  redColor: {
    color: theme.palette.error.main,
  },
  header: {
    padding: '0 12px',
    marginTop: 12,
  },
  filterTabs: {
    display: 'flex',
    gap: 10,
    margin: '12px 0',
  },
  tabItem: {
    display: 'flex',
    alignItems: 'center',
    height: 24,
    padding: '0 8px',
    borderRadius: 4,
    cursor: 'pointer',
  },
  favoriteTab: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  activeTab: {
    background: theme.palette.info.contrastText,
    color: theme.palette.text.primary,
  },
  tabText: {
    color: theme.palette.primary.contrastText,
  },
  firstColumn: {
    paddingLeft: '12px !important',
  },
  lastColumn: {
    paddingRight: '12px !important',
  },
  pairColumn: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  tableStarIcon: {
    width: 16,
    height: 16,
  },
  tableTokenIcon: {
    width: 22,
    height: 22,
    '& svg': {
      width: 22,
      height: 22,
    },
  },
  contrastGreenColor: {
    color: theme.palette.success.contrastText,
  },
  contrastRedColor: {
    color: theme.palette.error.contrastText,
  },
  tokenIcon: {
    width: 33,
    height: 33,
    '& svg': {
      width: 33,
      height: 33,
    },
  },
  input: {
    '& > div': {
      padding: 0,
      color: paletteColors.silver,
      '& svg > path': {
        stroke: theme.palette.primary.contrastText,
      },
    },
  },
  tableRow: {
    '&:hover': {
      background: theme.palette.info.contrastText,
      cursor: 'pointer',
    },
  },
  emptyStar: {
    '&:hover': {
      '& path': {
        stroke: theme.palette.text.primary,
      },
    },
  },
  marketPairData: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  statusLabel: {
    color: paletteColors.silver,
    lineHeight: '150%',
    fontWeight: 'normal',
  },
}))
