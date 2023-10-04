const defaultParams = [{
    eth_accounts: {}
}];

import { getFromLocalStorage } from '../../../helpers';

const Web3Utils = require('web3-utils');
// metamask
async function commitMetamaskAction({commit, dispatch, getters}, method, data) {
    switch(method) {
        case 'wallet_requestPermissions':
        case 'eth_requestAccounts':
            commit('SET_METAMASK_ADDRESS', data);

            await dispatch('metamaskRequest', {method: 'eth_chainId'});
            await dispatch('metamaskRequest', {
                method: 'eth_getBalance', 
                params: [getters.getMetamaskWallet.address, 'latest']
            });
            commit('CONVERT_METAMASK_BALANCE', 'ether'); //!!!change to dynamic currency

            if (!getFromLocalStorage('metamask').signature) {
                await dispatch('metamaskRequest', {
                    method: 'personal_sign',
                    params: [Web3Utils.asciiToHex(getFromLocalStorage('auth-date')), getters.getMetamaskWallet.address]
                }).then((res) => {
                    location.reload()
                });
            // location.reload(); // temporary until figure out http request chain on app init
            }

        break;
        case 'eth_getBalance':
            commit('SET_METAMASK_BALANCE', data);
        break;
        case 'eth_chainId':
            commit('SET_METAMASK_NETWORK_ID', data);
            commit('SET_METAMASK_NETWORK_NAME', data);
            break;
        case 'personal_sign':
            commit('SET_METAMASK_SIGNATURE', data);
    }
}

async function commitMetaMaskOnSubscription({commit, dispatch, getters}, event, data) {
    switch(event) {
        case 'chainChanged':
            commit('SET_METAMASK_NETWORK_ID', data);
            commit('SET_METAMASK_NETWORK_NAME', data);

            await dispatch('metamaskRequest', {
                method: 'eth_getBalance',
                params: [getters.getMetamaskWallet.address, 'latest']
            });
            commit('CONVERT_METAMASK_BALANCE', 'ether'); //!!!change to dynamic currency
            break;
        case 'accountsChanged':
            if (!data.length) {
                commit('SET_METAMASK_DISCONECT', true);
            }
            break;
    }

}

async function commitBinanceOnSubscription({commit, dispatch, getters}, event, data) {
    switch(event) {
        case 'chainChanged':
            commit('SET_BINANCE_NETWORK_ID', data);
            commit('SET_BINANCE_NETWORK_NAME', data);

            await dispatch('binanceRequest', {
                method: 'eth_getBalance',
                params: [getters.getBinanceWallet.address, 'latest']
            });
            break;
        case 'accountsChanged':
            commit('SET_BINANCE_ADDRESS', data);

            if (!data.length) {
                commit('SET_BINANCE_DISCONECT', true);
            }
            break;
    }

}

//Binance
async function commitBinanceAction({commit, dispatch, getters}, method, data) {
    switch(method) {
        case 'eth_accounts':
            commit('SET_BINANCE_ADDRESS', data);

            await dispatch('binanceRequest', {method: 'net_version'});

            await dispatch('binanceRequest', {
                method: 'eth_getBalance',
                params: [getters.getBinanceWallet.address, 'latest']
            });

            if (!getFromLocalStorage('binance').signature) {
                await dispatch('binanceRequest', {
                    method: 'eth_sign',
                    params: [getters.getBinanceWallet.address, getFromLocalStorage('auth-date')]
                });
                location.reload(); // temporary until figure out http request chain on app init
            }
            break;
        case 'net_version':
            commit('SET_BINANCE_NETWORK_ID', data);
            commit('SET_BINANCE_NETWORK_NAME', data);
            break;
        case 'eth_getBalance':
            commit('SET_BINANCE_BALANCE', data);
            break;
        case 'eth_sign':
            commit('SET_BINANCE_SIGNATURE', data);
    }
}
// END Binance

export default {
//metamask
    metamaskRequest(state, { method, params }) {
        return new Promise((resolve, reject) => {
            ethereum.request({
                method,
                params: params|| defaultParams
            }).then((data) => {
                commitMetamaskAction(state, method, data);
                resolve(data)
            })
        })
    },

    subscribeToMetaMaskEvent(store, event) {
        ethereum.on(event, (data) => {
            commitMetaMaskOnSubscription(store, event, data);
        });
    },

    // check maybe should commit from component
    metamaskConnection({commit}, isDisconected) {
        commit('SET_METAMASK_DISCONECT', isDisconected);
    },

    onMetaMaskAccountsChanged({commit}, wallet) {
        commit('SET_METAMASK_ADDRESS', wallet);
    },

    convertBalance({commit}, currency) {
        commit('CONVERT_METAMASK_BALANCE', currency);
    },

    setDepositBalance({commit}, balance) {
        commit('SET_DEPOSIT_BALANCE', balance);
    },

    //END metamask

    binanceRequest(state, { method, params }) {
        return new Promise((resolve, reject) => {
            BinanceChain.request({
                method,
                params: params|| defaultParams
            }).then((data) => {
                commitBinanceAction(state, method, data);
                resolve(data)
            })
        })
    },

    binanceConnection({commit}, isDisconected) {
        commit('SET_BINANCE_DISCONECT', isDisconected);
    },

    subscribeToBinanceEvent(store, event) {
        BinanceChain.on(event, (data) => {
            commitBinanceOnSubscription(store, event, data);
        });
    },
}