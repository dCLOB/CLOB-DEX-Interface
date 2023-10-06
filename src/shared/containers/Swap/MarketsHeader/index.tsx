import { Box, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { MarketSelector } from '../MarketSelector'
import { useStyles } from './styles'

interface MarketHeaderProps {
  isSpot: boolean
}

export const MarketsHeader = (props: MarketHeaderProps): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const { isSpot } = props

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const derivativesData = useCallback(() => {
    return (
      <>
        <Box>
          <Typography variant="overline" className={classes.dataLabel}>
            {translate('page.swap.marketsHeader.index')}
          </Typography>
          <Typography variant="body2" className={classes.indexValue}>
            657.23
          </Typography>
        </Box>
        <Box>
          <Typography variant="overline" className={classes.dataLabel}>
            {translate('page.swap.marketsHeader.premium')}
          </Typography>
          <Typography variant="body2">0.01%</Typography>
        </Box>
        <Box>
          <Typography variant="overline" className={classes.dataLabel}>
            {translate('page.swap.marketsHeader.funding.countdown')}
          </Typography>
          <Box className={classes.severalValues}>
            <Typography variant="body2">0.0100%</Typography>
            <Typography variant="body2" className={classes.time}>
              03:35:15
            </Typography>
          </Box>
        </Box>
      </>
    )
  }, [classes, translate])

  const spotData = useCallback(() => {
    return (
      <Typography variant="h4" className={clsx({ [classes.greenColor]: true, [classes.redColor]: false })}>
        657.62
      </Typography>
    )
  }, [classes])

  return (
    <Box className={classes.marketsHeaderContainer}>
      <MarketSelector isSpot={isSpot} />
      {isSpot ? spotData() : derivativesData()}
      <Box>
        <Typography variant="overline">{translate('page.swap.marketsHeader.change24h')}</Typography>
        <Box className={classes.severalValues}>
          <Typography variant="body2" className={classes.greenColor}>
            +14.24
          </Typography>
          <Typography variant="body2" className={classes.greenColor}>
            +2.21%
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="overline">{translate('page.swap.marketsHeader.high24h')}</Typography>
        <Typography variant="body2">660.13</Typography>
      </Box>
      <Box>
        <Typography variant="overline">{translate('page.swap.marketsHeader.low24h')}</Typography>
        <Typography variant="body2">652.33</Typography>
      </Box>
      <Box>
        <Typography variant="overline">{translate('page.swap.marketsHeader.volume24h')} (TSLA)</Typography>
        <Typography variant="body2">652.33</Typography>
      </Box>
      <Box>
        <Typography variant="overline">{translate('page.swap.marketsHeader.volume24h')} (USDT)</Typography>
        <Typography variant="body2">652.33</Typography>
      </Box>
    </Box>
  )
}
