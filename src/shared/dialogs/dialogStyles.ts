import { makeStyles, Theme } from '@material-ui/core'

export const useDialogStyles = makeStyles((theme: Theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      background: theme.palette.info.dark,
      border: `1px solid ${theme.palette.info.light}`,
      position: 'relative',
      padding: 20,
    },
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 0,
  },
  dialogContent: {
    display: 'flex',
    padding: 0,
    alignItems: 'center',
  },
}))
