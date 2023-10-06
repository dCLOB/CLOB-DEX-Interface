import { Box, IconButton, InputAdornment, Typography, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import { decimalFormat } from 'helpers/decimal'
import { getTokenIcon } from 'helpers/getTokenIcon'
import { CloseIcon, DropdownArrowIcon, EmptyStarIcon, FavoriteIcon, SearchIcon, StarIcon, TeslaIcon } from 'icons'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { Input } from 'shared/components/Input'
import { DataTable } from 'shared/components/Table'
import { useStyles } from './styles'

type MarketPairType = {
  pair: string
  lastPrice: number
  volume: number
  change: number
}

interface MarketSelectorProps {
  isSpot: boolean
}

export const MarketSelector = (props: MarketSelectorProps): JSX.Element => {
  const { formatMessage } = useIntl()

  const { isSpot } = props

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const [marketSelectorShow, setMarketSelectorShow] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('')
  const [activeMarketPair, setActiveMarketPair] = useState<MarketPairType | undefined>()
  const theme = useTheme()
  const classes = useStyles(theme)

  const filterTabs = useMemo(
    () => [
      {
        key: 'all',
        label: <Typography variant="h6">{translate('page.swap.market.selector.all')}</Typography>,
        value: '',
      },
      {
        key: 'favorite',
        label: (
          <Box className={classes.favoriteTab}>
            {activeTab === 'favorite' ? <FavoriteIcon className={classes.tableStarIcon} /> : <StarIcon />}
            <Typography variant="h6" className={classes.tabText}>
              {translate('page.swap.market.selector.favorites')}
            </Typography>
            ,
          </Box>
        ),
        value: 'favorite',
      },
    ],
    [translate, activeTab, classes]
  )

  const renderOption = useCallback(() => {
    console.log(isSpot)
    return (
      <Box className={classes.pairValue} display="flex" alignItems="center">
        <Box className={classes.tokenIcon}>{getTokenIcon(activeMarketPair?.pair.split('/')[0] || '')}</Box>
        <Box className={classes.marketPairData}>
          <Typography variant="subtitle1">{activeMarketPair?.pair}</Typography>
          {!isSpot && (
            <Typography variant="overline" className={classes.statusLabel}>
              Perpetual
            </Typography>
          )}
        </Box>
      </Box>
    )
  }, [activeMarketPair, classes, isSpot])

  const pairs = useMemo(
    () => [
      {
        pair: 'AAPL/USDT',
        lastPrice: 144.98,
        volume: 1_000_003.22,
        change: -4.3,
      },
      {
        pair: 'AMZN/USDT',
        lastPrice: 3_630.32,
        volume: 642_003.5,
        change: 1.13,
        isFavorite: true,
      },
      {
        pair: 'DXLN/USDT',
        lastPrice: 100,
        volume: 202_655.32,
        change: 99.99,
      },
      {
        pair: 'FB/USDT',
        lastPrice: 373.28,
        volume: 455_247.99,
        change: -1.22,
        isFavorite: true,
      },
      {
        pair: 'TSLA/USDT',
        lastPrice: 657.62,
        volume: 536_625.22,
        change: 2.21,
      },
    ],
    []
  )

  useEffect(() => {
    setActiveMarketPair(pairs[0])
  }, [pairs])

  const toggleMarketSelector = useCallback(() => setMarketSelectorShow((prev) => !prev), [])
  const handleSetActiveTab = useCallback((newTab: string) => setActiveTab(newTab), [])

  const columns = useMemo(
    () => [
      {
        name: 'pair',
        label: translate('page.reports.open.orders.table.pair'),
        sortable: true,
        className: classes.firstColumn,
        render: (item: any, name: string) => {
          return (
            <Box className={classes.pairColumn}>
              {item.isFavorite ? (
                <FavoriteIcon className={classes.tableStarIcon} />
              ) : (
                <EmptyStarIcon className={classes.emptyStar} />
              )}
              <Box className={classes.tableTokenIcon}>{getTokenIcon(item[name].split('/')[0])}</Box>
              <Box className={classes.pairValue}>{item[name]}</Box>
            </Box>
          )
        },
      },
      {
        name: 'lastPrice',
        label: translate('page.swap.market.selector.last.price'),
        sortable: true,
        align: 'right',
        render: (item: any, name: string) => {
          const isPositive = item.change > 0

          return (
            <Box className={classes.alignRight}>
              <Box
                className={clsx(classes.pairValue, {
                  [classes.contrastGreenColor]: isPositive,
                  [classes.contrastRedColor]: !isPositive,
                })}
              >
                {decimalFormat(item[name], 2, ' ')}
              </Box>
            </Box>
          )
        },
      },
      {
        name: 'volume',
        label: translate('page.swap.market.selector.volume'),
        sortable: true,
        align: 'right',
        render: (item: any, name: string) => {
          return (
            <Box className={classes.alignRight}>
              <Box className={classes.pairValue}>{decimalFormat(item[name], 2, ' ')}</Box>
            </Box>
          )
        },
      },
      {
        name: 'change',
        label: translate('page.swap.market.selector.change24h'),
        sortable: true,
        align: 'right',
        className: classes.lastColumn,
        render: (item: any, name: string) => {
          const isPositive = item.change > 0

          return (
            <Box className={classes.alignRight}>
              <Box
                className={clsx(classes.pairValue, {
                  [classes.contrastGreenColor]: isPositive,
                  [classes.contrastRedColor]: !isPositive,
                })}
              >
                {`${isPositive ? '+' : ''}${item[name]}%`}
              </Box>
            </Box>
          )
        },
      },
    ],
    []
  )

  return (
    <Box className={classes.marketSelectorWrapper}>
      <Box className={classes.dropdownControl} onClick={toggleMarketSelector}>
        {renderOption()}
        <DropdownArrowIcon className={clsx({ [classes.marketSelectorArrow]: marketSelectorShow })} />
      </Box>
      {marketSelectorShow && (
        <Box className={classes.marketSelectorModal}>
          <Box className={classes.header}>
            <Input
              className={classes.input}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box className={classes.filterTabs}>
              {filterTabs.map((tab) => {
                return (
                  <Box
                    key={tab.key}
                    className={clsx(classes.tabItem, {
                      [classes.activeTab]: tab.value === activeTab,
                    })}
                    onClick={handleSetActiveTab.bind(null, tab.value)}
                  >
                    {tab.label}
                  </Box>
                )
              })}
            </Box>
          </Box>
          <DataTable data={pairs} columns={columns} loading={false} rowClassName={classes.tableRow} />
        </Box>
      )}
      {marketSelectorShow && <Box onClick={toggleMarketSelector} className={classes.marketSelectorCover} />}
    </Box>
  )
}
