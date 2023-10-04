<template>
  <v-row justify="center">
    <v-expansion-panels multiple>
      <v-expansion-panel v-for="(item, i) in tradingTableInfo" :key="i">
        <v-expansion-panel-header
          >{{ item }}
          <!-- <sup v-if="item === 'Positions'" style="margin-left: 4px">{{counters.tradingTableInfoHistory}}</sup> -->
          <sup v-if="item === 'Open Orders'" style="margin-left: 4px">{{counters.tradingTableInfoOpenOrders}}</sup>
          <sup v-if="item === 'History'" style="margin-left: 4px">{{counters.tradingTableInfoPositions}}</sup>
          </v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <!-- <div v-if="item == 'Positions'" class="positions-table">
            <div v-if="tradingTableInfoPositions.length" class="holder-table">
              <ul class="table-head">
                <li class="pair">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('pair')}}</span>
                  </p>
                </li>
                <li class="amount">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('amount')}}</span>
                  </p>
                </li>
                <li class="base-price">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{ $t('accordeonOptionsBasePrice') }}</span>
                  </p>
                </li>
                <li class="liq-price">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{ $t('accordeonOptionsLiqPrice') }}</span>
                  </p>
                </li>
                <li class="p-l">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">P/L</span>
                  </p>
                </li>
                <li class="p-l-per">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">P/L%</span>
                  </p>
                </li>
                <li style="width: 10%; text-align: right">
                  <p>
                    <span class="textMainColor"></span>
                  </p>
                </li>
              </ul>
            </div>
            <div v-if="tradingTableInfoPositions.length">
              <TradingPositionsItems
                  v-for="(positionsItems, index) in tradingTableInfoPositions"
                  :key="index"
                  :positionsItems="positionsItems"
              />
            </div>
            <div v-if="!tradingTableInfoPositions.length" class="holder-not-logged-text">
              <p class="secondary-text">{{$t('emptyPositionsText')}}</p>
            </div>
          </div> -->
          <div v-if="item == 'Open Orders'" class="open-orders-table">
            <div v-if="tradingTableInfoOpenOrders.length" class="holder-table">
              <ul class="table-head">
                <!-- 1 -->
                <li class="pair">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('pair')}}</span>
                  </p>
                </li>
                <!-- 2 -->
                <li class="type">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('type')}}</span>
                  </p>
                </li>
                <!-- 3 -->
                <li class="amount">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('amount')}}</span>
                  </p>
                </li>
                <!-- 4 -->
                <li class="price">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('priceTextPrice')}}</span>
                  </p>
                </li>
                <!-- 5 -->
                <li class="placed">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('accordeonOptionsPlaced')}}</span>
                  </p>
                </li>
                <!-- 6 -->
                <li :style="{'visibility': isCheckedOrders ? 'visible' : 'hidden'}" class="holder-checkbox" style="width: 5%;">
                  <label class="orange-checkbox-container">
                    <input
                        type="checkbox"
                        :checked="isCheckedOrders"
                        @click="handleCheckedOrders"
                    />
                    <span class="checkmark"></span>
                  </label>
                </li>
                <!-- 7 -->
                <li :style="{'visibility': isCheckedOrders ? 'visible' : 'hidden'}" style="width: 5%; text-align: right" @click="onDeleteTradingOrder(tradingTableInfoOpenOrders)">
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
                </li>
              </ul>
            </div>
            <div v-if="tradingTableInfoOpenOrders.length">
                <TradingOpenOrdersItemsList
                    v-for="(openOrdersItemsList, index) in tradingTableInfoOpenOrders"
                    :key="index"
                    :openOrdersItemsList="openOrdersItemsList"
                    :isCheckedOrders="isCheckedOrders"
                    @onDeleteTradingOrder="onDeleteTradingOrder"
                />
            </div>
            <div v-if="!tradingTableInfoOpenOrders.length" class="holder-not-logged-text">
              <p class="secondary-text">{{$t('emptyOpenOrdersText')}}</p>
            </div>
          </div>
          <div v-if="item == 'History'" class="history-table">
            <div v-if="tradingTableInfoHistory.length" class="holder-table">
              <ul class="table-head">
                <!-- 1 -->
                <li class="pair">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('pair')}}</span>
                  </p>
                </li>
                <!-- 2 -->
                <li class="type">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('type')}}</span>
                  </p>
                </li>
                <!-- 3 -->
                <li class="amount">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('amount')}}</span>
                  </p>
                </li>
                <!-- 4 -->
                <li class="price">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('priceTextPrice')}}</span>
                  </p>
                </li>
                <!-- 5 -->
                <!-- <li class="a_e_price">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('accordeonAverageExecutionPrice')}}</span>
                  </p>
                </li> -->
                <!-- 6 -->
                <li class="status">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('status')}}</span>
                  </p>
                </li>
                <!-- 7 -->
                <li class="inactive">
                  <p>
                    <i class="arrow up"></i>
                    <i style="opacity: 0.5" class="arrow down"></i>
                    <span class="textMainColor">{{$t('inactive')}}</span>
                  </p>
                </li>
                <!-- 8 -->
                <!--                <li class="holder-checkbox">-->
                <!--                  <label class="orange-checkbox-container">-->
                <!--                    <input-->
                <!--                      type="checkbox"-->
                <!--                      :checked="isCheckedHistory"-->
                <!--                      @click="handleCheckedHistory"-->
                <!--                    />-->
                <!--                    <span class="checkmark"></span>-->
                <!--                  </label>-->
                <!--                </li>-->
              </ul>
            </div>
            <div v-if="tradingTableInfoHistory.length">
              <TradingHistoryItems
                  v-for="(historyItems, index) in tradingTableInfoHistory"
                  :key="index"
                  :historyItems="historyItems"
                  :isCheckedHistory="isCheckedHistory"
              />
            </div>
            <div v-if="!tradingTableInfoHistory.length" class="holder-not-logged-text">
              <p class="secondary-text">{{$t('emptyHystoryText')}}</p>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <InfoDialog
      ref="infoDialog"
      :title="infoDialogData.dialogTitle"
      :text="infoDialogData.dialogText"
      :confirmBtnText="infoDialogData.confirmBtnText"
      :cancelBtnText="infoDialogData.cancelBtnText"
      @onConfirm="deleteOrder"/>
  </v-row>
