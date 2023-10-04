<template>
    <div>
        <div  class="table-body">
            <div class="list">
                <div class="pair">
                    <span :style="historyItems.isGrow ? 'border-left: 4px solid #56BD86;' : 'border-left: 4px solid #EF564D'">{{historyItems.pair}}</span>
                </div>
                <div class="type">
                    <span>{{historyItems.type}}</span>
                </div>
                <div class="amount">
                    <span>{{historyItems.amount}}</span>
                    <span class="secondary-text">&nbsp; {{historyItems.pair.split('-')[0]}}</span>
                </div>
                <div class="price">
                    <span>{{historyItems.price}}</span>
                    <span class="secondary-text">&nbsp; {{historyItems.pair.split('-')[1]}}</span>
                </div>
                <!-- <div class="a_e_price">
                    <span>{{historyItems.a_e_price}}</span>
                    <span class="secondary-text">&nbsp; {{historyItems.pair.split('-')[1]}}</span>
                </div> -->
                <div class="status">
                    <span>{{orderStatuses[historyItems.status]}}</span>
                </div>
                <div class="inactive">
                    <span>{{historyItems.executed_at}}</span>
                    <!-- <span>{{historyItems.inactive}}</span> -->
                    <!-- <span class="secondary-text">{{ historyItems.time }}</span> -->
                </div>
                <div class="holder-checkbox">
                    <label class="orange-checkbox-container">
                        <input type="checkbox" :checked="isCheckedHistory" />
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { orderStatuses } from '../../core-entities';
    export default {
        name: "TradingHistoryItems",
        props: {
            historyItems: {
                type: Object
            },
            index: {
                type: Number
            },
            isCheckedHistory: {
                type: Boolean
            }
        },

        data() {
            return {
                orderStatuses
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
    width: 13%;
    span {
        display: inline-block;
        padding-left: 4px;
    }
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
.status{
    text-align: right;
    width: 13%;
}
.inactive {
    text-align: right;
    width: 13%;
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
  border-radius: 3px;
  position: relative;
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

// end checkbox
.secondary-text {
    color: var(--v-textSecondaryColor-base)
}
</style>