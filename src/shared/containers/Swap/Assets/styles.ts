import { makeStyles, Theme } from '@material-ui/core'
import { paletteColors } from 'theme/materialTheme'

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
  buyButton: {
    height: 24,
    fontSize: 12,
    color: paletteColors.white,
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
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  footerButton: {
    width: '48%',
    fontSize: 16,
  },
  approveButton: {
    position: 'relative',
    border: '4px solid transparent',
    borderRadius: 6,
    background: theme.palette.info.dark,
    padding: 10,
    zIndex: 1,
    '&::after': {
      position: 'absolute',
      top: -4,
      bottom: -4,
      left: -2,
      right: -2,
      background: `linear-gradient(to right, #F99500, #BC4400)`,
      content: '""',
      zIndex: -1,
      borderRadius: 6,
    },
  },
}))