</template>

<script>
// import TradingPositionsItems from "../../components/trading/TradingPositionsItems.vue";
import TradingOpenOrdersItemsList from "./TradingOpenOrdersItemsList.vue";
import TradingHistoryItems from "../../components/trading/TradingHistoryItems.vue";
import { mapActions, mapGetters } from 'vuex';
import InfoDialog from '../popups/InfoDialog.vue';
import moment from 'moment';
import store from '../../store'

export default {
  name: "TradingAccordeon",
  components: {
    // TradingPositionsItems,
    TradingOpenOrdersItemsList,
    TradingHistoryItems,
    InfoDialog
  },
  data() {
    return {
      isCheckedOrders: false,
      isCheckedHistory: false,
      tradingTableInfo: ["Open Orders", "History"],
      // tradingTableInfo: ["Positions", "Open Orders", "History"],
      tradingTableInfoHistory: [],
      tradingTableInfoOpenOrders: [],
      tradingTableInfoPositions: [],
      infoDialogData: {},
      counters: {}
    };
  },
  computed: {
    logged() {
      return this.$store.state.authentication.status.loggedIn
    },
    ...mapGetters('wallets', ['getMetamaskWallet', 'getBinanceWallet']),
  },

  mounted() {
    this.getTablesData();
  },
     
  methods: {
    ...mapActions({
        getOrders: 'orders/getOrders',
        acctrades: 'markets/getAccountTrades',
        deleteOrderById: 'orders/deleteOrderById'
    }),

    handleCheckedOrders() {
      this.isCheckedOrders = !this.isCheckedOrders;
    },

    handleCheckedHistory() {
      this.isCheckedHistory = !this.isCheckedHistory;
    },

    parseOrdersForTable(data) {

      let orders = [];

      !this.getMetamaskWallet.networkName && this.getMetamaskWallet.disconected ? orders = [] : orders = data.data.orders

       orders.forEach((item) => {

         const order = {
            id: item.id,
            pair: item.market_id,
            type: item.type,
            amount: item.amount,
            price: item.price,
            a_e_price: 'n/a',
            status: item.status,
            base_price: 'n/a',
            liq_price: "n/a",
            inactive: 'n/a',
            p_l: 'n/a',
            p_l_per: 'n/a',
            placed: moment(item.created_at).format('DD/MM/YYYY'),
            time: moment(item.created_at).format('HH: MM'),
            isGrow: item.side
         }

         if (item.status === 'pending') {
          this.counters.tradingTableInfoOpenOrders = data.data.count;
          this.tradingTableInfoOpenOrders.push({
              orderName: "TSLA/USDC", //???
              orderData:[order]
            });
         }

         if (item.status !== 'pending' || item.status === 'canceled') {
          this.counters.tradingTableInfoHistory = data.data.count;



          this.acctrades({market_id:'TSLA-USDC'}).then(res => {
            res = res.data.data.trades
            const orderTrades = res.filter(e => e.taker_order_id === order.id)
            const executedAt = new Date(Math.max(...orderTrades.map(e => new Date(e.executed_at))))
            order.executed_at = moment(executedAt).format('DD/MM/YYYY HH: MM')
            this.tradingTableInfoHistory.push(order);
          })
         }

         if (item.status === 'full_filled' || item.status === 'partial_filled') {
           this.counters.tradingTableInfoPositions = data.data.count;
           this.tradingTableInfoPositions.push(order);
         }
       });
    },

    getTablesData() {
      this.tradingTableInfoHistory = [],
      this.tradingTableInfoOpenOrders = [],
      this.tradingTableInfoPositions = [],
      // this.getOrders({marketID:'HOT-DAI', status: 'pending,partial_filled,full_filled,canceled'}).then((data) => {
      //   this.parseOrdersForTable(data);
      // });

      this.getOrders({market_id:'TSLA-USDC', status: 'pending'}).then((data) => {
        this.parseOrdersForTable(data);
      });

      this.getOrders({market_id:'TSLA-USDC', status: 'partial_filled'}).then((data) => {
        this.parseOrdersForTable(data);
      });

      this.getOrders({market_id:'TSLA-USDC', status: 'full_filled'}).then((data) => {
        this.parseOrdersForTable(data);
      });

      this.getOrders({market_id:'TSLA-USDC', status: 'canceled'}).then((data) => {
        this.parseOrdersForTable(data);
      });
    },

    onDeleteTradingOrder(order) {

      this.infoDialogData = {
        dialogTitle:`Cancel ${order.length ? 'Orders' : 'Order'}`,
        dialogText: `Are you sure you want to cancel ${order.length ? order.length +' Orders' : 'Order'}?`,
        confirmBtnText: 'Yes',
        cancelBtnText: 'No'
      }

      this.$refs.infoDialog.showDialog(order);
    },

    deleteOrder(order) {
      if (order.length) {
        order.forEach((item, index) => {
          this.deleteOrderById(item.orderData[0].id).then(() => {
            if (index+1 === order.length) {
              this.getTablesData();
            }
          });
        });
      } else {
      this.deleteOrderById(order.id).then(() => this.getTablesData()); //add logic for dialog close
      }      
    }
  }
};
</script>

