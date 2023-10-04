<template>
  <div v-if="haveWalletProvider && (!metamaskWalletDisconected || !binanceWalletDisconected)" class="chart-assets mainBorderColor">
    <div class="chart-assets-wrapper primary">
      <div class="chart-general">
        <h2 class="chart-general-title">{{ $t('tradingAssets') }}</h2>
        <button class="chart-general-btn" @click="openBuyDialog">{{ $t('buy') }} <span>{{currency}}</span></button>
      </div>
      <div class="chart-trading-details">
        <div class="chart-trading-titles">
          <h3 class="chart-trading-title">{{ $t('tradingBalance') }}</h3>
          <h3 class="chart-trading-title underlined">{{ $t('tradingUnrealizedPNL') }}</h3>
<!--          <h3 class="chart-trading-title underlined">{{ $t('tradingToken') }}</h3>-->
        </div>
        <div class="chart-trading-prices">
          <!-- <h1>{{ getMetamaskWallet.depositBalance.toFixed(2) }}</h1> -->
          <p class="chart-trading-price">{{ marginBalance.toFixed(2) }}<span>{{currency}}</span></p>
          <p class="chart-trading-price">{{ unrealizedPNL }}<span>{{currency}}</span></p>
<!--          <p class="chart-trading-price">5.00<span>{{currency}}</span></p>-->
        </div>
      </div>
      <div class="chart-assets-controls">
        <button
            class="chart-controls-btn"
            @click="openBuyDialogOrderDeposit"
        ><span>{{ $t('tradingDepositBtnText') }}</span></button>
        <button
            class="chart-controls-btn"
            @click="openBuyDialogOrderWithdraw"
        ><span>{{ $t('tradingWithdrawBtnText') }}</span></button>
      </div>
    </div>
      <CommonDialog ref="commonDialog">
        <iframe src="https://app.uniswap.org/#/swap?use=v1?outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
          height="660px"
          width="100%"
          style="
                border: 0;
                margin: 0 auto;
                display: block;
                border-radius: 10px;
                max-width: 600px;
                min-width: 300px;
                "
          id="myId"/>
      </CommonDialog>
    <CommonDialog
        ref="commonDialogOrderDeposit"
        :title="'Deposit'"
    >
      <span class="popup-order-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 24C18.65 24 24 18.65 24 12C24 5.34996 18.65 0 12 0C5.34996 0 0 5.34996 0 12C0 18.65 5.34996 24 12 24Z" fill="#2775CA"/>
          <path d="M15.3 13.9C15.3 12.15 14.25 11.55 12.15 11.3001C10.65 11.1 10.35 10.7001 10.35 9.99999C10.35 9.2999 10.85 8.85002 11.85 8.85002C12.75 8.85002 13.25 9.15002 13.5 9.90003C13.55 10.05 13.7 10.15 13.85 10.15H14.65C14.85 10.15 15 9.99999 15 9.80007V9.75003C14.8 8.64998 13.9 7.80002 12.75 7.70006V6.50006C12.75 6.30002 12.6 6.15002 12.35 6.09998H11.6C11.4 6.09998 11.25 6.24998 11.2 6.50006V7.65002C9.69996 7.85006 8.75004 8.85002 8.75004 10.1001C8.75004 11.7501 9.75 12.4 11.85 12.6501C13.25 12.9 13.7 13.2 13.7 14.0001C13.7 14.8001 13 15.3501 12.05 15.3501C10.75 15.3501 10.3 14.8 10.15 14.05C10.1 13.8501 9.95004 13.75 9.80004 13.75H8.94996C8.75004 13.75 8.60004 13.9 8.60004 14.1V14.1501C8.79996 15.4 9.6 16.3 11.25 16.5501V17.7501C11.25 17.95 11.4 18.1 11.65 18.15H12.4C12.6 18.15 12.75 18 12.8 17.7501V16.5501C14.3 16.3 15.3 15.25 15.3 13.9V13.9Z" fill="white"/>
          <path d="M9.45002 19.1499C5.55001 17.75 3.54996 13.4 5.00005 9.54992C5.75005 7.44992 7.40005 5.84996 9.45002 5.09996C9.65006 5 9.75002 4.85 9.75002 4.59992V3.89996C9.75002 3.69992 9.65006 3.54992 9.45002 3.5C9.39998 3.5 9.30002 3.5 9.24998 3.54992C4.5 5.04992 1.89995 10.1 3.39996 14.85C4.29996 17.6499 6.45001 19.8 9.24998 20.7C9.45002 20.7999 9.65006 20.7 9.69998 20.4999C9.75002 20.45 9.75002 20.4 9.75002 20.3V19.5999C9.75002 19.4499 9.60002 19.25 9.45002 19.1499ZM14.7501 3.54992C14.55 3.44996 14.35 3.54992 14.3001 3.74996C14.25 3.8 14.25 3.84992 14.25 3.95V4.64996C14.25 4.85 14.4 5.04992 14.55 5.15C18.4501 6.54992 20.4501 10.8999 19 14.75C18.25 16.85 16.6 18.45 14.55 19.2C14.35 19.2999 14.25 19.4499 14.25 19.7V20.4C14.25 20.6 14.35 20.75 14.55 20.7999C14.6001 20.7999 14.7 20.7999 14.7501 20.75C19.5001 19.25 22.1001 14.1999 20.6001 9.44996C19.7001 6.59996 17.5 4.44992 14.7501 3.54992V3.54992Z" fill="white"/>
        </svg>
        <div class="flex-wrapper">
          <span class="popup-order-value">{{ quoteCurrency }} Balance</span>
          <span class="popup-order-value">{{walletBalance}} USDC</span>
        </div>
      </span>

      <div class="service-btn-block" v-if="!hasApprove">
        <button
            class="service-btn service-btn__full service-btn__outlined mb-2"
            @click="handlerApprove"
        ><span>Approve {{ quoteCurrency }}</span></button>
      </div>
