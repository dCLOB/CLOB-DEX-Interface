import { makeStyles, Theme } from '@material-ui/core'
import { paletteColors } from 'theme/materialTheme'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    padding: '0 20px',
    position: 'relative',
  },
  blockHeader: {
    display: 'flex',
    paddingTop: 20,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  footer: {},
  data: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
    height: 18,
  },
  currency: {
    marginTop: 2,
  },
  maxData: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  maxValue: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    '&:last-child': {
      alignItems: 'flex-end',
    },
  },
  maxLabel: {
    height: 18,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buyButton: {
    width: '48%',
    background: theme.palette.success.main,
    fontSize: 16,
    color: paletteColors.white,
    '&:hover': {
      background: theme.palette.success.main,
    },
  },
  sellButton: {
    width: '48%',
    background: theme.palette.error.main,
    fontSize: 16,
    color: paletteColors.white,
    '&:hover': {
      background: theme.palette.success.main,
    },
  },
  tabs: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tabLabel: {
    height: 21,
    color: paletteColors.silver,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  activeTab: {
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
}))
