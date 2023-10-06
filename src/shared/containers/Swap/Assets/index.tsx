import { Box, Typography } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import ContainedButton from 'shared/components/ContainedButton'
import OutlinedButton from 'shared/components/OutlinedButton'
import { DepositDialog } from 'shared/dialogs/Deposit'
import { useStyles } from './styles'

export const Assets = (): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const [showDepositDialog, setShowDepositDialog] = useState<boolean>(false)

  const toggleShowDepositDialog = useCallback(() => setShowDepositDialog((prev) => !prev), [])

  return (
    <Box className={classes.container}>
      <Box className={classes.blockHeader}>
        <Typography variant="subtitle1" id="orderboot-container-title">
          {translate('page.swap.assets.title')}
        </Typography>
        <ContainedButton className={classes.buyButton}>{translate('page.swap.assets.buy')} DXLN</ContainedButton>
      </Box>
      <Box className={classes.rowData}>
        <Typography variant="overline" className={classes.label}>
          {translate('page.swap.assets.trade.balance')}
        </Typography>
        <Box className={classes.data}>
          <Typography variant="body2">36 625.00</Typography>
          <Typography variant="overline" className={classes.currency}>
            USDT
          </Typography>
        </Box>
      </Box>
      <Box className={classes.rowData}>
        <Typography variant="overline" className={classes.label}>
          {translate('page.swap.assets.unrealized')} PNL
        </Typography>
        <Box className={classes.data}>
          <Typography variant="body2">213.00</Typography>
          <Typography variant="overline" className={classes.currency}>
            USDT
          </Typography>
        </Box>
      </Box>
      <Box className={classes.rowData}>
        <Typography variant="overline" className={classes.label}>
          {translate('page.swap.assets.token')}
        </Typography>
        <Box className={classes.data}>
          <Typography variant="body2">5.00</Typography>
          <Typography variant="overline" className={classes.currency}>
            DXLN
          </Typography>
        </Box>
      </Box>
      <Box className={classes.footer}>
        <OutlinedButton className={classes.footerButton} onClick={toggleShowDepositDialog}>
          {translate('page.swap.assets.button.deposit')}
        </OutlinedButton>
        <OutlinedButton className={classes.footerButton}>
          {translate('page.swap.assets.button.withdraw')}
        </OutlinedButton>
      </Box>
      <DepositDialog open={showDepositDialog} handleClose={toggleShowDepositDialog} translate={translate} />
    </Box>
  )
}
