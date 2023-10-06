import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    width: 364,
    marginBottom: 20,
  },
  currencyBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 24,
    width: '100%',
  },
  balanceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 19,
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  approveButton: {
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderImage: `linear-gradient(to right, darkblue, darkorchid) 1`,
    // borderRadius: 6,
    position: 'relative',
    border: '4px solid transparent',
    borderRadius: 6,
    background: theme.palette.info.dark,
    backgroundClip: 'padding-box',
    padding: 0,
    zIndex: 1,
    marginBottom: 6,
    '&::after': {
      position: 'absolute',
      top: -4,
      bottom: -4,
      left: -1,
      right: -1,
      background: `linear-gradient(to right, #F99500, #BC4400)`,
      content: '""',
      zIndex: -1,
      borderRadius: 6,
    },
    '& > .MuiButton-label': {
      borderRadius: 6,
      background: theme.palette.info.dark,
      height: 46,
    },
  },
  greyLabel: {
    fontSize: 14,
  },
  content: {
    flexDirection: 'column',
    maxWidth: 320,
    width: '100%',
    margin: '0 auto',
  },
  depositButton: {
    width: '100%',
    maxWidth: 135,
  },
  link: {
    display: 'flex',
    textDecoration: 'none',
  },
  linkLabel: {
    textDecoration: 'underline',
  },
  depositDescription: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  depositDescriptionMessage: {
    fontSize: 12,
  },
  inputCurrency: {
    color: theme.palette.text.disabled,
  },
  amountInput: {
    '& > div ': {
      height: 48,
      marginBottom: 6,
      border: `1px solid ${theme.palette.warning.main}`,
    },
    '& input': {
      paddingTop: 3,
      paddingBottom: 3,
      borderRight: `1px solid ${theme.palette.warning.main}`,
      textAlign: 'right',
      '&::placeholder': {
        fontWeight: 700,
      },
    },
    '&:focus-within': {
      '& > div': {
        background: theme.palette.info.dark,
        border: `1px solid ${theme.palette.warning.main}`,
      },
      '& input': {
        background: theme.palette.info.dark,
      },
    },
  },
  filledInput: {
    '& input': {
      borderRight: 'none',
    },
  },
}))
