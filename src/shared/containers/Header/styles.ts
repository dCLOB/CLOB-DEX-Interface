import { makeStyles, Theme } from '@material-ui/core'
import moonIcon from 'icons/moon.svg'
import sunIcon from 'icons/sun.svg'

export const useStyles = makeStyles((theme: Theme) => ({
  header: {
    height: 80,
    display: 'flex',
    width: 'calc(100% - 40px)',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    background: theme.palette.background.default,
    boxShadow: `inset 0px -0.5px 0px ${theme.palette.background.paper}`,
  },
  actionBlock: {
    display: 'flex',
    alignItems: 'center',
  },
  connectButton: {
    minWidth: 192,
    fontSize: 16,
  },
  linksContainer: {
    display: 'flex',
    marginRight: 56,
    alignItems: 'center',
    gap: 52,
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  activeLink: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  switch: {
    margin: '0 60px',
    width: 73,
    height: 28,
    padding: 0,
    '& > span:first-child': {
      top: -1,
      padding: 2,
    },
    '& .MuiSwitch-thumb': {
      width: 24,
      height: 24,
      backgroundImage: `url(${moonIcon})`,
    },
    '& .MuiSwitch-track': {
      height: 28,
      borderRadius: 14,
      width: 49,
      background: theme.palette.background.paper,
    },
    '& .Mui-checked': {
      '& .MuiSwitch-thumb': {
        backgroundImage: `url(${sunIcon})`,
      },
    },
  },
  menu: {
    width: 192,
  },
  menuButton: {
    width: '100%',
    background: theme.palette.background.paper,
    justifyContent: 'space-between',
    padding: '0 12px',
    '&:hover': {
      background: theme.palette.background.paper,
    },
  },
  walletData: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 10px)',
    alignItems: 'flex-start',
  },
  balanceLabel: {
    marginTop: -5,
  },
  walletDataWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  menuIcon: {
    transition: '.2s',
  },
  openMenuIcon: {
    transform: 'rotate(180deg)',
  },
  tradeMenuContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 9px 0 18px',
    borderRadius: 8,
  },
  tradeMenuItem: {
    display: 'flex',
    gap: 10,
    height: 48,
    width: 105,
    alignItems: 'center',
    textDecoration: 'none',
  },
  activetradeLinkIcon: {
    width: 16,
  },
  tradeMenuItemLabel: {
    color: theme.palette.warning.main,
    fontSize: 16,
  },
  tradeMenuActiveItem: {
    color: theme.palette.primary.main,
  },
}))
