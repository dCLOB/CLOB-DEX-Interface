import { Box, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React, { useCallback, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useStyles } from './styles'
import { OrderFormTab } from './Tab'

export const OrderForm = (): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  const [activeFeeTabIndex, setActiveFeeTabIndex] = useState<number>(0)

  const tabs = useMemo(
    () => [
      translate('page.swap.orderform.limit'),
      translate('page.swap.orderform.market'),
      translate('page.swap.orderform.stop.limit'),
    ],
    [translate]
  )

  const handleChangeTab = useCallback((index: number) => setActiveTabIndex(index), [])
  const handleChangeFeeTab = useCallback((index: number) => setActiveFeeTabIndex(index), [])

  return (
    <Box className={classes.container}>
      <Box className={classes.blockHeader}>
        <Typography variant="subtitle1" id="orderboot-container-title">
          {translate('page.swap.orderform.title')}
        </Typography>
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
      <OrderFormTab
        translate={translate}
        activeTabIndex={activeTabIndex}
        activeFeeTabIndex={activeFeeTabIndex}
        onFeeTabClick={handleChangeFeeTab}
      />
    </Box>
  )
}
