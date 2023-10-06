import { Box, Checkbox, FormControl, FormGroup, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { CloseIcon, ExpandCloseIcon, ExpandOpenIcon, UncheckedIcon } from 'icons'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { DataTable } from 'shared/components/Table'
import { useStyles } from '../styles'

export const OpenOrders = (): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const [expandedPairs, setExpandedPairs] = useState<number[]>([])
  const [mergedOrders, setMergedOrders] = useState<any[]>([])

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const orders = useMemo(
    () => [
      {
        pairId: 1,
        side: 'buy',
        pair: 'TSLA/USDT',
        type: 'Market',
        amount: 4,
        price: 666.66,
        date: '29/07/2021',
        time: '13:32',
      },
      {
        pairId: 1,
        side: 'sell',
        pair: 'TSLA/USDT',
        type: 'Market',
        amount: 4,
        price: 700.5,
        avgPrice: 657.62,
        status: 'executed',
        date: '29/07/2021',
        time: '13:32',
      },
      {
        pairId: 1,
        side: 'buy',
        pair: 'TSLA/USDT',
        type: 'Market',
        amount: 4,
        price: 672.25,
        avgPrice: 657.62,
        status: 'executed',
        date: '29/07/2021',
        time: '13:32',
      },
    ],
    []
  )

  useEffect(() => {
    const pairsIds = orders.map((order) => order.pairId)
    const uniqPairsIds = [...new Set(pairsIds)]

    const uniqPairs = uniqPairsIds.map((pairId) => {
      const pairOrders = orders.filter((order) => order.pairId === pairId)
      const pairTotal = pairOrders.reduce((acc, cur) => acc + cur.amount, 0)

      return {
        pairId,
        pair: pairOrders[0].pair,
        amount: pairTotal,
        pairOrders,
        price: null,
      }
    })

    setMergedOrders(uniqPairs)
  }, [orders])

  const handleAddToExpand = (value: number) => setExpandedPairs((prev) => [...prev, value])
  const handleDeleteFromExpand = (value: number) =>
    setExpandedPairs((prev) => prev.filter((prevItem) => value !== prevItem))

  const headers = useMemo(
    () => [
      {
        name: 'pair',
        label: translate('page.swap.open.orders.table.pair'),
        sortable: true,
        render: (item: any, name: string) => {
          const isExpanded = expandedPairs.includes(item.pairId)
          return (
            <Box>
              <Box className={clsx(classes.pairColumn, classes.mainRow)}>
                {isExpanded ? (
                  <ExpandCloseIcon
                    onClick={handleDeleteFromExpand.bind(null, item.pairId)}
                    className={classes.expandIcon}
                  />
                ) : (
                  <ExpandOpenIcon onClick={handleAddToExpand.bind(null, item.pairId)} className={classes.expandIcon} />
                )}
                {item[name]}
              </Box>
              {isExpanded && (
                <Box className={classes.expandedPairColumn}>
                  {item.pairOrders.map((pairOrder: any) => {
                    const isBuy = pairOrder.side === 'buy'

                    return (
                      <Box className={clsx(classes.pairColumn, classes.expandedRow)}>
                        <Box
                          className={clsx(classes.changeMark, {
                            [classes.changeMarkGreen]: isBuy,
                            [classes.changeMarkRed]: !isBuy,
                          })}
                        />
                        {item[name]}
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>
          )
        },
      },
      {
        name: 'type',
        label: translate('page.swap.open.orders.table.type'),
        sortable: true,
        render: (item: any, name: string) => {
          const isExpanded = expandedPairs.includes(item.pairId)
          return (
            <Box>
              <Box className={clsx(classes.mainRow)} />
              {isExpanded && (
                <Box>
                  {item.pairOrders.map((pairOrder: any) => {
                    return <Box className={classes.expandedRow}>{pairOrder[name]}</Box>
                  })}
                </Box>
              )}
            </Box>
          )
        },
      },
      {
        name: 'amount',
        label: translate('page.swap.open.orders.table.amount'),
        sortable: true,
        align: 'right',
        render: (item: any, name: string) => {
          const isExpanded = expandedPairs.includes(item.pairId)
          const currencyCode = item.pair.split('/')[0]

          return (
            <Box>
              <Box className={clsx(classes.mainRow, classes.alignRight)}>
                {item[name]}
                <Typography className={classes.currencyLabel}>{currencyCode}</Typography>
              </Box>
              {isExpanded && (
                <Box>
                  {item.pairOrders.map((pairOrder: any) => {
                    return (
                      <Box className={clsx(classes.expandedRow, classes.dataRow, classes.alignRight)}>
                        {pairOrder[name]}
                        <Typography className={classes.currencyLabel}>{currencyCode}</Typography>
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>
          )
        },
      },
      {
        name: 'price',
        label: translate('page.swap.open.orders.table.price'),
        sortable: true,
        align: 'right',
        render: (item: any, name: string) => {
          const isExpanded = expandedPairs.includes(item.pairId)
          const currencyCode = item.pair.split('/')[1]

          return (
            <Box>
              <Box className={clsx(classes.mainRow, classes.alignRight)}>
                {item[name] || '-'}
                <Typography className={classes.currencyLabel}>{currencyCode}</Typography>
              </Box>
              {isExpanded && (
                <Box>
                  {item.pairOrders.map((pairOrder: any) => {
                    return (
                      <Box className={clsx(classes.expandedRow, classes.dataRow, classes.alignRight)}>
                        {pairOrder[name] || '-'}
                        <Typography className={classes.currencyLabel}>{currencyCode}</Typography>
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>
          )
        },
      },
      {
        name: 'date',
        label: translate('page.swap.open.orders.table.placed'),
        sortable: true,
        align: 'right',
        render: (item: any, name: string) => {
          const isExpanded = expandedPairs.includes(item.pairId)
          return (
            <Box>
              <Box className={clsx(classes.mainRow)} />
              {isExpanded && (
                <Box>
                  {item.pairOrders.map((pairOrder: any) => {
                    return (
                      <Box className={clsx(classes.expandedRow, classes.dataRow, classes.alignRight)}>
                        {pairOrder[name]}
                        <Typography className={classes.currencyLabel}>{pairOrder.time}</Typography>
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>
          )
        },
      },
      {
        name: 'actions',
        label: '',
        align: 'right',
        render: (item: any, name: string) => {
          const isExpanded = expandedPairs.includes(item.pairId)
          return (
            <Box>
              <Box className={clsx(classes.mainRow)} />
              {isExpanded && (
                <Box>
                  {item.pairOrders.map((pairOrder: any) => {
                    return (
                      <Box className={clsx(classes.expandedRow, classes.dataRow, classes.alignRight, classes.actions)}>
                        <FormGroup>
                          <Checkbox className={classes.checkbox} color="primary" icon={<UncheckedIcon />} />
                        </FormGroup>
                        <CloseIcon />
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>
          )
        },
      },
    ],
    [translate, expandedPairs, mergedOrders]
  )

  return <DataTable data={mergedOrders} columns={headers} loading={false} rowClassName={classes.openOrdersRow} />
}
