import { Button as BaseButton } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'

const OutlinedButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.text.primary,
    fontWeight: 700,
    height: 48,
    textTransform: 'capitalize',
    borderRadius: 6,
  },
}))(BaseButton)

export default OutlinedButton
