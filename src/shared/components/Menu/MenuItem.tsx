import React, { PropsWithChildren } from 'react'

import { MenuItem as MenuItemMui } from '@material-ui/core'

import { useStyles } from './styles'

interface MenuItemProps {
  onClick?: () => void
  customClasses?: any
}

// eslint-disable-next-line react/display-name
const MenuItem = React.forwardRef<HTMLLIElement, PropsWithChildren<MenuItemProps>>(
  (props: PropsWithChildren<MenuItemProps>, ref) => {
    const { onClick, children, customClasses } = props
    const classes = useStyles()

    return (
      <MenuItemMui
        innerRef={ref}
        onClick={onClick}
        classes={{ root: classes.menuItemRoot, selected: classes.menuItemSelected, ...customClasses }}
      >
        <div className={classes.menuItemText}>{children}</div>
      </MenuItemMui>
    )
  }
)

export default MenuItem
