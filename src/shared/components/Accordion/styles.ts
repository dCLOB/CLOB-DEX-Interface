import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
  },
  accordion: {
    background: theme.palette.background.default,
    borderRadius: '0 !important',
    padding: '0 20px',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    marginTop: '0 !important',
    marginBottom: '0 !important',
    '&:before': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  expandedIcon: {
    color: theme.palette.text.disabled,
  },
}))
