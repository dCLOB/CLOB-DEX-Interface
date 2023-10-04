<template>
  <div>
    <div class="table-body">
      <div class="list">
        <div class="pair">
          <span :style="positionsItems.isGrow === 'sell' ? 'border-left: 4px solid #EF564D' : 'border-left: 4px solid #56BD86;'">{{
            positionsItems.pair
          }}</span>
        </div>
        <div class="amount">
          <span>{{ positionsItems.amount }}</span>
          <span class="secondary-text">&nbsp; {{positionsItems.pair.split('-')[0]}}</span>
        </div>
        <div class="base-price">
          <span>{{ positionsItems.base_price }}</span>
          <span class="secondary-text">&nbsp; {{positionsItems.pair.split('-')[1]}}</span>
        </div>
        <div class="liq-price">
          <span>{{ positionsItems.liq_price }}</span>
        </div>
        <div class="p-l">
          <span :style="isGrow ? 'color: #56BD86;' : 'color: #EF564D'">{{ positionsItems.p_l }}</span>
          <span class="secondary-text">&nbsp; {{positionsItems.pair.split('-')[1]}}</span>
        </div>
        <div class="p-l-per">
          <span :style="isGrow ? 'color: #56BD86;' : 'color: #EF564D'">{{ positionsItems.p_l_per }}</span>
        </div>
        <div style="width: 10%; text-align: right">
            <button>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.25 2.25L7.99995 7.99995M7.99995 7.99995L13.7499 2.25M7.99995 7.99995L13.75 13.7498M7.99995 7.99995L2.2501 13.7498" stroke="#A4A5AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TradingPositionsItems",
        props: {
            positionsItems: {
                type: Object
            },
            index: {
                type: Number
            }
        },
        data() {
            return {
                isGrow: true,
                bgColor: 'background-color: #EF564D',
            }
        },
    }
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
  span {
        display: inline-block;
        padding-left: 4px;
        margin-left: 0;
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
// rectangle
.rectangle::before {
  content: "";
  display: inline-block;
  margin-right: 4px;
  height: 21px;
  width: 4px;
}
// end rectangle
.secondary-text {
    color: var(--v-textSecondaryColor-base)
}
</style>