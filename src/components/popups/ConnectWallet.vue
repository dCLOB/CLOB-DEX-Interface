<template>
  <v-dialog v-model="walletDialog" persistent>
    <div class="wallet-wrapper primary mainBorderColor">
      <h2 class="wallet-wrapper-title textMainColor">Connect Wallet</h2>
      <div class="close-dialog" @click="walletDialog = false">
        <img src="../../assets/img/close.svg" alt="close-icon" />
      </div>

      <div class="dialog-wallets">
      <!-- <div class="dialog-wallets" v-if="wallets.length"> -->
        <!-- <div
          class="dialog-wallet primary mainBorderColor walletHoverBGColor"
          v-for="(wallet, index) in wallets"
          :key="index"
        >
          <div class="wallet-img">
            <img
              :src="require(`@/assets/img/${wallet.img}`)"
              alt="wallet-image"
              :key="index"
            />
          </div>
          <div class="wallet-details">
            <h3 class="wallet-title textMainColor">{{ wallet.title }}</h3>
            <a href="javascript:void(0)" class="wallet-link textSecondaryColor">{{
              wallet.linkTitle
            }}</a>
          </div>
        </div> -->
        <div
          class="dialog-wallet primary mainBorderColor walletHoverBGColor"
          @click="handleMetamaskConection"
        >
          <div class="wallet-img">
            <img
              src="@/assets/img/walleticontest.svg"
              alt="wallet-image"
            />
          </div>
          <div class="wallet-details">
            <h3 class="wallet-title textMainColor">MetaMask</h3>
            <a 
              v-if="isMetamaskInstalled" 
              href="javascript:void(0)" 
              class="wallet-link textSecondaryColor">
              metamask.io</a>
            <a 
              v-if="!isMetamaskInstalled" 
              href="javascript:void(0)" 
              class="wallet-link textSecondaryColor"> 
              Please install Metamask extension to proceed
            </a>
          </div>
        </div>
        <div
          class="dialog-wallet primary mainBorderColor walletHoverBGColor"
          @click="handleBinanceConection"
        >
          <div class="wallet-img">
            <img
              src="@/assets/img/binance.svg"
              alt="wallet-image"
            />
          </div>
          <div class="wallet-details">
            <h3 class="wallet-title textMainColor">Binance Chain Wallet</h3>
            <a v-if="isBinanceInstalled" href="javascript:void(0)" class="wallet-link textSecondaryColor">binance.com</a>
            <a v-if="!isBinanceInstalled" href="javascript:void(0)" class="wallet-link textSecondaryColor"> 
              Please install Binance extension to proceed
            </a>
          </div>
        </div>
      </div>
      <!-- <div class="wallet-empty primary mainBorderColor" v-else>
        <h3 class="wallet-title textMainColor wallet-emty-center">
          No wallets yet.
        </h3>
      </div> -->
    </div>
  </v-dialog>
</template>

<script>
import { getFromLocalStorage, saveToLocalStorage } from '../../helpers';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ConnectWallet",

  data() {
    return {
      walletDialog: false
    };
  },

  computed: {
    isMetamaskInstalled() {
      return window.ethereum;
    },

    isBinanceInstalled() {
      return window.BinanceChain;
    },

    ...mapGetters('wallets', ['getMetamaskWallet', 'getBinanceWallet']),
  },

  mounted() {

  },

  methods: {
    ...mapActions({
        metaMaskRequest: 'wallets/metamaskRequest',
        setMetamaskDisconect: 'wallets/metamaskConnection',

        binanceRequest: 'wallets/binanceRequest',
        setBinanceDisconect: 'wallets/binanceConnection'
    }),

    emitWalletClick(action, isPluginInstalled) {
      if (isPluginInstalled) {
        this.$emit(action, action);
      }
    },

    openPopups () {
      this.walletDialog = true;
    },

    closePopup() {
      this.walletDialog = false;
    },

    // Metamask methods
    connectMetamskWallet() {
      this.closePopup();

      if (this.getMetamaskWallet.address) {
            this.setMetamaskDisconect(false);
        }
    },

    handleMetamaskConection() {
      const { disconected } = this.getMetamaskWallet;
      const method = !disconected ? 'eth_requestAccounts' : 'wallet_requestPermissions';

      this.getMetaMaskAccount(method);
    },

    getMetaMaskAccount(method, params) {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      const res = new Date(date).toISOString();

      saveToLocalStorage('auth-date', `Authentication:${res}`);

      this.metaMaskRequest({method, params})
      .then(() => this.connectMetamskWallet())
    },
    //END Metamask methods

    //Binance methods
    async handleBinanceConection() {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      const res = new Date(date).toISOString();

      saveToLocalStorage('auth-date', `Authentication:${res}`);

      await this.binanceRequest({method: 'eth_accounts'});

      if (this.getBinanceWallet.address) { 
          this.setBinanceDisconect(false);
      }

      this.closePopup()
    },
    //END Binance methods
  }
};
</script>

<style>
.v-dialog {
  box-shadow: none;
  margin: 0;
  border-radius: 8px;
  max-width: 440px;
}

.wallet-wrapper {
  padding: 20px 0 0 0;
  border: 1px solid;
  border-radius: 8px;
  position: relative;
}

.close-dialog {
  width: 12px;
  position: absolute;
  top: 25px;
  right: 23px;
  cursor: pointer;
}

.close-dialog img {
  display: block;
  width: 100%;
}

.wallet-wrapper-title {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 150%;
  margin: 0;
}

.dialog-wallets {
  margin: 22px 0 0 0;
}

.dialog-wallet {
  padding: 17px 0 17px 23px;
  border-top: 1px solid;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: .5s all;
}

.wallet-img {
  width: 36px;
}

.wallet-img img {
  display: block;
  width: 100%;
}

.wallet-details {
  padding: 0 0 0 12px;
}

.wallet-title {
  font-weight: bold;
  margin: 0;
  font-size: 16px;
  line-height: 16px;
}

.wallet-link {
  font-size: 14px;
  transition: .5s all;
}

.wallet-empty {
  margin: 20px 0 0 0;
  border-top: 1px solid;
  padding: 20px;
  text-align: center;
}
</style>