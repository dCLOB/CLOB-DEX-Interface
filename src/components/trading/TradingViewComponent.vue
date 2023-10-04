<template>
  <div className="kline">
    <div id="tv_chart_container"></div>
  </div>
</template>

<script>
// import {apiGet, apiGetNew} from "@/api/tradingview-api";
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

import {DataFeed, widget as TvWidget} from "tradingview-api";
import {ws} from "@/utils/socket";

const supported_resolutions = [
  "1",
  "5",
  "15",
  "30",
  "60",
  "240",
  "D",
  "W",
  "M",
];
/**
 * @key Server 端定义字段
 * @value value 对应 supported_resolutions
 */
// 1min, 5min, 15min, 30min, 60min, 4hour, 1day, 1mon, 1week, 1year
const intervalMap = {
  "1min": "1",
  "5min": "5",
  "15min": "15",
  "30min": "30",
  "60min": "60",
  "4hour": "240",
  "1day": "D",
  "1week": "W",
  "1mon": "M",
};

const intervalValueMap = {
  "1min": 60000,
  "5min": 5*60000,
  "15min": 15*60000,
  "30min": 30*60000,
  "60min": 60*60000,
  "4hour": 240*60000,
  "1day": 24*60*60000,
  "1week": 7*24*60*60000,
  "1mon": 30*7*24*60*60000,
};

const intervalValueMarketMap = {
  "1": 60,
  "5": 5*60,
  "15": 15*60,
  "30": 30*60,
  "60": 60*60,
  "240": 240*60,
  "D": 24*60*60,
  "1D": 24*60*60,
  "W": 7*24*60*60,
  "M": 30*7*24*60*60,
};