<style lang="scss">

.v-expansion-panel-header {
  color: var(--v-revertPrimary-base);
  font-weight: 700;
  padding: 21px 20px;
  border-bottom: 1px solid var(--v-mainBorderColor-base);
  border-top: 1px solid var(--v-mainBorderColor-base);
}
.v-expansion-panel--active+.v-expansion-panel, .v-expansion-panel--active:not(:first-child) {
  margin-top: 0;
}

.v-expansion-panel-header--active {
  border-top: 1px solid var(--v-mainBorderColor-base);
  border-bottom: 1px solid var(--v-mainBorderColor-base);
}

.v-expansion-panel-header {
  border-bottom: none !important;
}

.v-expansion-panel:not(:first-child):after {
  display: none !important;
}

.theme--dark.v-expansion-panels .v-expansion-panel {
  background-color: inherit;
}

.v-expansion-panel-header--active {
  border-top: 1px solid var(--v-mainBorderColor-base) !important;
  border-bottom: 1px solid var(--v-mainBorderColor-base) !important;
}

.theme--dark .v-expansion-panels .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon {
  color: var(--v-textAccentColor-base);
}
.theme--light .v-expansion-panels .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon {
  color: var(--v-textAccentColor-base);
}

.v-expansion-panel--active>.v-expansion-panel-header--active .v-expansion-panel-header__icon:not(.v-expansion-panel-header__icon--disable-rotate) .v-icon {
  color: var(--v-revertPrimary-base);
}

