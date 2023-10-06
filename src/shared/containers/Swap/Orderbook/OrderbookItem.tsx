import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useStyles } from './orderbookitemSlyles'

interface Order {
  volume: number
  price: number
  total: number
  volumePercent: number
}

interface OrderbookItemProps {
  orders: Order[]
  backgroundColor: string
  scrollRequired?: boolean
  priceDecimals?: number
  quantityDecimals?: number
}

export const OrderbookItem = (props: OrderbookItemProps): JSX.Element => {
  const { orders, backgroundColor, scrollRequired, priceDecimals, quantityDecimals } = props
  const classes = useStyles()
  const [ref, setRef] = useState<any>()

  useEffect(() => {
    if (scrollRequired && ref) {
      ref.scrollIntoView()
    }
  }, [scrollRequired, ref])

  return (
    <Box className={classes.orderbookItem}>
      {orders.map((order, index) => {
        return (
          <Box
            className={classes.orderItem}
            key={order.price}
            itemProp={'data-item-id'}
            data-column-price={`${order.price}`}
          >
            <Typography
              ref={(newRef) => (index === orders.length - 1 ? setRef(newRef) : null)}
              className={classes.orderPrice}
              variant="h6"
            >
              {order.price.toFixed(priceDecimals || 2)}
            </Typography>
            <Typography variant="h6" className={classes.orderAmount}>
              {order.volume.toFixed(quantityDecimals || 2)}
            </Typography>
            <Typography variant="h6" className={classes.orderTotal}>
              {order.total.toFixed(priceDecimals || 2)}
            </Typography>
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: `${order.volumePercent * 100}%`,
                height: '100%',
                backgroundColor,
                zIndex: 0,
              }}
            >
              &nbsp;
            </div>
          </Box>
        )
      })}
    </Box>
  )
}
