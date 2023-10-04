<template>
    <div>
        <div @click="openOrdersItem" class="holder-open-orders" :class="{active: isOpenOrdersItems}">
            <div class="holder-svg">
                <svg v-if="isOpenOrdersItems" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 8H5.5M4.25 14.25H11.75C13.1307 14.25 14.25 13.1307 14.25 11.75V4.25C14.25 2.86929 13.1307 1.75 11.75 1.75H4.25C2.86929 1.75 1.75 2.86929 1.75 4.25V11.75C1.75 13.1307 2.86929 14.25 4.25 14.25Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-if="!isOpenOrdersItems" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.5V10.5M10.5 8H5.5M4.25 14.25H11.75C13.1307 14.25 14.25 13.1307 14.25 11.75V4.25C14.25 2.86929 13.1307 1.75 11.75 1.75H4.25C2.86929 1.75 1.75 2.86929 1.75 4.25V11.75C1.75 13.1307 2.86929 14.25 4.25 14.25Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <p>{{openOrdersItemsList.orderName}} <sup>{{openOrdersItemsList.orderData.length}}</sup></p>
        </div>
        <div class="orders-list" v-if="isOpenOrdersItems">
            <TradingOpenOrdersItems 
                v-for="(openOrdersItems, index) in openOrdersItemsList.orderData"
                :key="index"
                :openOrdersItems="openOrdersItems"
                :isCheckedOrders="isCheckedOrders"
                @onDeleteOrder="onDeleteOrder"
                />
        </div>
    </div>
</template>

<script>
import TradingOpenOrdersItems from "./TradingOpenOrdersItems.vue";

    export default {
        name: "TradingOpenOrdersItemsList",
        components: {
            TradingOpenOrdersItems
        },
        props: {
            openOrdersItemsList: {
                type: Object
            },
            index: {
                type: Number
            },
            isCheckedOrders: {
                type: Boolean
            }
        },
        data() {
            return {
                isOpenOrdersItems: false,
            }
        },
        methods: {
            openOrdersItem() {
                this.isOpenOrdersItems = !this.isOpenOrdersItems;
            },

            onDeleteOrder(order) {
                this.$emit('onDeleteTradingOrder', order);
            }
        }
    }
</script>

<style lang="scss" scoped>
.holder-open-orders {
    display: flex;
    cursor: pointer;
    p {
        font-size: 14px;
    }
}

.holder-open-orders.active svg path {
  fill: var(--v-primary-base);
  stroke: var(--v-textSecondaryColor-base);
}

.holder-open-orders svg path {
  fill: var(--v-primary-base);
  stroke: var(--v-textSecondaryRevert-base);
}

.holder-svg {
    display: flex;
    align-items: baseline;
    padding-top: 2px;
    margin-right: 12px;
    padding-top: 3px;
}
</style>