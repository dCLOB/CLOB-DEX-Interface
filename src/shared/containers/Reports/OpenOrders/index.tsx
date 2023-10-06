import { Box, Checkbox, FormGroup, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { CloseIcon, DropdownArrowIcon, ExpandCloseIcon, ExpandOpenIcon, UncheckedIcon } from 'icons'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import ContainedButton from 'shared/components/ContainedButton'
import { Dropdown } from 'shared/components/Dropdown'
import OutlinedButton from 'shared/components/OutlinedButton'
import { DataTable } from 'shared/components/Table'
import { useStyles } from './styles'

export const ReportsOpenOrders = (): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const [expandedPairs, setExpandedPairs] = useState<number[]>([])
  const [mergedOrders, setMergedOrders] = useState<any[]>([])

  const initalFilters = useMemo(
    () => ({
      filter: 0,
      symbol: '',
      side: '',
    }),
    []
  )

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
        filled: 1,
        notionalValue: 19728.6,
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
        filled: 0.5,
        notionalValue: 19728.6,
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
        filled: 2,
        notionalValue: 19728.6,
      },
    ],
    []
  )

  const [filters, setFilters] = useState<typeof initalFilters>(initalFilters)

  const filterOptions = useMemo(
    () => [
      {
        label: translate('page.reports.open.orders.all'),
        value: 0,
      },
    ],
    [translate]
  )

  const symbolOptions = useMemo(
    () => [
      {
        label: translate('page.reports.open.orders.all'),
        value: '',
      },
    ],
    [translate]
  )

  const sideOptions = useMemo(
    () => [
      {
        label: translate('page.reports.open.orders.all'),
        value: '',
      },
      {
        label: translate('page.reports.open.orders.side.buy'),
        value: 'buy',
      },
      {
        label: translate('page.reports.open.orders.side.sell'),
        value: 'sell',
      },
    ],
    [translate]
  )

  const handleResetFilters = useCallback(() => setFilters(initalFilters), [initalFilters])
  const handleChangeFilters = useCallback(
    (name: string, value: string | number) => setFilters((prev) => ({ ...prev, [name]: value })),
    []
  )

  useEffect(() => {
    const pairsIds = orders.map((order) => order.pairId)
    const uniqPairsIds = [...new Set(pairsIds)]

    const uniqPairs = uniqPairsIds.map((pairId) => {
      const pairOrders = orders.filter((order) => order.pairId === pairId)
      const pairTotal = pairOrders.reduce(
        (acc, cur) => ({ amount: acc.amount + cur.amount, filled: acc.filled + cur.filled }),
        { amount: 0, filled: 0 }
      )

      return {
        pairId,
        pair: pairOrders[0].pair,
        amount: pairTotal.amount,
        filled: pairTotal.filled,
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
        label: translate('page.reports.open.orders.table.pair'),
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
        label: translate('page.reports.open.orders.table.type'),
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
        label: translate('page.reports.open.orders.table.amount'),
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
        label: translate('page.reports.open.orders.table.price'),
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
        name: 'side',
        label: translate('page.reports.open.orders.table.side'),
        sortable: true,
        render: (item: any, name: string) => {
          const isExpanded = expandedPairs.includes(item.pairId)
          return (
            <Box>
              <Box className={clsx(classes.mainRow)} />
              {isExpanded && (
                <Box>
                  {item.pairOrders.map((pairOrder: any) => {
                    return (
                      <Box
                        className={clsx(classes.expandedRow, {
                          [classes.greenColor]: pairOrder[name] === 'buy',
                          [classes.redColor]: pairOrder[name] === 'sell',
                        })}
                      >
                        {pairOrder[name]}
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
        name: 'filled',
        label: translate('page.reports.open.orders.table.filled'),
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
        name: 'notionalValue',
        label: translate('page.reports.open.orders.table.notional.value'),
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
                        {pairOrder.amount * pairOrder.price}
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
        label: (
          <Box className={clsx(classes.dataRow, classes.alignRight, classes.actions)}>
            <FormGroup>
              <Checkbox className={classes.checkbox} color="primary" icon={<UncheckedIcon />} />
            </FormGroup>
            <CloseIcon />
          </Box>
        ),
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

  return (
    <Box className={classes.reportsTab}>
      <Typography variant="h1" className={classes.title}>
        {translate('page.reports.open.orders.title')}
      </Typography>
      <Box className={classes.filtersRow}>
        <Box className={classes.filters}>
          <Dropdown
            controlClassName={classes.dropdownControl}
            options={filterOptions}
            IconComponent={DropdownArrowIcon}
            label={translate('page.reports.open.orders.filter')}
            value={filters.filter}
            onChange={(e) => handleChangeFilters('filter', e.target.value as number)}
          />
          <Dropdown
            controlClassName={classes.dropdownControl}
            options={symbolOptions}
            IconComponent={DropdownArrowIcon}
            label={translate('page.reports.open.orders.symbol')}
            value={filters.symbol}
            onChange={(e) => handleChangeFilters('symbol', e.target.value as string)}
          />
          <Dropdown
            controlClassName={classes.dropdownControl}
            options={sideOptions}
            IconComponent={DropdownArrowIcon}
            label={translate('page.reports.open.orders.side')}
            value={filters.side}
            onChange={(e) => handleChangeFilters('side', e.target.value as string)}
          />
          <OutlinedButton className={classes.resetButton} onClick={handleResetFilters}>
            {translate('page.reports.open.orders.reset')}
          </OutlinedButton>
        </Box>
        <ContainedButton className={classes.cancelAllButton}>
          {translate('page.reports.open.orders.cancel.all')}
        </ContainedButton>
      </Box>
      <DataTable data={mergedOrders} columns={headers} loading={false} rowClassName={classes.openOrdersRow} />
    </Box>
  )
}