export default {
  name: "KLineWidget",
  props: {
    symbolInfo: Object,
  },
  data() {
    return {
      theme: this.$vuetify.theme.dark,
      symbol: 'TSLA/USDС',
      interval: "1min",
      connection: null,
      widget: null,
      lastKline: null,
      lastCandle: null,
      datafeed: new DataFeed({
        getBars: (params) => this.getBars(params),
        fetchResolveSymbol: () => this.resolveSymbol(),
        fetchConfiguration: () => {
          return new Promise((resolve) => {
            resolve({
              supported_resolutions: supported_resolutions,
            });
          });
        },
      }),
    };
  },
  created() {
    this.getWsTrades();
  },

  mounted() {
    localStorage.setItem('symbol', this.symbol);
    this.initTradingView();
    this.setSymbol();
    // ws.initWebSocket();
    // this.subscribeKLine();
  },

  methods: {
    ...mapActions({
      getMarketsCandles: 'markets/getMarketsCandles'
    }),

    // subscribeKLine() {
    //   ws.subscribe(
    //       "Market#TSLA-USDT",
    //       {type:"subscribe",channels:["Market#TSLA-USDT"]},
    //       (res) => {
    //         console.log(res)
    //         alert(res)
    //       }
    //   );
    // },
    getWsTrades(order) {
      if(order) {
        // if (order.type === 'newMarketTrade') {
        //   this.updateChart(order);
        // }
        this.updateChart(order);
      }
    },
    unsubscribeTrades() {
      ws.unsubscribe(`market.${symbol}.kline.${this.interval}`);
    },

    async updateChart(order) {
      order.trade = order
      // let executedTime = Date.parse(order.trade.executedAt)
      let executedTime = Date.parse(order.trade.executed_at)

      const time =  executedTime - (executedTime % intervalValueMap[this.interval]);

      if(this.lastCandle) {
        this.lastKline.time = this.lastCandle.time
      }

      if(this.lastKline) {
        if (time > this.lastKline.time) {
          this.datafeed.updateKLine(this.lastKline);

          this.lastKline.time = time;
          this.lastKline.open = Number(order.trade.price);
          this.lastKline.high = Number(order.trade.price);
          this.lastKline.low = Number(order.trade.price);
          this.lastKline.close = Number(order.trade.price);
          this.lastKline.volume = Number(order.trade.amount);
        } else {
          if (Number(order.trade.price) > this.lastKline.high) {
            this.lastKline.high = Number(order.trade.price);
          }
          if (Number(order.trade.price) < this.lastKline.low) {
            this.lastKline.low = Number(order.trade.price);
          }
          this.lastKline.close = Number(order.trade.price);
          this.lastKline.volume += Number(order.trade.amount);
        }
      }

      this.lastCandle = this.lastKline

      this.datafeed.updateKLine(this.lastKline);
    },

    resolveSymbol() {
      return new Promise((resolve) => {
        // const symbol = this.symbol;
        const symbol = 'TSLA/USDС';
        const info = this.symbolInfo;

        resolve({
          name: symbol.toLocaleUpperCase(),
          full_name: symbol.toLocaleUpperCase(),
          description: symbol.toLocaleUpperCase(),
          type: symbol,
          session: "24x7",
          exchange: "Deridex",
          listed_exchange: symbol,
          // listed_exchange: 'TSLA/USDT' ,
          timezone: "Asia/Shanghai",
          format: "price",
          pricescale: Math.pow(10, info["price-precision"]),
          minmov: 1,
          volume_precision: info["value-precision"],
          has_intraday: true,
          supported_resolutions: supported_resolutions,
        });
      });
    },

    async getBars(params) {
      const symbol = this.symbol;
      const size = window.innerWidth;
      if (!params.firstDataRequest) {
        return {
          bars: [],
          meta: {
            noData: true,
          },
        };
      }

      if (params.resolution !== intervalMap[this.interval]) {
        for (let key in intervalMap) {
          if (intervalMap[key] === params.resolution) {
            this.interval = key;
          }
        }
      }
      

      const marketData = await this.getMarketsCandles({
        market_id:'TSLA-USDC',
        params: {
          from: params.from,
          granularity: intervalValueMarketMap[params.resolution],
          to: params.to
        }
      });

      // old charts logic do not delete!
      const list = [];
      marketData.data.forEach((item, i) => {
        list.push({
          ...item, ...{time: item.time * 1000}
        });
      });

      list.sort((l, r) => (l.time > r.time ? 1 : -1));

      this.lastKline = list[0]
      return {
        bars: list,
        meta: {
          noData: !list.length,
        },
      };
    },
    subscribeBars: (
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscribeUID,
    ) => {
      console.log(
          "[subscribeBars]: Method call with subscribeUID:",
          subscribeUID
      );
    },
    initTradingView() {
      const symbol = this.symbol;
      this.widget = new TvWidget({
        // debug: true,
        symbol: symbol.toLocaleUpperCase(),
        interval: intervalMap[this.interval],
        "toolbar_bg": "rgba(0, 0, 0, 1)",
        "enable_publishing": false,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "hideideas": true,
        "show_popup_button": true,
        'height': '1000px',
        container_id: "tv_chart_container",
        datafeed: this.datafeed,
        library_path: "/charting_library/",
        locale: this.$i18n.locale,
        theme: this.$vuetify.theme.dark ? 'dark' : 'light',
        timezone: "Asia/Shanghai",
        fullscreen: true,
        autosize: false,
        disabled_features: [],
        enabled_features: [
          "logo_without_link",
          "hide_left_toolbar_by_default",
          "adaptive_logo",
          "same_data_requery",
        ],
        studies_overrides: {
          "volume.volume.color.0": "#23383E",
          "volume.volume.color.1": "#422332",
          "volume.volume ma.color": "#422332",
          "bollinger bands.median.color": "#422332",
        },
        favorites: {
          intervals: ["15m", "1h", "4h", "1d", "1w"],
          chartTypes: ["Candles", "Line"]
        },
        hideSyMBOLsEARCH: true,
        drawings_access: {
          type: 'black',
          tools: [{
            name: "Regression Trend"
          }]
        },
        overrides: {
          "mainSeriesProperties.lineStyle.color": "#ffb200",
          "paneProperties.background": this.$vuetify.theme.dark ? "#16172e" : "#fff",
          // "paneProperties.vertGridProperties.color": "#20232B",
          // "paneProperties.horzGridProperties.color": "#20232B",
          // "scalesProperties.textColor": "#858495",
          "mainSeriesProperties.candleStyle.upColor": "#67CA9D",
          "mainSeriesProperties.candleStyle.downColor": "#F27870",
          "mainSeriesProperties.candleStyle.borderUpColor": "#67CA9D",
          "mainSeriesProperties.candleStyle.borderDownColor": "#F27870",
          "mainSeriesProperties.candleStyle.wickUpColor": "#67CA9D",
          "mainSeriesProperties.candleStyle.wickDownColor": "#F27870",
          "mainSeriesProperties.hollowCandleStyle.upColor": "#67CA9D",
          "mainSeriesProperties.hollowCandleStyle.downColor": "#F27870",
          // "mainSeriesProperties.haStyle.upColor": "#62B299",
          // "mainSeriesProperties.haStyle.downColor": "#EB5168",
          // "mainSeriesProperties.haStyle.borderUpColor": "#62B299",
          // "mainSeriesProperties.haStyle.borderDownColor": "#EB5168",
          // "mainSeriesProperties.barStyle.upColor": "#62B299",
          // "mainSeriesProperties.barStyle.downColor": "#EB5168",
          // "mainSeriesProperties.areaStyle.color1": "#EB5168",
          // "mainSeriesProperties.areaStyle.color2": "#EB5168",
          // "mainSeriesProperties.areaStyle.linecolor": "#EB5168",
          // "mainSeriesProperties.haStyle.wickColor": "#20232B",
          "mainSeriesProperties.lineStyle.linewidth": 1,
          "mainSeriesProperties.style": 2,
          "mainSeriesProperties.candleStyle.barColorsOnPrevClose": 1,
          "mainSeriesProperties.barStyle.barColorsOnPrevClose": 1,
          "mainSeriesProperties.haStyle.barColorsOnPrevClose": 1,
          'paneProperties.legendProperties.showLegend': true,
          'paneProperties.legendProperties.showSeriesOHLC': true,
          'paneProperties.legendProperties.showSeriesTitle': true,
          'paneProperties.legendProperties.showStudyArguments': true,
          'paneProperties.legendProperties.showStudyTitles': true,
          'paneProperties.legendProperties.showStudyValues': true,
          'paneProperties.legendProperties.showBarChange': true,
          'paneProperties.legendProperties.showOnlyPriceSource': true,
          'scalesProperties.fontSize': 12,


        }
      });
    },
    setSymbol(quoteCurrency, baseCurrency) {
      this.quoteCurrency = quoteCurrency;
      this.baseCurrency = baseCurrency;

      // localStorage.setItem('quoteCurrency', quoteCurrency);
      // localStorage.setItem('baseCurrency', baseCurrency);
      localStorage.setItem('quoteCurrency', 'USDC');
      localStorage.setItem('baseCurrency', 'TSLA');

      // this.widget?.setSymbol(symbol, intervalMap[this.interval], () => {
      //   console.log("------setSymbol---------", this.symbol);
      // });
    },
    updateTheme() {
      this.initTradingView();
      // this.$refs.tradingAccordeon.getTablesData();
    },
  }
};
</script>
<style scoped>

#tv_chart_container {
  height: 670px !important;
}

iframe {
  height: 670px !important;
}

</style>