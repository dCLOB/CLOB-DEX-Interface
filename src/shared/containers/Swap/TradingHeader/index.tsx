import { Box, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { FavoriteIcon } from 'icons'
import React, { useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import { useStyles } from './styles'

export const TradingHeader = (): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const [isNegative, setIsNegative] = useState<boolean>(false)

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const TSLAUSDTPrice = '+2.21'
  const AMZNUSDTPrice = '+1.13'
  const AAPLUSDTPrice = '-4.30'
  const FBUSDTPrice = '-1.22'

  return (
    <Box className={classes.subheader}>
      <Box className={classes.subheaderItem}>
        <FavoriteIcon />
        <Typography variant="subtitle1">{translate('page.swap.subheader.favorite')}</Typography>
      </Box>
      <Box className={classes.subheaderItem}>
        <Typography variant="subtitle1">TSLA/USDT</Typography>
        <Typography
          variant="subtitle1"
          className={clsx({
            [classes.negative]: TSLAUSDTPrice.charAt(0) === '-',
            [classes.positive]: TSLAUSDTPrice.charAt(0) === '+',
          })}
        >
          {TSLAUSDTPrice}%
        </Typography>
      </Box>
      <Box className={classes.subheaderItem}>
        <Typography variant="subtitle1">AMZN/USDT</Typography>
        <Typography
          variant="subtitle1"
          className={clsx({
            [classes.negative]: AMZNUSDTPrice.charAt(0) === '-',
            [classes.positive]: AMZNUSDTPrice.charAt(0) === '+',
          })}
        >
          {AMZNUSDTPrice}%
        </Typography>
      </Box>
      <Box className={classes.subheaderItem}>
        <Typography variant="subtitle1">AAPL/USDT</Typography>
        <Typography
          variant="subtitle1"
          className={clsx({
            [classes.negative]: AAPLUSDTPrice.charAt(0) === '-',
            [classes.positive]: AAPLUSDTPrice.charAt(0) === '+',
          })}
        >
          {AAPLUSDTPrice}%
        </Typography>
      </Box>
      <Box className={classes.subheaderItem}>
        <Typography variant="subtitle1">FB/USDT</Typography>
        <Typography
          variant="subtitle1"
          className={clsx({
            [classes.negative]: FBUSDTPrice.charAt(0) === '-',
            [classes.positive]: FBUSDTPrice.charAt(0) === '+',
          })}
        >
          {FBUSDTPrice}%
        </Typography>
      </Box>
    </Box>
  )
}
