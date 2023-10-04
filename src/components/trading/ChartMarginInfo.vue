<template>
  <div class="chart-margin mainBorderColor">
    <div class="chart-margin-wrapper primary">
      <div class="chart-margin-data">
        <div class="chart-data-info">
          <h2 class="chart-data-title">{{ $t('tradingMarginData') }}</h2>
          <h3 class="chart-data-portfolio">{{ $t('tradingPortfolioLeverage') }}</h3>
          <h3 class="chart-margin-rate">{{ rate }}.0x</h3>
        </div>
        <div class="chart-data-progress">
          <v-progress-circular
            :rotate="360"
            :size="80"
            :width="16"
            :value="rateProcent"
            color="#56BD86"
          >
          </v-progress-circular>
        </div>
      </div>
      <div class="chart-margin-prices">
        <div class="chart-price-labels">
          <h3 class="chart-price-label">{{ $t('tradingMinMargin') }}</h3>
          <h3 class="chart-price-label">{{ $t('tradingEquity') }}</h3>
        </div>
        <div class="chart-prices">
          <p class="chart-price">36,625.00<span>{{currency}}</span></p>
          <p class="chart-price">36,625.00<span>{{currency}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartMarginInfo",
  props: ['quoteCurrency'],
  data() {
    return {
      interval: {},
      rate: 5,
      rateProcent: 0,
      currency: this.quoteCurrency
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.rate === this.rateProcent) {
        return false;
      }
      return (this.rateProcent = this.rate * 20);
    }, 1000);
  },
};
</script>

<style scoped>
.chart-margin {
  background-color: var(--v-primary-base) !important;
  border-bottom: 1px solid;
  border-color: var(--v-primary-base) !important;
}

.chart-margin-wrapper {
  padding: 20px 20px 22px 20px;
}

.chart-margin-data {
  display: flex;
  justify-content: space-between;
}

.chart-data-title {
  font-weight: bold;
  font-size: 16px;
  line-height: 150%;
  margin: 0;
}

.chart-data-portfolio {
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  text-decoration: underline;
  color: #a4a5af;
  margin: 16px 0 0 0;
}

.chart-margin-rate {
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
  color: #56bd86;
  margin: 0;
}

.chart-data-progress {
  margin: 6px 0 0 0;
}

.chart-margin-prices {
  display: flex;
}
.chart-price-labels {
  width: 50%;
}
.chart-price-label {
  margin: 16px 0 0 0;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  color: #a4a5af;
  text-decoration: underline;
}
.chart-prices {
  width: 50%;
}
.chart-price {
  text-transform: uppercase;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
}

.chart-price span {
  display: block;
  margin: 0 0 0 4px;
  color: #a4a5af;
  font-size: inherit;
}
</style>