.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile)>.v-expansion-panel--active {
  border-radius: 0px !important;
}

.v-expansion-panels {
  border-radius: 0px !important;
}

.arrow {
  border: solid var(--v-revertPrimary-base);
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 2px;
  opacity: 0.5;
  cursor: pointer;
}

.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.positions-table {
  p {
    padding-left: 13px;
  }
  .up {
    top: 4px;
    left: 0;
  }
  .down {
    bottom: 4px;
    left: 0;
  }
  .pair {
    width: 10%;
    span {
      margin-left: 15px;
    }
  }
  .amount {
    text-align: right;
    width: 16%;
  }
  .base-price {
    text-align: right;
    width: 16%;
  }
  .liq-price {
    text-align: right;
    width: 16%;
  }
  .p-l {
    text-align: right;
    width: 16%;
  }
  .p-l-per {
    text-align: right;
    width: 16%;
  }
}

.open-orders-table {
  p {
    padding-left: 13px;
  }
  .up {
    top: 4px;
    left: 0;
  }
  .down {
    bottom: 4px;
    left: 0;
  }
  .pair {
    width: 10%;
  }
  .amount {
    text-align: right;
    width: 20%;
  }
  .type {
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
}

.history-table {
  p {
    padding-left: 13px;
  }
  .up {
    top: 4px;
    left: 0;
  }
  .down {
    bottom: 4px;
    left: 0;
  }
  .pair {
    width: 13%;
  }
  .amount {
    text-align: right;
    width: 13%;
  }
  .type {
    text-align: right;
    width: 13%;
  }
  .price {
    text-align: right;
    width: 13%;
  }
  .a_e_price {
    text-align: right;
    width: 13%;
  }
  .status {
    text-align: right;
    width: 13%;
  }
  .inactive {
    text-align: right;
  }

  .table-head {
    justify-content: space-between;
  }

  .table-head li {
    width: 100%;
    max-width: 226px;
  }
  .holder-checkbox {
    display: none;
  }

  .table-body {
    width: 100%;
    flex-direction: row;
  }

  .table-body .list {
    width: 100%;
    justify-content: space-between;
  }


  .list div {
    width: 100%;
    max-width: 226px;
  }

  li.inactive {
    padding: 0 40px 0 0;
  }

  li.type {
    width: 100%;
    max-width: 50px;
  }
  .table-body .type {
    width: 100%;
    max-width: 70px;
  }
}

.table-head {
  display: flex;
  justify-content: center;
  list-style: none;
  font-size: 14px;
  font-weight: 700;
  padding-left: 0;
  li:first-child {
    justify-content: flex-start;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  p {
    position: relative;
    margin: 0;
    i {
      position: absolute;
    }
  }
}
.holder-checkbox {
  width: 9%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  height: 13px;
  width: 13px;
  border: 1px solid var(--v-textMainColor-base);
  background-size: 100%;
  border-radius: 3px;
}

.orange-checkbox-container input:checked ~ .checkmark {
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

.orange-checkbox-container input:checked ~ .checkmark {
  background-color: #fff;
  border: none;
}

.orange-checkbox-container .checkmark:after {
  background-image: url('../../assets/img/checkbox-arrow.svg');
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  display: none;
  width: 105%;
  height: 105%;
  content: "";
}

// end checkbox
.secondary-text {
    color: var(--v-textSecondaryColor-base)
}
.holder-not-logged-text {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    margin-top: 40px;
}

.v-expansion-panels .v-icon.v-icon {
  justify-content: flex-end;
  left: 5px;
}


</style>