<!--      <div class="popup-order-descr">{{hash}}</div>-->
      <TradingInputPricePopup
          inputId="buyPriceMarket"
          :quoteCurrency="quoteCurrency"
          :modelValue="depositValue"
          @update:modelValue="depositValue = $event"
          :inputReadOnly="!hasApprove"
          v-if="hasApprove"
      />
      <div class="service-btn-block">
        <button
            class="service-btn btn-try custom-accent"
            :class="{'btn--disabled': !hasApprove || depositValue === '0'}"
            :disabled="depositValue === '0' || !hasApprove"
            @click="handlerDeposit"
        >{{ hasApprove ? 'Deposit' : 'Deposit' }}</button>
      </div>
    </CommonDialog>
    <CommonDialog
        ref="commonDialogOrderWithdraw"
        :title="'Withdraw'"
    >
      <span class="popup-order-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1C18.0744 1 23 5.92556 23 12C23 18.0744 18.0744 23 12 23C5.92556 23 1 18.0775 1 12C1 5.9225 5.92556 1 12 1Z" fill="#26A17B"/>
        <path d="M13.549 10.7736V9.13587H17.292V6.64258H7.10171V9.13587H10.8448V10.7736C7.80449 10.9142 5.51587 11.5161 5.51587 12.2372C5.51587 12.9583 7.80449 13.5603 10.8448 13.7008V18.941H13.552V13.7008C16.5893 13.5603 18.8718 12.9583 18.8718 12.2372C18.8687 11.5161 16.5862 10.9142 13.549 10.7736ZM13.552 13.2578C13.4756 13.2608 13.0845 13.2853 12.2106 13.2853C11.5109 13.2853 11.022 13.2669 10.8478 13.2578V13.2608C8.16199 13.1417 6.15448 12.6742 6.15448 12.115C6.15448 11.5558 8.15894 11.0883 10.8478 10.9692V12.7903C11.0251 12.8025 11.5262 12.833 12.2228 12.833C13.057 12.833 13.4756 12.7994 13.5551 12.7903V10.9631C16.2379 11.0822 18.2393 11.5497 18.2393 12.1089C18.2331 12.668 16.2318 13.1355 13.552 13.2578Z" fill="white"/>
        </svg>
        <div class="flex-wrapper">
          <span class="popup-order-value">{{ quoteCurrency }} Balance</span>
          <span class="popup-order-value">{{walletBalance}} USDC</span>
        </div>
      </span>
