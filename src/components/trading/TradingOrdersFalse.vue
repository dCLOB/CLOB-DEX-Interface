<template>
  <div class="order-books-wrap">
    <!-- <div class="order-books-item" :style="{backgroundSize: Number((100 - 100/length*elIndex)) + '% 100%'}"> -->
    <div class="order-books-item" :style="{backgroundSize: '0% 100%'}">
      <div class="order-books-price" v-text="Number(order[0]).toFixed(2)"></div>
      <div class="order-books-amount primaryColor" v-text="Number(order[1]).toFixed(3)"></div>
      <div class="order-books-total primaryColor" v-text="Number((order[0] * order[1])).toFixed(2)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TradingOrdersFalse",
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
  background-image: linear-gradient(var(--v-orderBackgroundLineRed-base),var(--v-orderBackgroundLineRed-base));
  background-position: right;
}
.order-books-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}
.order-books-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}
.order-books-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0px;
  width: 100%;
}

</style>