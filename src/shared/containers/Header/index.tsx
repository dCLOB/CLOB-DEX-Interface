import { Box, Switch, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { SUPPOTRED_LANG } from 'constants/locale'
import routes from 'constants/routes'
import { getLanguageName } from 'helpers/getLangyageByCode'
import { CheckIcon, DropdownArrowIcon, EverWalletIcon, LogoIcon } from 'icons'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Dropdown } from 'shared/components/Dropdown'
import { OptionType } from 'shared/components/Dropdown/types'
import { EverWalletActions } from 'store/reducers/everwallet'
import { ThemeActions } from 'store/reducers/theme'
import { walletAddressSelector, walletBalanceSelector } from 'store/selectors/everwallet'
import { languageSelector } from 'store/selectors/lang'
import { themeSelector } from 'store/selectors/theme'
import ContainedButton from '../../components/ContainedButton'
import { Menu } from '../../components/Menu'
import { useStyles } from './styles'
import { CustomThemeContext } from '../../../App'
import { getLink } from 'helpers/getLink'

export const Header = (): JSX.Element => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { formatMessage } = useIntl()
  const location = useLocation()

  const lang = useSelector(languageSelector)
  const address = useSelector(walletAddressSelector)
  const balance = useSelector(walletBalanceSelector)
  const theme = useSelector(themeSelector)

  const themeContext = useContext(CustomThemeContext)

  const [tradeMenuOpen, setTradeMenuOpen] = useState<boolean>(false)

  const handleConnect = () => {
    dispatch(EverWalletActions.connectWalletRequest())
  }

  const translate = React.useCallback((id: string) => formatMessage({ id }), [formatMessage])
  const handleTradeBlur = useCallback(() => setTradeMenuOpen((prev) => !prev), [])

  const renderHeaderLinks = useCallback(() => {
    return (
      <Box className={classes.linksContainer}>
        <Menu
          menuOpen={tradeMenuOpen}
          openProfile={handleTradeBlur}
          component={
            <Box
              className={clsx({
                [classes.link]: true,
                [classes.activeLink]: location.pathname.includes('trade'),
              })}
            >
              <Typography variant="subtitle1">{translate('page.header.links.trading')}</Typography>
              <DropdownArrowIcon
                className={clsx(classes.menuIcon, {
                  [classes.openMenuIcon]: tradeMenuOpen,
                })}
              />
            </Box>
          }
        >
          <Box className={classes.tradeMenuContent}>
            <Link to={getLink(routes.ROUTE_DERIVATIVES)} className={classes.tradeMenuItem}>
              <Box className={classes.activetradeLinkIcon}>
                {location.pathname.includes(routes.ROUTE_DERIVATIVES) && <CheckIcon />}
              </Box>
              <Typography
                className={clsx(classes.tradeMenuItemLabel, {
                  [classes.tradeMenuActiveItem]: location.pathname.includes(routes.ROUTE_DERIVATIVES),
                })}
              >
                {translate('page.header.trade.derivarives')}
              </Typography>
            </Link>
            <Link to={getLink(routes.ROUTE_SPOT)} className={classes.tradeMenuItem}>
              <Box className={classes.activetradeLinkIcon}>
                {location.pathname.includes(routes.ROUTE_SPOT) && <CheckIcon />}
              </Box>
              <Typography
                className={clsx(classes.tradeMenuItemLabel, {
                  [classes.tradeMenuActiveItem]: location.pathname.includes(routes.ROUTE_SPOT),
                })}
              >
                {translate('page.header.trade.spot')}
              </Typography>
            </Link>
          </Box>
        </Menu>
        <Link
          to={routes.ROUTE_REPORTS}
          className={clsx({
            [classes.link]: true,
            [classes.activeLink]: location.pathname.includes(routes.ROUTE_REPORTS),
          })}
        >
          <Typography variant="subtitle1">{translate('page.header.links.reports')}</Typography>
        </Link>
      </Box>
    )
  }, [classes, location, translate, tradeMenuOpen, handleTradeBlur])

  const renderMenu = useCallback(() => {
    const cutAddress = `${address.slice(0, 5)}..${address.slice(-4)}`

    return (
      <Box className={classes.menu}>
        <Menu
          component={
            <ContainedButton className={classes.menuButton}>
              <Box className={classes.walletDataWrapper}>
                <EverWalletIcon />
                <Box className={classes.walletData}>
                  <Typography variant="overline">{cutAddress}</Typography>
                  <Typography variant="body2" className={classes.balanceLabel}>
                    {balance.toFixed(2)} EVER
                  </Typography>
                </Box>
              </Box>
              <DropdownArrowIcon />
            </ContainedButton>
          }
        ></Menu>
      </Box>
    )
  }, [address, classes, balance])

  const langOptions: OptionType[] = SUPPOTRED_LANG.map((code) => ({ label: getLanguageName(code), value: code }))

  const handleChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    themeContext.setTheme(e.target.checked ? 'light' : 'dark')
    dispatch(ThemeActions.changeTheme({ theme: e.target.checked ? 'light' : 'dark' }))
  }

  return (
    <Box className={classes.header}>
      <LogoIcon />
      <Box className={classes.actionBlock}>
        {renderHeaderLinks()}
        <Dropdown value={lang} options={langOptions} IconComponent={DropdownArrowIcon} />
        <Switch onChange={handleChangeTheme} className={classes.switch} checked={theme === 'light'} />
        {!address && (
          <ContainedButton className={classes.connectButton} onClick={handleConnect}>
            {translate('page.header.connect')}
          </ContainedButton>
        )}
        {address && renderMenu()}
      </Box>
    </Box>
  )
}
