import clsx from 'clsx'
import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Orderbook } from 'shared/containers/Swap/Orderbook'
import { TradingHeader } from 'shared/containers/Swap/TradingHeader'
import { Trades } from '../../shared/containers/Swap/Trades/index'
import { MarketsHeader } from 'shared/containers/Swap/MarketsHeader'
import { Assets } from 'shared/containers/Swap/Assets'
import { useSelector } from 'react-redux'
import { walletAddressSelector } from 'store/selectors/everwallet'
import { MarginData } from '../../shared/containers/Swap/MarginData/index'
import { OrderForm } from 'shared/containers/Swap/OrderForm'
import { SwapAccordion } from 'shared/containers/Swap/SwapAccordion'

const SpotPage = (): JSX.Element => {
  const classes = useStyles()

  const address = useSelector(walletAddressSelector)

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.rightConrainter}>
        <Box className={clsx(classes.block, classes.swapHeader)}>
          <TradingHeader />
        </Box>
        <Box className={clsx(classes.block, classes.marketData)}>
          <MarketsHeader isSpot={true} />
        </Box>
        <Box className={clsx(classes.tradingContainer)}>
          <Box className={clsx(classes.block, classes.chart)}>
            <Typography>chart</Typography>
          </Box>
          <Box className={classes.tradeContainer}>
            <Box className={clsx(classes.block, classes.orderbook)}>
              <Orderbook />
            </Box>
            <Box className={clsx(classes.block, classes.tradesHistory)}>
              <Trades />
            </Box>
          </Box>
        </Box>
        <Box className={clsx(classes.block, classes.accordion)}>
          <SwapAccordion isSpot={true} />
        </Box>
      </Box>
      <Box className={classes.leftContainer}>
        {address && (
          <>
            <Box className={clsx(classes.block, classes.orderform)}>
              <OrderForm />
            </Box>
            <Box className={clsx(classes.block, classes.assets)}>
              <Assets />
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default SpotPage