<!--      <div class="popup-order-descr">{{hash}}</div>-->
      <TradingInputPricePopup
          inputId="buyPriceMarket"
          :quoteCurrency="quoteCurrency"
          :modelValue="withdrawValue"
          @update:modelValue="withdrawValue = $event"
          :inputReadOnly="false"
      />
      <div class="service-btn-block">
        <button
            class="service-btn btn-try custom-accent"
            :disabled="withdrawValue === '0'"
            @click="handlerWithdraw"
        >Withdraw</button>
      </div>
    </CommonDialog>
    <CommonDialog
        ref="commonDialogOrderSuccess"
    >
      <svg class="popup-order-success-icon" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.25 17.2212L13.275 28.125L33.75 7.875" stroke="#56BD86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="popup-order-main-title textMainColor">Almost Ready</span>
      <div class="popup-order-descr">
        <span
          class="order-hash"
          v-if="hash"
        >
          <!-- {{hash}} -->
        </span>
        <p>The transaction in network might take a while. It will appear in your balance soon.</p>
      </div>
      <div class="service-btn-block">
        <button class="service-btn btn-try custom-accent" @click="DialogOrderSuccessClose">Got It</button>
      </div>
    </CommonDialog>
  </div>
</template>

<script>
import CommonDialog from '../popups/CommonDialog.vue';
import { mapGetters, mapActions } from 'vuex';
import TradingInputPricePopup from "../inputs/TradingInputPricePopup";
import {
  getAllowance,
  getApprove,
  getDepositBalanceUSDC,
  getWalletBalanceUSDC,
  testApprove
} from "@/services/getBalanceService";

