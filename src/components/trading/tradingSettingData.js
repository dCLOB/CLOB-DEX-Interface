export default {
    currentCurrencyName: localStorage.getItem('tradingSongName'),
    requestInterval: null,
    showLimitBuyModal: false,
    showLimitSellModal: false,
    showMarketBuyModal: false,
    showMarketSellModal: false,
    showStopLimitBuyModal: false,
    showStopLimitSellModal: false,
    limitBuyValidFlag: false,
    limitSellValidFlag: false,
    marketBuyValidFlag: false,
    marketSellValidFlag: false,
    stopLimitBuyValidFlag: false,
    stopLimitSellValidFlag: false,
    limitBuyErrorFlag: false,
    limitSellErrorFlag: false,
    marketBuyErrorFlag: false,
    marketSellErrorFlag: false,
    stopLimitBuyErrorFlag: false,
    stopLimitSellErrorFlag: false,
    scrollSettings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false,
        swipeEasing: false
    },
    marketPrices: [],
    orderBookTrue: [],
    orderBookFalse: [],
    songHistory: [],
    errors: {},
    marketPricesBody: {
        favorite: false,
        searchedText: ""
    },
    songPrice: {
        lastPrice: '0',
        high24h: 0,
        low24h: 0,
        volume24h: 0,
        djookyVolume: 0
    },
    songOrders: {
        openOrders: [],
        twentyFourHOrder: []
    },
    marketPriceValue: '',
    totalBuyLimit: '',
    totalSellLimit: '',
    totalBuyMarket: '',
    totalSellMarket: '',
    totalBuyStopLimit: '',
    totalSellStopLimit: '',
    createBuyLimit: {
        amount: '0',
        expires: 0,
        price: '0',
        market_id: 'TSLA-USDC',
        side: '',
        order_type: ''
    },
    createBuyMarket: {
        amount: '0',
        expires: 0,
        price: '0',
        market_id: 'TSLA-USDC',
        side: '',
        order_type: ''
    },
    createBuyStopLimit: {
        amount: '0',
        expires: 0,
        price: '0',
        market_id: 'TSLA-USDC',
        side: '',
        order_type: ''
    },
    toggleForms: 'limit',
}