import { OrderBookTradeType } from 'store/reducers/orderbook/types'

const parseAccuracy = (value: number, accuracy: number) => {
  return +(Math.ceil(value / accuracy) * accuracy).toFixed(8)
}

export const calculateOrderbookSide = (orderbook: OrderBookTradeType[], priceAccuracy: number) => {
  const total: number[] = []

  const sortedOrders = orderbook.length
    ? orderbook.slice().sort((first, second) => {
        return +first.price - +second.price
      })
    : []

  const prices: any = {}

  sortedOrders.forEach(({ price, volume }) => {
    const agregatedPrice = parseAccuracy(price, priceAccuracy)
    const agregatedAmount = prices[agregatedPrice]

    prices[agregatedPrice] = agregatedAmount ? agregatedAmount + volume : volume
  })

  const mergedOrders: OrderBookTradeType[] = []

  for (const price in prices) {
    const volume = prices[price]

    mergedOrders.push({ volume, price: +price })
  }

  const res = mergedOrders.slice().sort((first, second) => {
    return +second.price - +first.price
  })

  const maxVolume = res.reduce((accumulator, currentValue, index) => {
    const newValue = +currentValue.volume * +currentValue.price
    total[index] = newValue

    return newValue > accumulator ? newValue : accumulator
  }, 0)

  const orders = res.map((order, index) => ({
    ...order,
    total: total[index],
    volumePercent: maxVolume ? total[index] / maxVolume : 0,
  }))

  return orders
}
