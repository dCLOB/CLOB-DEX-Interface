<script src="../../../../../../Downloads/mirumir-js/javaScript/script.js"></script>
<template>
  <div>
    <p class="main_info_sell">
      <b class="amount_sell_buy">{{ $t('size') }}</b>
      <input :id="inputId" name="amount"
             class="sellBuyInput sellBuyInputAmount sellInputAmountLimit js-pending-input success-state" autocomplete="off" min="0" max="99999999999999"
             type="number" :value="modelValue" @input="change"/>
      <span>{{baseCurrency}}</span>
    </p>
    <!-- <p class="main_info_sell_text">Please, set the Size of your Order.</p> -->
    <!-- <p class="main_info_sell_text failure">
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2L7.99995 7.99995M7.99995 7.99995L13.9999 2M7.99995 7.99995L14 13.9998M7.99995 7.99995L2.0001 13.9998" stroke="#EF564D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Insufficient funds.
    </p> -->
    <p class="main_info_sell_text">
      Please, set parameters of your Order.
    </p>
    <!-- <p class="main_info_sell_text success-state">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7.5L6 12.5L15 3.5" stroke="#7DBD56" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Size confirmed.
    </p> -->
  </div>
</template>

<script>
export default {
  name: "TradingInputAmount",
  emits:['update:modelValue'],
  props: {
    baseCurrency: String,
    inputId: String,
    modelValue: String,
    inputCurrentName: String
  },
  methods:{
    change(event) {
      let inputValue = event.target.value.toString()
      this.$emit('update:modelValue', inputValue)
    }
  }

}
</script>

<style scoped>
.main_info_sell_text {
  display: flex;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 0;
}
.main_info_sell_text svg {
  margin-right: 5px;
}
.failure {
  color: #EF564D;
}

.success-state {
  color: #7DBD56;
}

.v-application .failure:focus {
  border-color: #EF564D !important;
}

.v-application .success-state:focus {
  border-color: #56BD86 !important;
}

</style>