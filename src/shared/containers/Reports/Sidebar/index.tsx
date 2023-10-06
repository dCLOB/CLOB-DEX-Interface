import { Box, Typography } from '@material-ui/core'
import clsx from 'clsx'
import routes, { reportsTabs } from 'constants/routes'
import getLink from 'helpers/getLink'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Link, useParams } from 'react-router-dom'
import { useStyles } from './styles'

export const ReportsSideBar = (): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()
  const { tab: activeTab } = useParams()

  const translate = React.useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const tabs = useMemo(
    () => [
      {
        key: 'open.orders',
        label: translate('page.reports.sidebar.open.orders'),
        to: getLink(routes.ROUTE_REPORTS, { tab: reportsTabs.openOrders }),
        value: reportsTabs.openOrders,
      },
      {
        key: 'order.history',
        label: translate('page.reports.sidebar.order.history'),
        to: getLink(routes.ROUTE_REPORTS, { tab: reportsTabs.orderHistory }),
        value: reportsTabs.orderHistory,
      },
      {
        key: 'trade.history',
        label: translate('page.reports.sidebar.trade.history'),
        to: getLink(routes.ROUTE_REPORTS, { tab: reportsTabs.tradeHistory }),
        value: reportsTabs.tradeHistory,
      },
      {
        key: 'transaction.history',
        label: translate('page.reports.sidebar.transaction.history'),
        to: getLink(routes.ROUTE_REPORTS, { tab: reportsTabs.transactionHistory }),
        value: reportsTabs.transactionHistory,
      },
    ],
    [translate]
  )

  return (
    <Box className={classes.sidebar}>
      {tabs.map((tab) => {
        return (
          <Link to={tab.to} key={tab.key} className={classes.link}>
            <Typography
              variant="subtitle1"
              className={clsx({
                [classes.activeLink]: tab.value === activeTab,
              })}
            >
              {tab.label}
            </Typography>
          </Link>
        )
      })}
    </Box>
  )
}
