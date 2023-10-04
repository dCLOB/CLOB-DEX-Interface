<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>


<script>

export default {
  name: 'App',

  computed: {
    alert() {
      return this.$store.state.alert
    },
  },
  watch: {
    $route() {
      // clear alert on location change
      this.$store.dispatch('alert/clear');
    },
  },
}
</script>

<style>

.v-application .row {
  margin: 0;
}

.v-application .v-application--wrap .textSecondaryColor {
  color: var(--v-textSecondaryColor-base) !important;
  background-color: initial !important;
  border-color: initial !important;
}

.v-application .v-dialog .textSecondaryColor {
  color: var(--v-textSecondaryColor-base) !important;
  background-color: initial !important;
  border-color: initial !important;
}

.v-application .v-application--wrap .textSecondaryColor:hover {
  color: var(--v-textMainColor-base) !important;
}

.v-application .v-dialog a.textSecondaryColor:hover {
  color: var(--v-textMainColor-base) !important;
}

body {
  background: #111223;
}

.v-application .theme--dark.v-input--switch .v-input--switch__thumb {
  background-image: url("../src/assets/img/black-switch.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: transparent;
}

.v-application .theme--light.v-input--switch .v-input--switch__thumb {
  background-image: url("../src/assets/img/white-switch.svg") !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: 50% 50% !important;
  background-color: transparent !important;
}

.theme--dark.v-input--switch .v-input--switch__thumb {
  background: #ffb200;
}

.v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple, .v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--switch__thumb {
  background: #ffb200;
  box-shadow: none !important;
}

.v-application--is-ltr .v-messages {
  display: none;
}

.v-application .v-input--switch__track.primary--text {
  color: var(--v-switchColor-base) !important;
  caret-color: var(--v-switchColor-base) !important;
  opacity: 1 !important;
  width: 42px !important;
  height: 24px !important;
  border-radius: 12px !important;
}

.v-application .v-input--switch__track {
  color: var(--v-switchColor-base) !important;
  caret-color: var(--v-switchColor-base) !important;
  opacity: 1 !important;
  width: 42px !important;
  height: 24px !important;
  border-radius: 12px !important;
}

.v-application--is-ltr .v-input--switch .v-input--selection-controls__ripple {
  display: none;
}

.v-input--switch .v-input--switch__thumb {
  top: calc(50% - 4px);
  left: 3px;
  height: 18px;
  width: 18px;
}

.v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple, .v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--switch__thumb {
  transform: translate(17px) !important;
}

.v-application .v-application--wrap .textMainColor {
  background-color: transparent !important;
  border-color: transparent !important;
}

.v-application .v-dialog .textMainColor {
  background-color: transparent !important;
  border-color: transparent !important;
}

.v-application.theme--dark .textMainColor {
  color: #fff;
}

.v-application.theme--light .textMainColor {
  color: #111223;
}

.v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--selection-controls__ripple, .v-application--is-ltr .v-input--switch.v-input--is-dirty .v-input--switch__thumb {
  transform: translate(21px) !important;
}

.v-application .v-application--wrap .mainBorderColor {
  background-color: transparent !important;
}

.v-application .v-dialog .primary {
  background-color: var(--v-primary-base) !important;
}

.v-application .v-dialog .walletHoverBGColor:hover {
  background-color: var(--v-walletHoverBGColor-base) !important;
}

.v-application .v-dialog .btn-cancel:hover {
  background-color: var(--v-btnCancelHover-base) !important;
}


.v-application .v-application--wrap .warning {
  background: var(--v-marketHeaderButton-base) !important;
}

.v-application .order-books-item .primaryColor {
  color: var(--v-primaryColor-base) !important;
  background: none !important;

}

.v-application .v-dialog .btn-try:hover {
  background-color: var(--v-btnTryHover-base) !important;
}


.v-application .chart-controls-btn.switchColor:hover {
  background-color: var(--v-assetsBtnsHover-base) !important;
}


.v-application .order-form-list .order-form-item span {
  background: none !important;
  color: var(--v-primaryColor-base) !important;
}
.v-application .sellBuyInput {
  transition: all 0.2s;
  background: var(--v-marketHeaderButton-base) !important;
  color: var(--v-revertPrimary-base) !important;
}

.v-application .max-blocks-item.item-amount {
  color: var(--v-textFormMaxColor-base) !important;
  background: none !important;
}
.v-application .order-form-background-line {
  background: var(--v-marketHeaderButton-base) !important;

}
.v-application .order-form-list .order-form-item {
  background: var(--v-marketHeaderButton-base) !important;
  border-color: var(--v-orderFormProgressItemBg-base) !important;

}
.v-application .order-form-list .order-form-item.active {
  border-color: var(--v-orderFormProgressItemBorderActive-base) !important;

}
.v-application .order-form-list .order-form-item.active.old {
  border-color: var(--v-orderFormProgressItemBg-base) !important;
  background: var(--v-orderFormProgressItemBorderActive-base) !important;

}
.v-application  .tab_sellbuy.active .tablinks{
  color: var(--v-textMainColor-base) !important;

}

.v-application  .marketPrice-label{
  color: var(--v-textSecondaryColor-base) !important;

}
.v-application  .sellBuyInput:focus{
  background: var(--v-inputBg-base) !important;
  border-color: #A4A5AF !important;
}


.v-application .isEmpty .sellBuyInput{
  border-color: #EF4D60 !important;
}


.v-application  .order-books-isAskFalse-items{
  color: var(--v-textSecondaryColor-base) !important;

}
.v-application .order-books-isAskFalse-items.selected,
.v-application .order-books-isAskFalse-items:hover {

  background: var(--v-marketHeaderButton-base) !important;
  border-radius: 4px !important;
  color: var(--v-textMainColor-base) !important;

}
.v-application .market-price-value-default{
  color: var(--v-blackwhite-base) !important;
}

.v-application .v-expansion-panel:before {
  box-shadow: none;
}

.v-application .market-main-content {
  border-color: var(--v-mainBorderColor-base) !important;
}

/*.v-application .v-expansion-panels {*/
/*  border-right: 1px solid;*/
/*  border-color: var(--v-mainBorderColor-base) !important;*/
/*  border-radius: 0;*/
/*}*/

.v-application .header.primaryBg {
  border-bottom: 1px solid;
  border-color: var(--v-mainBorderColor-base) !important;
}

.wallet-link {
  text-decoration: none;
}

.v-overlay--active .v-overlay__scrim {
  opacity: 0.8 !important;
  background-color: #090A12 !important;
  border-color: #090A12 !important;
}

.v-expansion-panels {
  display: block !important;
}

.v-application--is-ltr .v-input--selection-controls__input {
  margin: 0 !important;
}

.v-input__slot {
  margin: 0 !important;
}

.v-application .v-input--switch__track {
  right: 0;
  top: 0;
}

.v-input--switch:not(.v-input--switch--flat):not(.v-input--switch--inset) .v-input--switch__thumb {
  box-shadow: none !important;
}

.v-application .v-input--switch .v-input--switch__thumb {
  top: calc(50% - 9px);
}

.v-application .v-input--selection-controls {
  padding-top: 0;
}

.justify-center {
  width: 100%;
}

.holder-table {
  padding: 12px 0;
  border-bottom: 1px solid;
  margin-bottom: 15px;
  border-color: var(--v-mainBorderColor-base) !important;
}

.v-application .v-application--wrap .textSecondaryColor:hover{
  color: var(--v-textSecondaryColor-base) !important;
}

.v-application ol, .v-application ul {
  padding-left: 0 !important;
}
.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile)>.v-expansion-panel--active+.v-expansion-panel {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.header select {
  color: #fff;
  margin-left: 20px;
}

.header select option {
  color: #111222;
}

</style>