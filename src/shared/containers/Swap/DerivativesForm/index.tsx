import { Box, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React, { useCallback, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { DerivativeFormTab } from './Tab'
import { useStyles } from './styles'

export const DerivativesFrom = (): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  const [activeFeeTabIndex, setActiveFeeTabIndex] = useState<number>(0)
  const [activeLeverageIndex, setActiveLeverageIndex] = useState<number>(0)

  const tabs = useMemo(
    () => [
      translate('page.swap.orderform.limit'),
      translate('page.swap.orderform.market'),
      translate('page.swap.orderform.stop.limit'),
    ],
    [translate]
  )

  const leverageTabs = useMemo(() => [2, 5, 10, 15, 20], [])

  const handleChangeTab = useCallback((index: number) => setActiveTabIndex(index), [])
  const handleChangeFeeTab = useCallback((index: number) => setActiveFeeTabIndex(index), [])
  const handleChangeLeverageTab = useCallback((index: number) => setActiveLeverageIndex(index), [])

  return (
    <Box className={classes.container}>
      <Box className={classes.blockHeader}>
        <Typography variant="subtitle1" id="orderbook-container-title">
          {translate('page.swap.derivativeform.title')}
        </Typography>
        <Typography variant="overline" className={classes.headerCross}>
          {translate('page.swap.derivativeform.cross')}
        </Typography>
      </Box>
      <Box className={classes.tabs}>
        {leverageTabs.map((tab, index) => {
          return (
            <Typography
              variant="h6"
              className={clsx(classes.leverageButton, {
                [classes.activeLeverageButton]: index === activeLeverageIndex,
              })}
              onClick={handleChangeLeverageTab.bind(null, index)}
            >
              {tab}x
            </Typography>
          )
        })}
      </Box>
      <Box className={classes.tabs}>
        {tabs.map((tab, index) => {
          return (
            <Typography
              key={tab}
              variant="body2"
              className={clsx(classes.tabLabel, {
                [classes.activeTab]: index === activeTabIndex,
              })}
              onClick={handleChangeTab.bind(null, index)}
            >
              {tab}
            </Typography>
          )
        })}
      </Box>
      <DerivativeFormTab
        translate={translate}
        activeTabIndex={activeTabIndex}
        activeFeeTabIndex={activeFeeTabIndex}
        onFeeTabClick={handleChangeFeeTab}
      />
    </Box>
  )
}
