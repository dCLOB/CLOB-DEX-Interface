<template>
  <!-- <div class="order-books-item" :style="{backgroundSize: Number(100/length*elIndex + 100/length) + '% 100%'}"> -->
  <div class="order-books-item" :style="{backgroundSize: '0% 100%'}">
    <div class="order-books-price" v-text="Number(order[0]).toFixed(2)"></div>
    <div class="order-books-amount primaryColor" v-text="Number(order[1]).toFixed(3)"></div>
    <div class="order-books-total primaryColor" v-text="Number((order[0] * order[1])).toFixed(2)"></div>
  </div>
</template>

<script>
export default {
  name: "TradingOrders",
  props: {
    order: {
      type: Array,
      default: () => []
    },
    length: {
      type: Number,
      default: () => 0
    },
    elIndex: {
      type: Number,
      default: () => 0
    }
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
  background-image: linear-gradient(var(--v-orderBackgroundLineGreen-base),var(--v-orderBackgroundLineGreen-base));
  background-position: right;
}

</style>