export default {
  name: "ChartAssetsInfo",
  props: ['quoteCurrency', 'address'],

  components: {
    CommonDialog,
    TradingInputPricePopup,
  },
  data: function () {
    return {
      currency: this.quoteCurrency,
      marginBalance: 0,
      walletBalance: 0,
      unrealizedPNL: 0,
      hash: null,
      hasApprove: false,
      depositValue: '0',
      withdrawValue: '0',
    }
  },
  mounted() {
    this.getOrdersInfo().then(({ data }) => {
      this.unrealizedPNL = data.unrealized_pnl
    })
  },
  methods: {
    ...mapActions('orders', ['getOrdersInfo']),
    ...mapActions({ setDepositBalance: 'wallets/setDepositBalance' }),
    getDepositBalanceUSDC,
    getWalletBalanceUSDC,
    getApprove,
    testApprove,
    getAllowance,
    handlerApprove() {
      if (this.getMetamaskWallet.address) {
        this.testApprove(this.getMetamaskWallet.address).then((res) => {
          this.hasApprove = true
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    openBuyDialog() {
      this.$refs.commonDialog.openPopups();
    },
    openBuyDialogOrderDeposit() {
      this.$refs.commonDialogOrderDeposit.openPopups();
    },
    openBuyDialogOrderWithdraw() {
      this.$refs.commonDialogOrderWithdraw.openPopups();
    },
    DialogOrderSuccessClose() {
      this.$refs.commonDialogOrderSuccess.closePopups();
    },
    handlerDeposit() {
      let contractAddress = '0x6E8aDE8AD61bff517a0E946b98D7AD788b05D911'
      let contractABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isPositive","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"balance","type":"bytes32"}],"name":"LogAccountSettled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"balance","type":"bytes32"}],"name":"LogDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"settlementPrice","type":"uint256"}],"name":"LogFinalSettlementEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"index","type":"bytes32"}],"name":"LogIndex","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"funder","type":"address"}],"name":"LogSetFunder","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"LogSetGlobalOperator","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"LogSetLocalOperator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minCollateral","type":"uint256"}],"name":"LogSetMinCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oracle","type":"address"}],"name":"LogSetOracle","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":true,"internalType":"address","name":"taker","type":"address"},{"indexed":false,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"uint256","name":"marginAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"positionAmount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isBuy","type":"bool"},{"indexed":false,"internalType":"bytes32","name":"makerBalance","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"takerBalance","type":"bytes32"}],"name":"LogTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"address","name":"destination","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"balance","type":"bytes32"}],"name":"LogWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"balance","type":"bytes32"}],"name":"LogWithdrawFinalSettlement","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"priceLowerBound","type":"uint256"},{"internalType":"uint256","name":"priceUpperBound","type":"uint256"}],"name":"enableFinalSettlement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountBalance","outputs":[{"components":[{"internalType":"bool","name":"marginIsPositive","type":"bool"},{"internalType":"bool","name":"positionIsPositive","type":"bool"},{"internalType":"uint120","name":"margin","type":"uint120"},{"internalType":"uint120","name":"position","type":"uint120"}],"internalType":"struct DxlnTypes.Balance","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountIndex","outputs":[{"components":[{"internalType":"uint32","name":"timestamp","type":"uint32"},{"internalType":"bool","name":"isPositive","type":"bool"},{"internalType":"uint128","name":"value","type":"uint128"}],"internalType":"struct DxlnTypes.Index","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFinalSettlementEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFunderContract","outputs":[{"internalType":"contract I_DxlnFunder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getGlobalIndex","outputs":[{"components":[{"internalType":"uint32","name":"timestamp","type":"uint32"},{"internalType":"bool","name":"isPositive","type":"bool"},{"internalType":"uint128","name":"value","type":"uint128"}],"internalType":"struct DxlnTypes.Index","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"getIsGlobalOperator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"getIsLocalOperator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOracleContract","outputs":[{"internalType":"contract I_DxlnOracle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOraclePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"hasAccountPermissions","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"oracle","type":"address"},{"internalType":"address","name":"funder","type":"address"},{"internalType":"uint256","name":"minCollateral","type":"uint256"}],"name":"initializeV1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"funder","type":"address"}],"name":"setFunder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setGlobalOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setLocalOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minCollateral","type":"uint256"}],"name":"setMinCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"oracle","type":"address"}],"name":"setOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"components":[{"internalType":"uint256","name":"takerIndex","type":"uint256"},{"internalType":"uint256","name":"makerIndex","type":"uint256"},{"internalType":"address","name":"trader","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct DxlnTrade.TradeArg[]","name":"trades","type":"tuple[]"}],"name":"trade","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"destination","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFinalSettlement","outputs":[],"stateMutability":"nonpayable","type":"function"}]
      let contract = new window.web3.eth.Contract(contractABI, contractAddress)
      let wallet = this.getMetamaskWallet.address;
      // var MyContract = new web3.eth.Contract(contractABI, contractAddress);
      // MyContract.methods.getAccountBalance(contractAddress).call({})
      //     .then(res => {
      //       console.log(res)
      //     })
      var myContract = new web3.eth.Contract(contractABI, contractAddress, {
        from: wallet,
        gasPrice: '100000000000',
        gas: 2000000,
        value: 0
      });
      console.log(myContract)

      contract.methods.deposit(wallet, (+this.depositValue) * 1000000).send({
        from: wallet,
        data: contractAddress,
        value: 0
      }, () => {
        this.$refs.commonDialogOrderDeposit.closePopups();
        this.depositValue = '0'
        this.$refs.commonDialogOrderSuccess.openPopups();
      })
          .then(async (receipt) => {
            this.hash = receipt.transactionHash;

            let accounts = await web3.eth.getAccounts()
        
            this.getDepositBalanceUSDC(accounts[0]).then((res) => {
              const ballance = Number(res['margin']) / 1000000
              this.setDepositBalance(ballance)
              this.marginBalance = this.getMetamaskWallet.depositBalance
            })
          });
    },
    handlerWithdraw() {
      let contractAddress = '0x6E8aDE8AD61bff517a0E946b98D7AD788b05D911'
      let contractABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isPositive","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"balance","type":"bytes32"}],"name":"LogAccountSettled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"balance","type":"bytes32"}],"name":"LogDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"settlementPrice","type":"uint256"}],"name":"LogFinalSettlementEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"index","type":"bytes32"}],"name":"LogIndex","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"funder","type":"address"}],"name":"LogSetFunder","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"LogSetGlobalOperator","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"LogSetLocalOperator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"minCollateral","type":"uint256"}],"name":"LogSetMinCollateral","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oracle","type":"address"}],"name":"LogSetOracle","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"maker","type":"address"},{"indexed":true,"internalType":"address","name":"taker","type":"address"},{"indexed":false,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"uint256","name":"marginAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"positionAmount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"isBuy","type":"bool"},{"indexed":false,"internalType":"bytes32","name":"makerBalance","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"takerBalance","type":"bytes32"}],"name":"LogTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"address","name":"destination","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"balance","type":"bytes32"}],"name":"LogWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"balance","type":"bytes32"}],"name":"LogWithdrawFinalSettlement","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"Number","name":"amount","type":"Number"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"priceLowerBound","type":"uint256"},{"internalType":"uint256","name":"priceUpperBound","type":"uint256"}],"name":"enableFinalSettlement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountBalance","outputs":[{"components":[{"internalType":"bool","name":"marginIsPositive","type":"bool"},{"internalType":"bool","name":"positionIsPositive","type":"bool"},{"internalType":"uint120","name":"margin","type":"uint120"},{"internalType":"uint120","name":"position","type":"uint120"}],"internalType":"struct DxlnTypes.Balance","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountIndex","outputs":[{"components":[{"internalType":"uint32","name":"timestamp","type":"uint32"},{"internalType":"bool","name":"isPositive","type":"bool"},{"internalType":"uint128","name":"value","type":"uint128"}],"internalType":"struct DxlnTypes.Index","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFinalSettlementEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFunderContract","outputs":[{"internalType":"contract I_DxlnFunder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getGlobalIndex","outputs":[{"components":[{"internalType":"uint32","name":"timestamp","type":"uint32"},{"internalType":"bool","name":"isPositive","type":"bool"},{"internalType":"uint128","name":"value","type":"uint128"}],"internalType":"struct DxlnTypes.Index","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"getIsGlobalOperator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"getIsLocalOperator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOracleContract","outputs":[{"internalType":"contract I_DxlnOracle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOraclePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"hasAccountPermissions","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"oracle","type":"address"},{"internalType":"address","name":"funder","type":"address"},{"internalType":"uint256","name":"minCollateral","type":"uint256"}],"name":"initializeV1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"funder","type":"address"}],"name":"setFunder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setGlobalOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setLocalOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minCollateral","type":"uint256"}],"name":"setMinCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"oracle","type":"address"}],"name":"setOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"components":[{"internalType":"uint256","name":"takerIndex","type":"uint256"},{"internalType":"uint256","name":"makerIndex","type":"uint256"},{"internalType":"address","name":"trader","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct DxlnTrade.TradeArg[]","name":"trades","type":"tuple[]"}],"name":"trade","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"destination","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFinalSettlement","outputs":[],"stateMutability":"nonpayable","type":"function"}]
      let contract = new window.web3.eth.Contract(contractABI, contractAddress)
      let wallet = this.getMetamaskWallet.address
      var myContract = new web3.eth.Contract(contractABI, contractAddress, {
        from: wallet,
        gasPrice: '100000000000',
        gas: 2000000,
        value: 0
      });
      console.log(myContract)

      contract.methods.withdraw(wallet, wallet, (+this.withdrawValue) * 1000000).send({
        from: wallet,
        data: contractAddress,
        value: 0
      }, () => {
        this.$refs.commonDialogOrderWithdraw.closePopups();
        this.withdrawValue = '0'
      })
          .then((receipt) => {
            this.hash = receipt.transactionHash
            this.$refs.commonDialogOrderSuccess.openPopups();
          });
    },
  },
  computed: {
    haveWalletProvider() {
      return !!window.ethereum || !!window.BinanceChain;
    },

    metamaskWalletDisconected() {
      return !this.getMetamaskWallet.address || this.getMetamaskWallet.disconected;
    },

    binanceWalletDisconected() {
      return !this.getBinanceWallet.address || this.getBinanceWallet.disconected;
    },

    ...mapGetters('wallets', ['getMetamaskWallet', 'getBinanceWallet']),
  },
  watch: {
    'depositValue'(newVal) {
      this.depositValue = newVal.toString()
    },
    'withdrawValue'(newVal) {
      this.withdrawValue = newVal.toString()
    },
    async address(val) {
      this.getDepositBalanceUSDC(val).then((res) => {
        const ballance = Number(res['margin']) / 1000000
        this.setDepositBalance(ballance)
        this.marginBalance = this.getMetamaskWallet.depositBalance
      })

      this.getWalletBalanceUSDC(val).then((res) => {
        this.walletBalance = Number(res) / 1000000
      })

    let accounts = await web3.eth.getAccounts()

      this.getAllowance(val).then((res) => {
        console.log(res, 'res')
        this.hasApprove = res && res > 0
        console.log( res, 'getAllowance' )
      }).catch((err) => {
        console.log(err, 'err')
      })
    }
  },
};
</script>

