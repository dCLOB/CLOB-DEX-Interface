import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useStyles } from './styles'

export const Trades = (): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const columns = [
    {
      label: translate('page.swap.trades.price'),
    },
    {
      label: translate('page.swap.trades.amount'),
      className: classes.amount,
    },
    {
      label: translate('page.swap.trades.time'),
      className: classes.time,
    },
  ]

  const trades = [
    {
      amount: 14.6,
      side: 'buy',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'sell',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'buy',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'sell',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'buy',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'sell',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'buy',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'sell',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'buy',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'sell',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'buy',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'sell',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'buy',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'sell',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'buy',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'sell',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'buy',
      time: '16:40:17',
      price: 657.62,
    },
    {
      amount: 14.6,
      side: 'sell',
      time: '16:40:17',
      price: 657.62,
    },
  ]

  return (
    <Box className={classes.container}>
      <Box className={classes.blockHeader}>
        <Typography variant="subtitle1" id="orderboot-container-title">
          {translate('page.swap.trades.title')}
        </Typography>
      </Box>
      <Box className={classes.tableWrapper}>
        <Table className={classes.tradesTable} stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => {
                return (
                  <TableCell className={clsx(classes.headerCell, column.className)} key={column.label}>
                    <Box className={clsx(classes.headerLabel, column.className)}>
                      <Typography variant="h6">{column.label}</Typography>
                      {index === 0 && (
                        <Typography variant="h6" className={classes.currencyLabel}>
                          USDT
                        </Typography>
                      )}
                      {index === 1 && (
                        <Typography variant="h6" className={classes.currencyLabel}>
                          TSLA
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map((trade, index) => {
              return (
                <TableRow className={classes.tableRow} key={`${trade.amount}-${trade.time}-${index}`}>
                  <TableCell className={clsx(classes.tableCell)}>
                    <Typography
                      variant="h6"
                      className={clsx(classes.cellValue, {
                        [classes.sellTrade]: trade.side === 'sell',
                        [classes.butTrade]: trade.side === 'buy',
                      })}
                    >
                      {trade.price}
                    </Typography>
                  </TableCell>
                  <TableCell className={clsx(classes.tableCell)}>
                    <Typography variant="h6" className={clsx(classes.cellValue, classes.amount)}>
                      {trade.amount}
                    </Typography>
                  </TableCell>
                  <TableCell className={clsx(classes.tableCell)}>
                    <Typography variant="h6" className={clsx(classes.cellValue, classes.time)}>
                      {trade.time}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  )
}
