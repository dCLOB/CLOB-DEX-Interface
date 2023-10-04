<template>
  <div class="order-books-item">
    <div class="order-books-price" :style="{color: history['taker_side'] === 'sell' ? '#EF4D60' : '#7DBD56'}"  v-text="Number(history.price).toFixed(2)"></div>
    <div class="order-books-amount primaryColor" v-text="Number(history.amount).toFixed(3)"></div>
    <div class="order-books-total primaryColor">{{tradeDate}}</div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
   name: "TradingHistoryMarket",
  props: {
    history: {
      default: () => []
    },
  },
  data() {
    return {
      price: 0,
      color: '',
      date: ''
    }
  },
  methods: {
    changeValue(OldVal, newVal) {
      let theme = localStorage.getItem('theme')

      if(OldVal < newVal) {
        this.color = '#56BD86'
      }else if (OldVal > newVal) {
        this.color = '#EF564D'
      }else {
        el.style.color = this.$vuetify.theme.dark ? "#fff" : "#111222";
      }
    },
    formatCompat(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      return hours + ":" + minutes + ":" + seconds;
    }
  },
  computed: {
    tradeDate: function () {
      return moment.utc(this.history.executed_at).format('HH:mm:ss')
    }
  },
  watch: {
    price(oldVal, newVal) {
      this.changeValue(oldVal, newVal)
    }
  },
  updated() {
     this.price = this.history.price
  }
}
</script>

<style scoped>
.order-books-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0px;
  width: 100%;
  background-position: right;
}
.order-books-amount{
  text-align: right;
}
.order-books-total {
  text-align: right;
}

</style>