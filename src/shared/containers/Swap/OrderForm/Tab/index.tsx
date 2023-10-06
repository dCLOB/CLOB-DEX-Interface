import { Box, InputAdornment, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { USDTIcon, WeUpIcon } from 'icons'
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

export const OrderFormTab = (props: OrderFormTabProps): JSX.Element => {
  const classes = useStyles()
  const { activeTabIndex, activeFeeTabIndex, onFeeTabClick, translate } = props

  const [price, setPrice] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [stopPrice, setStopPrice] = useState<string>('')

  const typeFee = useMemo(
    () => [
      {
        currency: 'WEUP',
        icon: <WeUpIcon className={classes.feeIcon} />,
      },
      {
        currency: 'USDT',
        icon: <USDTIcon className={classes.feeIcon} />,
      },
    ],
    [classes]
  )

  const isPriceValid = useCallback((price: string) => price.toString().match(/^[0-9][0-9]*[.]?[0-9]{0,18}$/gm), [])

  const handleChangePrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value && !isPriceValid(e.target.value)) return

      setPrice(e.target.value)
    },
    [isPriceValid]
  )

  const handleChangeStopPrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value && !isPriceValid(e.target.value)) return

      setStopPrice(e.target.value)
    },
    [isPriceValid]
  )

  const handleChangeAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value && !isPriceValid(e.target.value)) return

      setAmount(e.target.value)
    },
    [isPriceValid]
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
        return renderInput(amount, handleChangeAmount, translate('page.swap.orderform.amount'), 'BTC')
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
  ])

  return (
    <Box>
      {renderTabInputs()}
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
