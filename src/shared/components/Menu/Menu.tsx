import React, { PropsWithChildren, SyntheticEvent } from 'react'
import { Menu as MenuMui } from '@material-ui/core'

import { useStyles } from './styles'
import clsx from 'clsx'

interface MenuProps {
  align?: 'left' | 'right'
  component?: React.ReactElement
  withUploadBtn?: boolean
  src?: string
  menuOpen?: boolean
  openProfile?: () => void
  paperClassName?: string
}

const Menu = (props: PropsWithChildren<MenuProps>): JSX.Element => {
  const classes = useStyles()
  const { children, align = 'left', component, openProfile, paperClassName } = props

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event: SyntheticEvent) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  let comp
  if (component) {
    comp = React.cloneElement(component, { onClick: handleClick })
  }

  return (
    <div className={classes.menuWrapper}>
      {comp}
      <MenuMui
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: align }}
        transformOrigin={{ vertical: -2, horizontal: align }}
        classes={{ paper: clsx(classes.paper, paperClassName), list: classes.list }}
        onClick={(e) => handleClose(e)}
        onClose={handleClose}
        onFocus={openProfile}
      >
        {children}
      </MenuMui>
    </div>
  )
}

Menu.defaultProps = {
  size: 'medium',
  align: 'right',
}

export default Menu
