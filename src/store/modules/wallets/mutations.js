import { getFromLocalStorage, saveToLocalStorage } from '../../../helpers'

const metaMaskNetworkIds = {
    42: 'Kovan',
    1: 'Mainnet',
    3: 'Ropsten',
    4: 'Rinkeby',
    5: 'Goerli'
  }

const binanceNetworkIds = {
    56: 'Binance Smart Chain',
    1: 'Ethereum',
    99: 'Binance Chain'
  }
// maybe should use as global  
const Web3Utils = require('web3-utils');

function saveMetamaskAccount({metaMaskWallet}, key) {
    let savedWallet = getFromLocalStorage('metamask');
    savedWallet = {...savedWallet, ...{[key]: metaMaskWallet[key]}};

    saveToLocalStorage('metamask', savedWallet);
  }

  function saveBinanceAccount({binanceWallet} ,key) {
    let savedWallet = getFromLocalStorage('binance');
    savedWallet = {...savedWallet, ...{[key]: binanceWallet[key]}};

    saveToLocalStorage('binance', savedWallet);
  }
  
export default {

    SET_METAMASK_ADDRESS(state, wallet) {
        if (!wallet.length) {
            state.metaMaskWallet.address = null;
            return;
        }
        state.metaMaskWallet.address = wallet[0].caveats ? wallet[0].caveats[1].value[0] : wallet[0];
        saveMetamaskAccount(state, 'address');
    },

    SET_METAMASK_BALANCE(state, balance) {
        state.metaMaskWallet.balance = balance;
        saveMetamaskAccount(state, 'balance');
    },

    SET_METAMASK_NETWORK_ID(state, chainId) {
        state.metaMaskWallet.networkId = chainId;
        saveMetamaskAccount(state, 'networkId');
    },

    SET_METAMASK_NETWORK_NAME(state, chainId) {
        state.metaMaskWallet.networkName = metaMaskNetworkIds[parseInt(chainId)];
        saveMetamaskAccount(state, 'networkName');
    },

    SET_METAMASK_DISCONECT(state, isDisconected) {
        state.metaMaskWallet.disconected = isDisconected;
        saveMetamaskAccount(state, 'disconected');

        if (isDisconected) {
            state.metaMaskWallet.signature = null;
            saveMetamaskAccount(state, 'signature');
        }
    },

    SET_DEPOSIT_BALANCE(state, balance) {
        state.metaMaskWallet.depositBalance = balance;

        saveMetamaskAccount(state, 'depositBalance');
    },

    CONVERT_METAMASK_BALANCE(state, currency) {
        const balance = state.metaMaskWallet.balance;
        // console.log('state.metaMaskWallet.balance', parseInt(balance));
        

        state.metaMaskWallet.convertedBalance = Web3Utils.fromWei(Web3Utils.toBN(balance), currency);
        state.metaMaskWallet.currency = currency;

        saveMetamaskAccount(state, 'convertedBalance');
        saveMetamaskAccount(state, 'currency');
    },

    SET_METAMASK_SIGNATURE(state, signature) {
        state.metaMaskWallet.signature = signature;
        saveMetamaskAccount(state, 'signature');
    },

    //Binance
    SET_BINANCE_ADDRESS(state, wallet) {
        if (!wallet.length) {
            state.binanceWallet.address = null;
            return;
        }
        state.binanceWallet.address = wallet[0];
        saveBinanceAccount(state, 'address');
    },

    SET_BINANCE_NETWORK_ID(state, chainId) {
        state.binanceWallet.networkId = chainId;
        saveBinanceAccount(state, 'networkId');
    },

    SET_BINANCE_NETWORK_NAME(state, chainId) {
        const networkKey = parseInt(chainId) || 99;
        state.binanceWallet.networkName = binanceNetworkIds[parseInt(networkKey)];
        saveBinanceAccount(state, 'networkName');
    },

    SET_BINANCE_BALANCE(state, balance) {
        state.binanceWallet.balance = balance;
        state.binanceWallet.convertedBalance = parseInt(balance);

        saveBinanceAccount(state, 'balance');
        saveBinanceAccount(state, 'convertedBalance');
    },

    SET_BINANCE_DISCONECT(state, isDisconected) {
        state.binanceWallet.disconected = isDisconected;
        saveBinanceAccount(state, 'disconected');

        if (isDisconected) {
            state.binanceWallet.signature = null;
            saveBinanceAccount(state, 'signature');
        }
    },

    SET_BINANCE_SIGNATURE(state, signature) {
        state.binanceWallet.signature = signature;
        saveBinanceAccount(state, 'signature');
    }

    //End Binance
}