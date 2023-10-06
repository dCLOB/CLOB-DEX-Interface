import { Button as BaseButton } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'

const ContainedButton = withStyles((theme: Theme) => ({
  root: {
    background: 'linear-gradient(124.04deg, #F99500 0.05%, #BC4400 121.37%);',
    color: theme.palette.text.primary,
    fontWeight: 700,
    height: 48,
    textTransform: 'capitalize',
    borderRadius: 6,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  disabled: {
    opacity: 0.3,
    color: theme.palette.text.primary,
  },
}))(BaseButton)

export default ContainedButton
