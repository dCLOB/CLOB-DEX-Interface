import { TextField as BaseTextField } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'

export const Input = withStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > div': {
      height: 45,
      background: theme.palette.info.main,
      borderRadius: 6,
      padding: '0 14px',
      '&:before': {
        borderBottom: 'none !important',
      },
      '&:after': {
        borderBottom: 'none !important',
      },
    },
  },
}))(BaseTextField)
