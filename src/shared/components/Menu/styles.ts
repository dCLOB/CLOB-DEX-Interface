import { makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  // MENU
  paper: {
    borderRadius: 8,
    boxShadow: '0 -4px 22px 0 rgba(118, 117, 121, 0.15)',
  },
  list: {
    padding: 0,
    borderRadius: 8,
  },
  // MENU ITEM
  menuItemRoot: {
    display: 'flex',
    gridGap: '11px 16px',
    gridTemplateColumns: '32px 1fr',
    alignItems: 'center',
    color: theme.palette.text.primary,
    padding: '10px 24px',
    transition: 'color .2s',
    '&:hover': {
      background: 'transparent',
    },
    '&:focus': {
      background: 'transparent',
    },
  },
  menuItemSelected: {
    background: 'transparent !important',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
  },
  menuWrapper: {
    width: '100%',
    '& hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))
