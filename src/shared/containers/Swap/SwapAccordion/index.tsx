import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { Positions } from './components/Positions'
import { useStyles } from './styles'
import { OpenOrders } from './components/OpenOrders/index'
import { History } from './components/History'
import { CustomAccordion } from 'shared/components/Accordion'

interface SwapAccordionProps {
  isSpot: boolean
}

export const SwapAccordion = (props: SwapAccordionProps): JSX.Element => {
  const classes = useStyles()
  const { formatMessage } = useIntl()

  const { isSpot } = props

  const translate = useCallback((id: string) => formatMessage({ id }), [formatMessage])

  const derivativesItems = [
    {
      key: 'position',
      title: translate('page.swap.positions.title'),
      details: <Positions />,
    },
  ]

  const commonItems = [
    {
      key: 'orders',
      title: translate('page.swap.open.orders.title'),
      details: <OpenOrders />,
    },
    {
      key: 'history',
      title: translate('page.swap.history.title'),
      details: <History />,
    },
  ]

  return <CustomAccordion accordionItems={isSpot ? commonItems : derivativesItems.concat(commonItems)} />
}
