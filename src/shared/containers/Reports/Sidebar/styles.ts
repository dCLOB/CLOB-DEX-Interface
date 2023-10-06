import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100vh - 80px)',
    maxWidth: 280,
    borderRight: `1px solid ${theme.palette.secondary.main}`,
  },
  link: {
    textDecoration: 'none',
    padding: '0 20px',
    marginBottom: 16,
    '&:first-child': {
      marginTop: 40,
    },
  },
  activeLink: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    width: 'fit-content',
  },
}))
