<template>
  <div class="table-body">
    <div class="list">
      <div class="pair">
        <span :style='openOrdersItems.isGrow === "sell" ? "border-left: 4px solid #EF564D" : "border-left: 4px solid #56BD86;"'>{{ openOrdersItems.pair }}</span>
      </div>
      <div class="type">
        <span>{{ openOrdersItems.type }}</span>
      </div>
      <div class="amount">
        <span>{{ openOrdersItems.amount }}</span>
        <span class="secondary-text">&nbsp; {{openOrdersItems.pair.split('-')[0]}}</span>
      </div>
      <div class="price">
        <span>{{ openOrdersItems.price }}</span>
        <span class="secondary-text">&nbsp; {{openOrdersItems.pair.split('-')[1]}}</span>
      </div>
      <div class="placed">
        <span>{{ openOrdersItems.placed }}</span>
        <span class="secondary-text">&nbsp; {{ openOrdersItems.time }}</span>
      </div>
      <!-- <div class="holder-checkbox" style="width: 5%; text-align: right">
        <label class="orange-checkbox-container">
          <input type="checkbox" :checked="isCheckedOrders" />
          <span class="checkmark"></span>
        </label>
      </div> -->
      <div style="width: 5%; text-align: right">
        <button type="button" @click="onDeleteOrder(openOrdersItems)">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 2.25L7.99995 7.99995M7.99995 7.99995L13.7499 2.25M7.99995 7.99995L13.75 13.7498M7.99995 7.99995L2.2501 13.7498"
              stroke="#A4A5AF"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TradingOpenOrdersItems",
  props: {
    openOrdersItems: {
      type: Object,
    },
    index: {
      type: Number,
    },
    isCheckedOrders: {
        type: Boolean,
    }
  },
  data() {
      return {
        //   isCheckedOrders: isCheckedOrders
      }
  },
  // mounted() {
  //   console.log('item', this.openOrdersItems)
  // },
  methods: {
    onDeleteOrder(order) {
      this.$emit('onDeleteOrder', order);
    }
  }
};
</script>

<style lang="scss" scoped>
.table-body {
    display: flex;
    flex-direction: column;
    span {
        font-size: 14px;
    }
}
.list {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 12px;
}
.pair {
    width: 10%;
    padding-left: 40px;
    span {
        display: inline-block;
        padding-left: 4px;
    }
}
.type {
    text-align: right;
    width: 20%;
}
.amount {
    text-align: right;
    width: 20%;
}
.price {
    text-align: right;
    width: 20%;
}
.placed {
    text-align: right;
    width: 20%;
}
// checkbox
.orange-checkbox-container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.orange-checkbox-container input {
  display: none;
}
.checkmark {
  display: block;
  height: 14px;
  width: 14px;
  border: 1px solid var(--v-textMainColor-base);
  border-radius: 3px;
}
.orange-checkbox-container:hover input ~ .checkmark {
  background-color:var(--v-textAccentColor-base);
}
.orange-checkbox-container input:checked ~ .checkmark {
  background-color: #FFB000;
  border: none;
  border-radius: 3px;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.orange-checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.holder-checkbox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
// end checkbox
.secondary-text {
    color: var(--v-textSecondaryColor-base)
}
</style>
