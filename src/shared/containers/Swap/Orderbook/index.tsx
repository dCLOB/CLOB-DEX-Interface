import { Box, Typography, useTheme } from '@material-ui/core'
import { IncreaseArrowIcon } from 'icons'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentMarketPairSelector, marketDataSelector } from 'store/selectors/marketPairs'
import { parsedAsksSelector, parsedBidsSelector, priceAccuracySelector } from 'store/selectors/orderbook'
import { OrderbookItem } from './OrderbookItem'
import { useStyles } from './styles'
import clsx from 'clsx'
import { OrderbookActions } from 'store/reducers/orderbook'
import { OptionType } from 'shared/components/Dropdown/types'
import { useIntl } from 'react-intl'

const defaultPriceAccuracy = 0.01

export const Orderbook = (): JSX.Element => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const currentMarketPair = useSelector(currentMarketPairSelector)
  const asks = useSelector(parsedAsksSelector)
  const bids = useSelector(parsedBidsSelector)
  const priceAccuracy = useSelector(priceAccuracySelector)
  const marketData = useSelector(marketDataSelector)

  const [isNegative, setIsNegative] = useState<boolean>(false)
  const [priceAccuracies, setPriceAccuracies] = useState<OptionType[]>([])
  const theme = useTheme()

  useEffect(() => {
    return handleSetCurrentPriceAccurancy(0.01)
  }, [])

  useEffect(() => {
    const marketPairAccuracy = [
      +defaultPriceAccuracy.toFixed(currentMarketPair?.priceDecimals || 2),
      +defaultPriceAccuracy.toFixed(currentMarketPair?.priceDecimals || 2) * 10,
      +defaultPriceAccuracy.toFixed(currentMarketPair?.priceDecimals || 2) * 10 ** 2,
      +defaultPriceAccuracy.toFixed(currentMarketPair?.priceDecimals || 2) * 10 ** 3,
      (+defaultPriceAccuracy.toFixed(currentMarketPair?.priceDecimals || 2) * 10 ** 4) / 2,
      +defaultPriceAccuracy.toFixed(currentMarketPair?.priceDecimals || 2) * 10 ** 4,
    ].map((accuracy) => ({
      label: accuracy,
      value: accuracy,
    }))

    handleSetCurrentPriceAccurancy(marketPairAccuracy[0].value)
    setPriceAccuracies(marketPairAccuracy)
  }, [])

  const handleSetCurrentPriceAccurancy = useCallback(
    (value: number) => {
      dispatch(OrderbookActions.setPriceAccuracy({ accuracy: value }))
    },
    [priceAccuracy]
  )

  const renderPriceAccuancy = useCallback(
    (accurancy: OptionType) => {
      return (
        <Box
          key={accurancy.value}
          onClick={handleSetCurrentPriceAccurancy.bind(null, +accurancy.value)}
          className={clsx(classes.accurancyButton, {
            [classes.activeAccurancyButton]: accurancy.value === priceAccuracy,
          })}
        >
          <Typography variant="h6">{accurancy.label}</Typography>
        </Box>
      )
    },
    [handleSetCurrentPriceAccurancy, classes, priceAccuracy]
  )

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  return (
    <Box className={classes.container}>
      <Box className={classes.orderbookHeader}>
        <Typography variant="subtitle1" id="orderboot-container-title">
          {translate('page.swap.orderbook.title')}
        </Typography>
      </Box>
      <Box className={classes.accurancyContainer}>{priceAccuracies.map(renderPriceAccuancy)}</Box>
      <Box className={classes.tableHeader}>
        <Box className={classes.tableHeaderItem}>
          <Typography className={classes.headerLabel} variant="body1">
            {translate('page.swap.orderbook.price')}
          </Typography>
          <Typography className={classes.headerLabel} variant="overline">
            USDT
          </Typography>
        </Box>
        <Box className={classes.tableHeaderItem}>
          <Typography className={classes.headerLabel} variant="body1">
            {translate('page.swap.orderbook.size')}
          </Typography>
          <Typography className={classes.headerLabel} variant="overline">
            TSLA
          </Typography>
        </Box>
        <Box className={classes.tableHeaderItem}>
          <Typography className={classes.headerLabel} variant="body1">
            {translate('page.swap.orderbook.sum')}
          </Typography>
          <Typography className={classes.headerLabel} variant="overline">
            TSLA
          </Typography>
        </Box>
      </Box>
      <Box className={clsx(classes.orderbookItemWrapper)}>
        <OrderbookItem
          orders={asks}
          backgroundColor={theme.palette.error.dark}
          scrollRequired={true}
          priceDecimals={priceAccuracy.toString().split('.')[1]?.length || 0}
          quantityDecimals={currentMarketPair?.qtyDecimals}
        />
      </Box>
      <Box
        className={clsx(classes.marketPrice, {
          [classes.negativeArrow]: isNegative,
        })}
      >
        <Box display="flex" alignItems="center">
          <IncreaseArrowIcon id="arrow-direction-up" />
          <Typography
            variant="h5"
            className={clsx(classes.price, {
              [classes.negative]: isNegative,
            })}
            id="market-current-price"
          >
            {(marketData && marketData.lastTradePrice.toFixed(currentMarketPair?.priceDecimals || 2)) || '657.62'}
          </Typography>
        </Box>
      </Box>
      <Box className={clsx(classes.orderbookItemWrapper)}>
        <OrderbookItem
          orders={bids}
          backgroundColor={theme.palette.success.dark}
          priceDecimals={priceAccuracy.toString().split('.')[1]?.length || 0}
          quantityDecimals={currentMarketPair?.qtyDecimals}
        />
      </Box>
    </Box>
  )
}
