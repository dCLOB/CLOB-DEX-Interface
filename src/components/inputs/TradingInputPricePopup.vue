<template>
  <div class="main_info_sell">
    <div class="price_butsell">
      <div>{{ $t('amount') }}</div>
    </div>
    <input :id="inputId" name="price"
           class="sellBuyInput sellInputPriceLimit js-pending-input"
           :class="{'disabled-input': inputReadOnly}"
           type="number" autocomplete="off" :value="modelValue" @input="change" :readonly="inputReadOnly"/>
    <span>{{quoteCurrency}}</span>
  </div>
</template>

<script>
export default {
  emits:['update:modelValue'],
  name: "TradingInputPricePopup",
  props: {
    quoteCurrency: String,
    modelValue: String,
    inputReadOnly: Boolean,
    inputId: String,
  },
 methods: {
   change(event) {
     let inputValue = Number(event.target.value)
     this.$emit('update:modelValue', inputValue)
   }
 }
}
</script>

<style scoped>

.v-dialog .sellBuyInput {
  max-width: 100%;
}

.disabled-input {
  opacity: 0.2;
}
</style>