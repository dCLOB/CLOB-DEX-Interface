import { Box, Table, TableHead, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React, { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { DataTable } from 'shared/components/Table'
import { useStyles } from '../styles'

export const Positions = (): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const positions = [
    {
      side: 'buy',
      pair: 'TSLA/USDT',
      amount: 4,
      basePrice: 657.62,
      liqPrice: null,
      pl: 729.0,
      plPercentage: 22,
    },
    {
      side: 'buy',
      pair: 'AMZN/USDT',
      amount: 4,
      basePrice: 3630.32,
      liqPrice: null,
      pl: 122.5,
      plPercentage: 8.32,
    },
    {
      side: 'sell',
      pair: 'AAPL/USDT',
      amount: -10,
      basePrice: 144.98,
      liqPrice: null,
      pl: -100.5,
      plPercentage: -15.51,
    },
    {
      side: 'buy',
      pair: 'FB/USDT',
      amount: 8.32,
      basePrice: 373.28,
      liqPrice: null,
      pl: 15.32,
      plPercentage: 2.5,
    },
  ]

  const headers = useMemo(
    () => [
      {
        name: 'pair',
        label: translate('page.swap.position.table.pair'),
        sortable: true,
        render: (item: any, name: string) => {
          const isPositive = item.amount >= 0

          return (
            <Box className={classes.pairColumn}>
              <Box
                className={clsx(classes.changeMark, {
                  [classes.changeMarkGreen]: isPositive,
                  [classes.changeMarkRed]: !isPositive,
                })}
              />
              {item[name]}
            </Box>
          )
        },
      },
      {
        name: 'amount',
        label: translate('page.swap.position.table.amount'),
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
        name: 'basePrice',
        label: translate('page.swap.position.table.base.price'),
        sortable: true,
        align: 'right',
        render: (item: any, name: string) => {
          return (
            <Box className={clsx(classes.columnData, classes.alignRight)}>
              {item[name]}
              <Typography className={classes.currencyLabel}>{item.pair.split('/')[1]}</Typography>
            </Box>
          )
        },
      },
      {
        name: 'liqPrice',
        label: translate('page.swap.position.table.liq.price'),
        sortable: true,
        align: 'right',
        render: (item: any, name: string) => {
          return item[name] || 'N/A'
        },
      },
      {
        name: 'pl',
        label: translate('page.swap.position.table.pl'),
        sortable: true,
        align: 'right',
        render: (item: any, name: string) => {
          const isPositive = item.amount >= 0

          return (
            <Box className={clsx(classes.columnData, classes.alignRight)}>
              <Typography
                className={clsx({
                  [classes.positiveChange]: isPositive,
                  [classes.negativeChange]: !isPositive,
                })}
              >
                {`${isPositive ? '+' : ''}${item[name]}`}
              </Typography>
              <Typography className={classes.currencyLabel}>{item.pair.split('/')[1]}</Typography>
            </Box>
          )
        },
      },
      {
        name: 'plPercentage',
        label: translate('page.swap.position.table.pl.percentage'),
        sortable: true,
        align: 'right',
        render: (item: any, name: string) => {
          const isPositive = item.amount >= 0

          return (
            <Box className={clsx(classes.columnData, classes.alignRight)}>
              <Typography
                className={clsx({
                  [classes.positiveChange]: isPositive,
                  [classes.negativeChange]: !isPositive,
                })}
              >
                {`${isPositive ? '+' : ''}${item[name]}`}
              </Typography>
            </Box>
          )
        },
      },
      {
        name: 'actions',
        label: '',
        render: (item: any, name: string) => {
          return (
            <Box className={classes.postionActions}>
              <Link to="" className={classes.link}>
                <Typography className={classes.orderTypeLink}>
                  {translate('page.swap.position.table.actions.market')}
                </Typography>
              </Link>
              <Box className={classes.amount}>
                <Typography>{item.basePrice}</Typography>
              </Box>
              <Link to="" className={classes.link}>
                <Typography className={classes.orderTypeLink}>
                  {translate('page.swap.position.table.actions.limit')}
                </Typography>
              </Link>
            </Box>
          )
        },
      },
    ],
    [translate]
  )

  return <DataTable data={positions} columns={headers} loading={false} />
}
