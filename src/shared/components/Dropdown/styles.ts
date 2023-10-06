import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  formControlRoot: {
    position: 'relative',
  },
  select: {
    width: '100%',
    marginTop: '0px !important',
    '&:before, &:after': {
      border: 'none !important',
    },
    '& svg': {
      top: 'calc(50% - 8px)',
    },
  },
  label: {
    color: theme.palette.text.disabled,
    position: 'absolute',
    top: -20,
    left: 0,
  },
}))
