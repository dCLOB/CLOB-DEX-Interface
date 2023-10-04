
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';
import { intervals } from './setIntervals';
import { charts } from  './chart-config'

import wallets from './modules/wallets';
import markets from './modules/markets';
import orders from './modules/orders';

Vue.use(VueRouter).use(Vuex);


const store = new Vuex.Store({
  modules: {
    alert,
    authentication,
    users,
    intervals,
    charts,
    wallets,
    markets,
    orders
  }
});

export default store;
