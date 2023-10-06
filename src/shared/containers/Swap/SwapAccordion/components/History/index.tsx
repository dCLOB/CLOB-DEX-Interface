import { Box, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React, { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { DataTable } from 'shared/components/Table'
import { useStyles } from '../styles'

export const History = (): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const history = [
    {
      side: 'buy',
      pair: 'TSLA/USDT',
      type: 'Market',
      amount: 4,
      price: null,
      avgPrice: 657.62,
      status: 'executed',
      date: '29/07/2021',
      time: '13:32',
    },
    {
      side: 'sell',
      pair: 'TSLA/USDT',
      type: 'Market',
      amount: 4,
      price: null,
      avgPrice: 657.62,
      status: 'executed',
      date: '29/07/2021',
      time: '13:32',
    },
    {
      side: 'buy',
      pair: 'TSLA/USDT',
      type: 'Market',
      amount: 4,
      price: null,
      avgPrice: 657.62,
      status: 'executed',
      date: '29/07/2021',
      time: '13:32',
    },
    {
      side: 'sell',
      pair: 'TSLA/USDT',
      type: 'Market',
      amount: 4,
      price: null,
      avgPrice: 657.62,
      status: 'executed',
      date: '29/07/2021',
      time: '13:32',
    },
    {
      side: 'buy',
      pair: 'TSLA/USDT',
      type: 'Market',
      amount: 4,
      price: null,
      avgPrice: 657.62,
      status: 'executed',
      date: '29/07/2021',
      time: '13:32',
    },
    {
      side: 'sell',
      pair: 'TSLA/USDT',
      type: 'Market',
      amount: 4,
      price: null,
      avgPrice: 657.62,
      status: 'executed',
      date: '29/07/2021',
      time: '13:32',
    },
  ]

  const headers = useMemo(
    () => [
      {
        name: 'pair',
        label: translate('page.swap.history.table.pair'),
        sortable: true,
        render: (item: any, name: string) => {
          const isBuy = item.side === 'buy'

          return (
            <Box className={classes.pairColumn}>
              <Box
                className={clsx(classes.changeMark, {
                  [classes.changeMarkGreen]: isBuy,
                  [classes.changeMarkRed]: !isBuy,
                })}
              />
              {item[name]}
            </Box>
          )
        },
      },
      {
        name: 'type',
        label: translate('page.swap.history.table.type'),
        sortable: true,
      },
      {
        name: 'amount',
        label: translate('page.swap.history.table.amount'),
        sortable: true,
        render: (item: any, name: string) => {
          return (
            <Box className={classes.columnData}>
              {item[name]}
              <Typography className={classes.currencyLabel}>{item.pair.split('/')[0]}</Typography>
            </Box>
          )
        },
      },
      {
        name: 'price',
        label: translate('page.swap.history.table.price'),
        sortable: true,
        align: 'right',
        className: classes.price,
        render: (item: any, name: string) => {
          return (
            <Box className={clsx(classes.columnData, classes.alignRight)}>
              {item[name] || '-'}
              <Typography className={classes.currencyLabel}>{item.pair.split('/')[1]}</Typography>
            </Box>
          )
        },
      },
      {
        name: 'avgPrice',
        label: translate('page.swap.history.table.avarage.price'),
        sortable: true,
        align: 'right',
        className: classes.avgPrice,
        render: (item: any, name: string) => {
          return (
            <Box className={clsx(classes.columnData, classes.alignRight)}>
              {item[name] || '-'}
              <Typography className={classes.currencyLabel}>{item.pair.split('/')[1]}</Typography>
            </Box>
          )
        },
      },
      {
        name: 'status',
        label: translate('page.swap.history.table.status'),
        sortable: true,
        align: 'right',
      },
      {
        name: 'date',
        label: translate('page.swap.history.table.inactive'),
        sortable: true,
        className: classes.date,
        render: (item: any, name: string) => {
          return (
            <Box className={clsx(classes.columnData)}>
              {item[name]}
              <Typography className={classes.currencyLabel}>{item.time}</Typography>
            </Box>
          )
        },
      },
    ],
    [translate]
  )

  return <DataTable data={history} columns={headers} loading={false} />
}
