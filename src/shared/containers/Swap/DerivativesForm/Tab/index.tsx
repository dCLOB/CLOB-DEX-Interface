import { Box, Divider, InputAdornment, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { BitcoinIcon, USDTIcon, WeUpIcon } from 'icons'
import React, { ChangeEvent, ReactNode, useCallback, useMemo, useState } from 'react'
import ContainedButton from 'shared/components/ContainedButton'
import { Input } from 'shared/components/Input'
import { useStyles } from './styles'

interface OrderFormTabProps {
  activeTabIndex: number
  activeFeeTabIndex: number
  translate: (id: string) => string
  onFeeTabClick: (index: number) => void
}

export const DerivativeFormTab = (props: OrderFormTabProps): JSX.Element => {
  const classes = useStyles()
  const { activeTabIndex, activeFeeTabIndex, onFeeTabClick, translate } = props

  const [price, setPrice] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [stopPrice, setStopPrice] = useState<string>('')
  const [leverage, setLeverage] = useState<string>('')

  const typeFee = useMemo(
    () => [
      {
        currency: 'WEUP',
        icon: <WeUpIcon className={classes.feeIcon} />,
      },
      {
        currency: 'BTC',
        icon: <BitcoinIcon className={classes.feeIcon} />,
      },
    ],
    [classes]
  )

  const isNumberValid = useCallback((price: string) => price.toString().match(/^[0-9][0-9]*[.]?[0-9]{0,18}$/gm), [])

  const handleChangePrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value && !isNumberValid(e.target.value)) return

      setPrice(e.target.value)
    },
    [isNumberValid]
  )

  const handleChangeStopPrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value && !isNumberValid(e.target.value)) return

      setStopPrice(e.target.value)
    },
    [isNumberValid]
  )

  const handleChangeAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value && !isNumberValid(e.target.value)) return

      setAmount(e.target.value)
    },
    [isNumberValid]
  )

  const handleChangeLeverage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value && !isNumberValid(e.target.value)) return

      setLeverage(e.target.value)
    },
    [isNumberValid]
  )

  const renderInput = useCallback(
    (
      value: string,
      onChange: (e: ChangeEvent<HTMLInputElement>) => void,
      inputPrefix: ReactNode,
      inputSufix: ReactNode
    ) => {
      return (
        <Input
          className={classes.input}
          value={value}
          onChange={onChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="body2" className={classes.inputCurrency}>
                  {inputPrefix}
                </Typography>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="body2" className={classes.inputCurrency}>
                  {inputSufix}
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      )
    },
    [classes]
  )

  const renderTabInputs = useCallback(() => {
    switch (activeTabIndex) {
      case 1:
        return (
          <>
            {renderInput(amount, handleChangeAmount, translate('page.swap.orderform.amount'), 'BTC')}
            <Box className={classes.priceRow}>
              <Typography variant="overline">{translate('page.swap.derivativeform.price')}</Typography>
              <Typography variant="overline">TSLA</Typography>
            </Box>
          </>
        )
      case 2:
        return (
          <>
            {renderInput(stopPrice, handleChangeStopPrice, translate('page.swap.orderform.stop'), 'USDT')}
            {renderInput(price, handleChangePrice, translate('page.swap.orderform.price'), 'USDT')}
            {renderInput(amount, handleChangeAmount, translate('page.swap.orderform.amount'), 'BTC')}
          </>
        )
      default:
        return (
          <>
            {renderInput(price, handleChangePrice, translate('page.swap.orderform.price'), 'USDT')}
            {renderInput(amount, handleChangeAmount, translate('page.swap.orderform.amount'), 'BTC')}
          </>
        )
    }
  }, [
    activeTabIndex,
    renderInput,
    translate,
    amount,
    price,
    stopPrice,
    handleChangeAmount,
    handleChangePrice,
    handleChangeStopPrice,
    classes,
  ])

  return (
    <Box>
      {renderTabInputs()}
      <Divider orientation="horizontal" component="div" className={classes.divider}>
        <Typography className={classes.dividerLabel} variant="overline">
          {translate('page.swap.derivetiveform.or')}
        </Typography>
      </Divider>
      {renderInput(leverage, handleChangeLeverage, translate('page.swap.orderform.leverage'), 'USDT')}
      <Box className={classes.footer}>
        <Box>
          <Typography variant="overline">{translate('page.swap.orderform.fee')}</Typography>
          <Box className={classes.feeTypes}>
            {typeFee.map((feeType, index) => {
              return (
                <Box
                  key={feeType.currency}
                  className={clsx(classes.feeButton, {
                    [classes.activeFeeButton]: index === activeFeeTabIndex,
                  })}
                  onClick={onFeeTabClick.bind(null, index)}
                >
                  {feeType.icon}
                  <Typography variant="h6">{feeType.currency}</Typography>
                </Box>
              )
            })}
          </Box>
        </Box>
        <Box className={classes.actions}>
          <ContainedButton className={classes.buyButton}>{translate('page.swap.orderform.buy')}</ContainedButton>
          <ContainedButton className={classes.sellButton}>{translate('page.swap.orderform.sell')}</ContainedButton>
        </Box>
        <Box className={classes.maxData}>
          <Box className={classes.maxValue}>
            <Typography variant="overline" className={classes.maxLabel}>
              {translate('page.swap.orderform.max')}
            </Typography>
            <Box className={classes.data}>
              <Typography variant="h6">536 625.22</Typography>
              <Typography variant="overline" className={classes.currency}>
                TSLA
              </Typography>
            </Box>
          </Box>
          <Box className={classes.maxValue}>
            <Typography variant="overline" className={classes.maxLabel}>
              {translate('page.swap.orderform.max')}
            </Typography>
            <Box className={classes.data}>
              <Typography variant="h6">536 625.22</Typography>
              <Typography variant="overline" className={classes.currency}>
                TSLA
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
