import { makeStyles, Theme } from '@material-ui/core'
import { paletteColors } from 'theme/materialTheme'

export const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    marginBottom: 20,
  },
  data: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
    height: 18,
  },
  currency: {
    marginTop: 2,
  },
  maxData: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  maxValue: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    '&:last-child': {
      alignItems: 'flex-end',
    },
  },
  maxLabel: {
    height: 18,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buyButton: {
    width: '48%',
    background: theme.palette.success.main,
    fontSize: 16,
    color: paletteColors.white,
    '&:hover': {
      background: theme.palette.success.main,
    },
  },
  sellButton: {
    width: '48%',
    background: theme.palette.error.main,
    fontSize: 16,
    color: paletteColors.white,
    '&:hover': {
      background: theme.palette.error.main,
    },
  },
  feeTypes: {
    display: 'flex',
    gap: 8,
    marginBottom: 20,
  },
  feeButton: {
    height: 24,
    padding: '0 9px',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    borderRadius: 4,
    cursor: 'pointer',
  },
  activeFeeButton: {
    background: theme.palette.background.paper,
  },
  feeIcon: {
    width: 16,
    height: 16,
  },
  input: {
    '& > div ': {
      height: 48,
      marginBottom: 6,
    },
    '& input': {
      paddingTop: 3,
      paddingBottom: 3,
      textAlign: 'right',
      '&::placeholder': {
        fontWeight: 700,
      },
    },
    '&:focus-within': {
      '& > div': {
        background: theme.palette.background.default,
        border: `1px solid ${theme.palette.warning.main}`,
      },
      '& input': {
        background: theme.palette.background.default,
      },
    },
  },
  inputCurrency: {
    color: theme.palette.text.disabled,
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  divider: {
    backgroundColor: theme.palette.secondary.main,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '30px 0',
  },
  dividerLabel: {
    position: 'absolute',
    padding: '0 12px',
    background: theme.palette.background.default,
  },
}))
