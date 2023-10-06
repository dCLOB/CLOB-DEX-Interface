import { Box, Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { getTokenIcon } from 'helpers/getTokenIcon'
import { CloseIcon } from 'icons'
import React, { useState } from 'react'
import { useDialogStyles } from '../dialogStyles'
import { useStyles } from './styles'
import { decimalFormat } from 'helpers/decimal'
import OutlinedButton from 'shared/components/OutlinedButton'
import ContainedButton from 'shared/components/ContainedButton'
import { Link } from 'react-router-dom'
import { Input } from 'shared/components/Input'

interface DepositDialogProps {
  open: boolean
  handleClose: () => void
  translate: (id: string) => string
}

export const DepositDialog = (props: DepositDialogProps): JSX.Element => {
  const dialogClasses = useDialogStyles()
  const classes = useStyles()

  const { open, handleClose, translate } = props

  const [usdtApprove, setUsdtApprove] = useState<boolean>(false)
  const [drdxApprove, setDrdxApprove] = useState<boolean>(false)

  const [usdtDeposit, setUsdtDeposit] = useState<string>('')
  const [drdxDeposit, setDrdxDeposit] = useState<string>('')

  const handleAppoveUsdt = () => setUsdtApprove((prev) => !prev)
  const handleAppoveDrdx = () => setDrdxApprove((prev) => !prev)

  const handleChangeUsdt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsdtDeposit(e.target.value)
  }
  const handleChangeDrdx = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDrdxDeposit(e.target.value)
  }

  return (
    <Dialog open={open} onClose={handleClose} className={dialogClasses.dialog}>
      <DialogTitle className={clsx(dialogClasses.title, classes.title)}>
        <Typography variant="h4">{translate('page.dialog.deposit.title')}</Typography>
        <IconButton className={dialogClasses.closeIcon} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={clsx(dialogClasses.dialogContent, classes.content)}>
        <Box className={classes.currencyBlock}>
          <Box className={classes.balanceRow}>
            <Box className={classes.inline}>
              {getTokenIcon('USDT')}
              <Typography variant="overline" className={classes.greyLabel}>
                USDT {translate('page.dialog.deposit.balance')}
              </Typography>
            </Box>
            <Box className={classes.inline}>
              <Typography>{decimalFormat(36_625.0, 2, ' ')}</Typography>
              <Typography variant="overline" className={classes.greyLabel}>
                USDT
              </Typography>
            </Box>
          </Box>
          {!usdtApprove && (
            <>
              <OutlinedButton className={classes.approveButton} onClick={handleAppoveUsdt}>
                {translate('page.dialog.deposit.approve')} USDT
              </OutlinedButton>
              <Typography variant="body1" className={classes.depositDescriptionMessage}>
                {translate('page.dialog.deposit.approve.message')}
              </Typography>
            </>
          )}
          {usdtApprove && (
            <>
              <Input
                className={clsx(classes.amountInput, {
                  [classes.filledInput]: !!usdtDeposit,
                })}
                value={usdtDeposit}
                onChange={handleChangeUsdt}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" className={classes.inputCurrency}>
                        USDT
                      </Typography>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="body2" className={classes.inputCurrency}>
                        {translate('page.dialog.deposit.amount')}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="body1" className={classes.depositDescriptionMessage}>
                {translate('page.dialog.deposit.amount.enter')}
              </Typography>
            </>
          )}
        </Box>
        <Box className={classes.currencyBlock}>
          <Box className={classes.balanceRow}>
            <Box className={classes.inline}>
              {getTokenIcon('DRDX')}
              <Typography variant="overline" className={classes.greyLabel}>
                DRDX {translate('page.dialog.deposit.balance')}
              </Typography>
            </Box>
            <Box className={classes.inline}>
              <Typography>{decimalFormat(200.0, 2, ' ')}</Typography>
              <Typography variant="overline" className={classes.greyLabel}>
                DRDX
              </Typography>
            </Box>
          </Box>
          {!drdxApprove && (
            <OutlinedButton className={classes.approveButton} onClick={handleAppoveDrdx}>
              {translate('page.dialog.deposit.approve')} DRDX
            </OutlinedButton>
          )}
          {drdxApprove && (
            <Input
              className={clsx(classes.amountInput, {
                [classes.filledInput]: !!usdtDeposit,
              })}
              value={drdxDeposit}
              onChange={handleChangeDrdx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="body2" className={classes.inputCurrency}>
                      DRDX
                    </Typography>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="body2" className={classes.inputCurrency}>
                      {translate('page.dialog.deposit.amount')}
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          )}
          <Box className={classes.depositDescription}>
            {!drdxApprove && (
              <Typography variant="body1" className={classes.depositDescriptionMessage}>
                {translate('page.dialog.deposit.approve.message')}
              </Typography>
            )}
            {drdxApprove && (
              <Typography variant="body1" className={classes.depositDescriptionMessage}>
                {translate('page.dialog.deposit.amount.enter')}
              </Typography>
            )}
            <Link to="#" className={classes.link}>
              <Typography className={classes.linkLabel} variant="h6">
                {translate('page.dialog.deposit.buy')} DRDX
              </Typography>
            </Link>
          </Box>
        </Box>
        <ContainedButton className={classes.depositButton}>{translate('page.dialog.deposit.button')}</ContainedButton>
      </DialogContent>
    </Dialog>
  )
}