<style scoped>

.chart-assets {
  border-bottom: 1px solid;
}

.chart-assets-wrapper {
  padding: 20px;
}

.chart-general {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-trading-titles {
  width: 50%;
}

.chart-general-title {
  margin: 0;
  font-weight: bold;
  font-size: 16px;
}

.chart-general-btn {
  min-width: 73px;
  min-height: 24px;
  font-weight: bold;
  font-size: 12px;
  border-radius: 4px;
  transition: .2s all;
  background: linear-gradient(90deg, var(--v-primaryGradientFrom-base), var(--v-primaryGradientTo-base) 51%, var(--v-primaryGradientTo-base)) var(--x, 0)/ 200%;
}

.chart-general-btn:hover {
    --x: 100%;
}

.chart-general-btn span {
  text-transform: uppercase;
}

.chart-trading-details {
  display: flex;
  width: 100%;
}

.chart-trading-title {
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  margin: 16px 0 0 0;
  color: #a4a5af;
}

.underlined {
  text-decoration: underline;
}

.chart-trading-prices {
  width: 50%;
}

.chart-trading-price {
  text-transform: uppercase;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
}

.chart-trading-price span {
  color: #a4a5af;
  display: block;
  margin: 0 0 0 4px;
}

/*.chart-trading-price:last-child::before {*/
/*  display: block;*/
/*  content: "";*/
/*  margin: 0 5px 0 0;*/
/*  width: 22px;*/
/*  height: 22px;*/
/*  background: url("../../assets/img/dxln.svg") center center/cover no-repeat;*/
/*}*/

.chart-assets-controls {
  display: flex;
  margin: 20px 0 0 0;
  width: 100%;
  justify-content: space-between;
}

.chart-controls-btn {
  position: relative;
  min-width: 114px;
  min-height: 48px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 6px;
  transition: .2s all;
}

.chart-controls-btn:before {
  content: "";
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-image: linear-gradient(90deg, var(--v-primaryGradientFrom-base) 0%, var(--v-primaryGradientTo-base) 100%);
}

.chart-controls-btn:after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 1px;
  left: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  border-radius: 8px;
  background: var(--v-primaryBg-base);
}

.chart-controls-btn span {
  position: relative;
  z-index: 2;
  background-image: linear-gradient(90deg, var(--v-primaryGradientFrom-base) 0%, var(--v-primaryGradientTo-base) 100%);
  background-clip: text;
  color: #fff;
  transition: .2s all;
 }

.chart-controls-btn:hover span  {
  color: transparent;
}

.popup-order-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 15px 0px;
}

.popup-order-title svg {
  margin-right: 5px;
  width: 24px;
  height: 24px;
}

.flex-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.popup-order-value {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #A4A5AF;
}

.popup-order-success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}

.popup-order-main-title {
  justify-content: center;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  display: block;
  width: 100%;
}

.popup-order-descr p {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #A4A5AF;
}

.order-hash {
  display: block;
  margin: 20px 0px;
  text-align: center;
  word-break: break-word;
}

.btn--disabled {
  opacity: 0.2;
}

</style>