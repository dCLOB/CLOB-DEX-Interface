<template>
  <div id="my-header">
    <v-theme-provider root>
      <header class="header primaryBg">
        <div class="container-full" >
          <div class="header-wrapper">
            <div class="header-logo-wrap">
              <a @click="$router.push({ name: 'Home' })">
                <svg width="92" height="20" viewBox="0 0 92 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.52042 0C8.48011 0 10.1993 0.382358 11.678 1.14708C13.1745 1.91179 14.3235 3.00552 15.1252 4.42825C15.9447 5.83319 16.4432 7.84539 16.4432 9.71272C16.4432 11.5801 16.0334 13.982 15.2139 15.3869C14.4122 16.7741 13.2631 17.85 11.7667 18.6147C10.288 19.3795 8.5688 19.7618 6.60911 19.7618H0.0886865L0 0H6.52042ZM6.47549 16.5874C8.43518 16.5874 9.94948 16.0538 11.0184 14.9868C12.0873 13.9197 12.6218 11.6512 12.6218 9.71272C12.6218 7.77425 11.9986 5.88654 10.9297 4.80171C9.8608 3.6991 8.3465 3.14779 6.38681 3.14779H3.74123L3.82991 16.5874H6.47549Z" fill="white"/>
                  <path d="M87.7777 19.7598L84.7313 15.1715L82.0322 19.7598H78.0238L82.8607 12.3438L77.9703 4.9812H82.1926L85.2123 9.54283L87.938 4.9812H91.9465L87.0829 12.3438L91.9999 19.7598H87.7777Z" fill="white"/>
                  <path d="M79.2058 12.0505C79.2058 12.584 79.1702 13.0642 79.0989 13.491H68.2761C68.3652 14.558 68.7393 15.3939 69.3985 15.9986C70.0577 16.6032 70.8682 16.9056 71.8303 16.9056C73.2199 16.9056 74.2086 16.3098 74.7965 15.1182H78.8317C78.4042 16.541 77.5846 17.7147 76.3732 18.6395C75.1618 19.5465 73.6742 20 71.9104 20C70.4852 20 69.2025 19.6888 68.0623 19.0663C66.94 18.4261 66.0581 17.528 65.4167 16.372C64.7932 15.2161 64.4814 13.8822 64.4814 12.3706C64.4814 10.8412 64.7932 9.49846 65.4167 8.3425C66.0403 7.18653 66.9132 6.29732 68.0356 5.67488C69.158 5.05243 70.4496 4.74121 71.9104 4.74121C73.3179 4.74121 74.5738 5.04354 75.6784 5.6482C76.8008 6.25286 77.6648 7.11539 78.2705 8.23579C78.8941 9.33841 79.2058 10.61 79.2058 12.0505ZM75.331 10.9834C75.3132 10.0231 74.9658 9.25838 74.2888 8.68929C73.6118 8.10241 72.7834 7.80897 71.8036 7.80897C70.8772 7.80897 70.0933 8.09352 69.4519 8.66261C68.8284 9.21392 68.4454 9.98753 68.3028 10.9834H75.331Z" fill="white"/>
                  <path d="M47.7065 12.3173C47.7065 10.8234 48.0005 9.49847 48.5884 8.3425C49.1941 7.18653 50.0136 6.29733 51.0469 5.67488C52.0802 5.05244 53.2293 4.74121 54.4942 4.74121C55.4562 4.74121 56.3737 4.95462 57.2467 5.38144C58.1196 5.79048 58.8144 6.34179 59.3311 7.03537V0.0195312H63.1257V19.7599H59.3311V17.5725C58.8679 18.3016 58.2176 18.8885 57.3803 19.3331C56.543 19.7777 55.572 20 54.4675 20C53.2204 20 52.0802 19.6799 51.0469 19.0396C50.0136 18.3994 49.1941 17.5013 48.5884 16.3454C48.0005 15.1716 47.7065 13.8289 47.7065 12.3173ZM59.3578 12.3706C59.3578 11.4636 59.1796 10.69 58.8233 10.0498C58.467 9.39176 57.986 8.89381 57.3803 8.55591C56.7746 8.20023 56.1243 8.02239 55.4295 8.02239C54.7347 8.02239 54.0934 8.19133 53.5054 8.52923C52.9175 8.86713 52.4365 9.36509 52.0624 10.0231C51.7061 10.6633 51.5279 11.428 51.5279 12.3173C51.5279 13.2065 51.7061 13.989 52.0624 14.6648C52.4365 15.3228 52.9175 15.8296 53.5054 16.1853C54.1112 16.541 54.7525 16.7188 55.4295 16.7188C56.1243 16.7188 56.7746 16.5499 57.3803 16.212C57.986 15.8563 58.467 15.3583 58.8233 14.7181C59.1796 14.0601 59.3578 13.2776 59.3578 12.3706Z" fill="white"/>
                  <path d="M36.8405 7.27538C37.3215 6.49288 37.945 5.87933 38.7111 5.43473C39.495 4.99012 40.3857 4.76782 41.3834 4.76782V8.68922H40.3946C39.2188 8.68922 38.328 8.96488 37.7223 9.51618C37.1344 10.0675 36.8405 11.0278 36.8405 12.3972V19.7598H33.0992V4.98123H36.8405V7.27538Z" fill="white"/>
                  <path d="M31.7046 12.0505C31.7046 12.584 31.669 13.0642 31.5977 13.491H20.7749C20.864 14.558 21.2381 15.3939 21.8973 15.9986C22.5564 16.6032 23.367 16.9056 24.3291 16.9056C25.7187 16.9056 26.7074 16.3098 27.2953 15.1182H31.3305C30.9029 16.541 30.0834 17.7147 28.872 18.6395C27.6605 19.5465 26.173 20 24.4092 20C22.984 20 21.7013 19.6888 20.5611 19.0663C19.4387 18.4261 18.5569 17.528 17.9155 16.372C17.292 15.2161 16.9802 13.8822 16.9802 12.3706C16.9802 10.8412 17.292 9.49846 17.9155 8.3425C18.5391 7.18653 19.412 6.29732 20.5344 5.67488C21.6568 5.05243 22.9484 4.74121 24.4092 4.74121C25.8166 4.74121 27.0726 5.04354 28.1772 5.6482C29.2995 6.25286 30.1636 7.11539 30.7693 8.23579C31.3929 9.33841 31.7046 10.61 31.7046 12.0505ZM27.8298 10.9834C27.812 10.0231 27.4646 9.25838 26.7876 8.68929C26.1106 8.10241 25.2822 7.80897 24.3023 7.80897C23.3759 7.80897 22.5921 8.09352 21.9507 8.66261C21.3272 9.21392 20.9441 9.98753 20.8016 10.9834H27.8298Z" fill="white"/>
                  <path d="M42.8049 3.97441C43.2503 4.40449 43.8026 4.61953 44.4618 4.61953C45.1209 4.61953 45.6643 4.40449 46.0919 3.97441C46.5372 3.52563 46.7599 2.974 46.7599 2.31953C46.7599 1.66506 46.5372 1.12278 46.0919 0.692702C45.6643 0.243921 45.1209 0.0195312 44.4618 0.0195312C43.8026 0.0195312 43.2503 0.243921 42.8049 0.692702C42.3774 1.12278 42.1636 1.66506 42.1636 2.31953C42.1636 2.974 42.3774 3.52563 42.8049 3.97441Z" fill="url(#paint0_linear_2213:28008)"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M42.5671 5.32471C43.1159 5.65493 43.7469 5.82004 44.46 5.82004C45.1625 5.82004 45.7786 5.6598 46.3084 5.33931V19.7599H42.5671L42.5671 5.32471Z" fill="white"/>
                  <defs>
                    <linearGradient id="paint0_linear_2213:28008" x1="42.1636" y1="2.31953" x2="46.7599" y2="2.31953" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FC7648"/>
                    <stop offset="1" stop-color="#FC4981"/>
                    </linearGradient>
                  </defs>
                </svg>

              </a>
            </div>

<!--            <select-->
<!--                @change="$emit('changeSymbol', onChangeValue($event), onChangequoteCurrency($event), onChangebaseCurrency($event))"-->
<!--            >-->
<!--              <option selected disabled>Symbol</option>-->
<!--              <option-->
<!--                  v-for="item in symbolList"-->
<!--                  :key="item.symbol"-->
<!--                  :label="item.pair"-->
<!--                  :data-base-currency="item['base-currency']"-->
<!--                  :data-quote-currency="item['quote-currency']"-->
<!--                  :value="item['base-currency'] + item['quote-currency']"-->
<!--              >-->
<!--                {{item['base-currency'] + item['quote-currency']}}-->
<!--              </option>-->
<!--            </select>-->
            <nav class="header-nav-wrap">
              <ul class="header-nav">
                <li class="header-nav__item">
                  <router-link :to="{ name: 'Home' }" tag="a" class="header-nav__item-link textSecondaryColor" exact>{{ $t('homePage') }} </router-link>
                </li>
                <li class="header-nav__item">
                  <router-link :to="{ name: 'Trading' }" tag="a" class="header-nav__item-link textSecondaryColor" exact>{{ $t('swaps') }}</router-link>
                </li>
                <li class="header-nav__item">
                  <router-link :to="'/data'" tag="a" class="header-nav__item-link textSecondaryColor" exact>{{ $t('data') }}</router-link>
                </li>
                <li class="header-nav__item">
                  <router-link :to="'/knowledge'" tag="a" class="header-nav__item-link textSecondaryColor" exact>{{ $t('knowledgeBase') }}</router-link>
                </li>
                <li class="header-nav__item">
                  <router-link :to="'/reports'" tag="a" class="header-nav__item-link textSecondaryColor" exact>{{ $t('reports') }}</router-link>
                </li>
              </ul>
              <div class="lang-switcher">
                <div class="lang-switcher-header" @click="openLocale" :class="{open: openLocaleDropdown}">
                  <span class="lang-switcher-current-lang" v-text="this.currentLocale"></span>
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.6665 1.33333L6.99984 6.66667L12.3332 1.33333" stroke="#FFB200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="lang-switcher-dropdown" v-if="openLocaleDropdown">
                  <div class="lang-switcher-dropdown-item"
                       v-for="(lang, i) in langs"
                       :key="`Lang${i}`"
                       @click="changeLocale(lang)"
                       :class="{ active: lang === $i18n.locale}"
                  >
                    {{ lang === 'ru' ? 'Русский' : lang === 'en' ? 'English' : lang === 'es' ? 'Español' : ''}}
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.75 4.74038L4.425 8.375L11.25 1.625" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </nav>
            <v-switch
                v-model="theme"
                @change="$emit('changeTheme')"
                class=""
            ></v-switch>
            <div v-if="getBinanceWallet.networkName && !getBinanceWallet.disconected" class="holder-network">
              <span class="holder-network-title textSecondaryColor">{{ $t('network') }}</span>
              <span class="holder-network-currency textMainColor">{{getBinanceWallet.networkName}}</span>
            </div>
            <div v-if="getMetamaskWallet.networkName && !getMetamaskWallet.disconected" class="holder-network">
              <span class="holder-network-title textSecondaryColor">{{ $t('network') }}</span>
              <span class="holder-network-currency textMainColor">{{getMetamaskWallet.networkName}}</span>
            </div>
            <div class="button-wrapper">
              <!-- <button @click="openPopup" class="order-form-callateral-button" v-if="!haveWalletProvider || ((!getMetamaskWallet.address || getMetamaskWallet.disconected) && !binanceWallet.address)">{{ $t('connectWallet') }}</button> -->
              <button @click="openPopup" class="order-form-callateral-button" v-if="!haveWalletProvider || (metamaskWalletDisconected && binanceWalletDisconected)">{{ $t('connectWallet') }}</button>
              <div v-if="getMetamaskWallet.address && !getMetamaskWallet.disconected" class="login-button marketHeaderButton" @click="dropdownDisconnect">
                <div class="login-button-img-wrap">
                  <img src="@/assets/img/walleticontest.svg" alt="user image" class="login-button-img">
                </div>
                <div class="login-button-info">
                  <span v-if="getMetamaskWallet.address" class="login-button-info-title textSecondaryColor">{{modifyAddress(getMetamaskWallet.address)}}</span>
                  <span class="login-button-info-price">
                        <span class="login-button-info-price-value textMainColor">{{getMetamaskWallet.convertedBalance}}</span>
                        <span class="login-button-info-currency">ETH</span>
                      </span>
                </div>
                <svg :style="isDropdownDisconnect ? 'transform: rotate( -180deg )' : ''"  width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.6665 1.3335L6.99984 6.66683L12.3332 1.3335" stroke="#FFB200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>

                <div v-if="getBinanceWallet.address && !getBinanceWallet.disconected" class="login-button marketHeaderButton" @click="dropdownDisconnect" >
                <div class="login-button-img-wrap">
                  <img src="@/assets/img/binance.svg" alt="user image" class="login-button-img">
                </div>
                <div class="login-button-info">
                  <span v-if="getBinanceWallet.address" class="login-button-info-title textSecondaryColor">{{modifyAddress(getBinanceWallet.address)}}</span>
                  <span class="login-button-info-price">
                        <span class="login-button-info-price-value textMainColor">{{getBinanceWallet.convertedBalance}}</span>
                        <span class="login-button-info-currency">ETH</span>
                      </span>
                </div>
                <svg :style="isDropdownDisconnect ? 'transform: rotate( -180deg )' : ''"  width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.6665 1.3335L6.99984 6.66683L12.3332 1.3335" stroke="#FFB200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div v-if="isDropdownDisconnect" class="holder-dropdown-disconnect" @click="disconectWallet" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="#FFB200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10.667 11.3332L14.0003 7.99984L10.667 4.6665" stroke="#FFB200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 8H6" stroke="#FFB200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Disconnect</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </v-theme-provider>
    <!-- <ServiceMessage/> -->
    <ConnectWallet ref="connectWallet"/>
  </div>
</template>

<style lang="css">
@import '../../assets/css/fonts.css';
</style>

<script>
import ConnectWallet from "../popups/ConnectWallet";
import { getFromLocalStorage } from '../../helpers';
import { mapActions, mapGetters } from 'vuex';
// import ServiceMessage from "../popups/ServiceMessage";
export default {
  name: "Header",
  components: {
    ConnectWallet,
    // ServiceMessage
  },

  data() {
    return {
      theme: this.$vuetify.theme.dark ? false : true,
      submitted: false,
      userPhoto: JSON.parse(localStorage.getItem('headerPhoto')),
      headerFirstName: JSON.parse(localStorage.getItem('headerFirstName')),
      isPageLogin: Boolean,
      menuIsOpen: false,
      notifications: null,
      isLogged: this.$store.state.authentication.status.loggedIn,
      langs: ['en', 'ru', 'es'],
      currentLocale: 'English',
      switchLocale: '',
      openLocaleDropdown: false,
      isDropdownDisconnect: false
    }
  },
  props: {
    symbol: String,
    symbolList: Array,
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

  mounted() {    
    this.checkConnectedWallets();
    //its temporery here, maybe we should place it somewhere else
    // this.acctrades({market_id:'HOT-DAI'}).then(data => console.log('trades', data))
    // this.getOrders({marketID:'HOT-DAI'}).then((orders) => console.log('orders', orders))
    // this.getMarketsTrades({market_Id:'HOT-DAI'}).then((markets) => console.log('markets trades', markets))

    if (window.ethereum) {
      this.subscribeToMetaMaskEvent('accountsChanged');
      this.subscribeToMetaMaskEvent('chainChanged');
    }

    if (window.BinanceChain) {
      this.subscribeToBinanceEvent('accountsChanged');
      this.subscribeToBinanceEvent('chainChanged');
    }
        
    if(localStorage.getItem('theme') === null) {
      this.$vuetify.theme.dark = true
    }else if(localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark') {
      this.$vuetify.theme.dark = true
    }else {
      this.$vuetify.theme.dark = false
    }

    this.$route.path === '/login' ? this.isPageLogin = true : this.isPageLogin = false
    if(this.isLogged) {
      this.$load(async() => {
        this.notifications = (await this.$api.notifications.getNotViewed()).data.body.elements
      })
    }

  },

  methods: {
      ...mapActions({
        metamaskRequest: 'wallets/metamaskRequest',
        setMetamaskDisconect: 'wallets/metamaskConnection',
        subscribeToMetaMaskEvent: 'wallets/subscribeToMetaMaskEvent',

        binanceRequest: 'wallets/binanceRequest',
        setBinanceDisconect: 'wallets/binanceConnection',
        subscribeToBinanceEvent: 'wallets/subscribeToBinanceEvent',

        acctrades: 'markets/getAccountTrades',
        getOrders: 'orders/getOrders',
        getMarketsTrades: 'markets/getMarketsTrades'

    }),

    checkConnectedWallets() {
      const metaMaskAccount = getFromLocalStorage('metamask');
      const binanceAccount = getFromLocalStorage('binance');

      if (metaMaskAccount) {
        this.setMetamaskDisconect(metaMaskAccount.disconected);
        if (!metaMaskAccount.disconected) {
          this.metamaskRequest({method: 'eth_requestAccounts'});
          }
        }

      if (binanceAccount) {
        this.setBinanceDisconect(binanceAccount.disconected);
        if (!binanceAccount.disconected) {
          this.binanceRequest({method: 'eth_accounts'});
        }
      }
    },

    modifyAddress(str) {
      return `${str.substring(0,5)}..${str.slice(str.length - 4)}`;
    },

    disconectWallet() {
      this.setMetamaskDisconect(true);
      this.setBinanceDisconect(true);
      this.dropdownDisconnect();
    },

    openPopup () {
      this.$refs.connectWallet.openPopups();
    },
    
    onChangeValue(event) {
      return event.target.value
    },
    changeLocale (lang) {
      this.$i18n.locale = lang
      this.currentLocale = this.$i18n.locale === 'ru' ? 'Русский' : this.$i18n.locale === 'en' ? 'English' : this.$i18n.locale === 'es' ? 'Español' : ''
      this.openLocaleDropdown = !this.openLocaleDropdown
    },
    openLocale() {
      this.openLocaleDropdown = !this.openLocaleDropdown
    },
    onChangequoteCurrency(event) {
      return event.target.options[event.target.selectedIndex].dataset.quoteCurrency
    },
    onChangebaseCurrency(event) {
      return event.target.options[event.target.selectedIndex].dataset.baseCurrency
    },
    // changeLocale () {
    //   this.$vuetify.lang.current = this.switchLocale
    // },
    handleSubmitLogout () {
      this.submitted = true;
      const { dispatch } = this.$store;
      dispatch('authentication/logout');
      clearInterval(this.$store.state.intervals.amountInterval)
    },
    openMenu () {
      this.menuIsOpen = true
    },
    dropdownDisconnect () {
      this.isDropdownDisconnect = !this.isDropdownDisconnect;
    },
  },
}
</script>

<style scoped>

.v-application .header-nav__item .header-nav__item-link {
  position: relative;
  display: block;
}

.v-application .header-nav__item .header-nav__item-link {
  font-weight: bold;
}

.v-application .header-nav__item .header-nav__item-link.active:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 2px;
  /* background: var(--v-accent-base) !important; */
  background: linear-gradient(90deg, var(--v-primaryGradientFrom-base) 0%, var(--v-primaryGradientTo-base) 100%) !important;
}

.v-application .header-nav__item a.active {
  color: var(--v-textMainColor-base) !important;
}

.header {
  background: #111223;
}

.header-logo-wrap svg path {
  fill: var(--v-revertPrimary-base);
}

.authorization-link {
  background: #ffb200;
  /*color: var(--v-primaryBg-base);*/
  color: #111222;
}

.logo-main-color {
  fill: #FFB200 !important;
}

.home .header {
  background: rgba(19, 20, 21, 0.7);
  position: absolute;
  width: 100%;
  z-index: 100;
}

.header {
  background: #131415;
  position: static;
  width: 100%;
  padding: 0 20px;
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo-wrap {
  max-width: 100px;
  width: 100%;
}

.header-logo-wrap a {
  display: flex;
  height: 100%;
  width: 100%;
}

.header-logo {
  width: 100%;
  height: 36px;
  cursor: pointer;
}

.header-nav-wrap {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.header-nav__item {
  position: relative;
  margin-right: 60px;
}

.header-nav__item-parent:hover > .header-nav__item-link {
  color: #FF0090;
}

.header-nav__item-parent {
  padding-right: 25px;
}

.header-nav__item-link {
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  padding-bottom: 2px;
  transition: all .5s;
}

.header-nav__item-link:hover {
  color: #FF0090;
}

.submenu {
  position: absolute;
  padding: 20px 30px;
  top: 100%;
  left: -30px;
  z-index: 5;
  min-width: 300px;
  background: #131415B3 0% 0% no-repeat padding-box;
  visibility: hidden;
  opacity: 0;
  transform-origin: 0% 0%;
  transform: rotateX(-90deg);
  transition: .3s linear;
  list-style-type: none;
}

.submenu li {
  margin-bottom: 10px;
}

.submenu li:last-child {
  margin-bottom: 0;
}

.submenu li a {
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
  transition: all .5s;
}

nav li:hover > .submenu {
  transform: rotateX(0deg);
  visibility: visible;
  opacity: 1;
}

.authorization-link:hover {
  color: #FF0090;
  background: #fff;
}

.header-user-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 40px;
}

.header-user-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.header-user-name {
  max-width: 100px;
  font-size: 19px;
  color: #fff;
  line-height: 22px;
  transition: all .5s;
}

.header-user-link:hover .header-user-name {
  color: #FF0090;
}

.header-logout {
  display: block;
  margin-left: 25px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
}

.header-logout svg {
  width: 25px;
  height: 25px;
}

.header-logout svg path {
  fill: #fff;
  transition: all .5s;
}

.header-logout:hover svg path {
  fill: #FF0090;
}

.header-user-link-name {
  max-width: 300px;
  text-decoration: none;
}

.authorization-link {
  margin: 16px 0px;
}

.v-input--selection-controls.v-input {
  margin-top: 0;
  margin-right: 60px;
}

.lang-switcher {
  position: relative;
}

.lang-switcher-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.lang-switcher-header.open svg {
  transform: rotate(180deg);
}

.lang-switcher-dropdown {
  position: absolute;
  background: #282942;
  border: 1px solid #3E3F55;
  border-radius: 6px;
  z-index: 2;
  width: 130px;
  top: 35px;
}

.lang-switcher-current-lang {
  display: block;
  width: 100%;
  margin-right: 7px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
}

.lang-switcher-dropdown.open {
  display: block;
}

.lang-switcher-dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: #FFFFFF;
  padding: 8px 12px 5px 12px;
  transition: all .5s;
  cursor: pointer;
}

.lang-switcher-dropdown-item:hover {
  background: #3E3F55;
}

.lang-switcher-dropdown-item svg {
  display: none;
}

.lang-switcher-dropdown-item.active {
  font-weight: bold;
}

.lang-switcher-dropdown-item.active svg {
  display: block;
}

.button-wrapper {
  position: relative;
  /*width: 195px;*/
  min-width: 195px;
  padding: 16px 0px;
}

.holder-dropdown-disconnect {
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  bottom: -33px;
  left: 0;
  width: 100%;
  padding: 16px 0px;
  background-color: var(--v-marketHeaderButton-base);
  border-radius: 6px;
  padding: 10px 14px;
}

.holder-dropdown-disconnect svg {
  margin-right: 10px;
}

.holder-network {
  display: flex;
  flex-direction: column;
}

.login-button {
  padding: 5px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  cursor: pointer;
}

.login-button svg {

}

.login-button-img-wrap {
  margin-right: 14px;
  width: 24px;
  height: 24px;
}

.login-button-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.login-button-info {
  /*display: flex;*/
  /*align-items: flex-start;*/
  /*justify-content: flex-start;*/
  /*flex-wrap: wrap;*/
  margin-right: 15px;
}

.login-button-info-title {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  display: block;
  width: 100%;
}

.login-button-info-price {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  display: block;
  width: 100%;
}

.login-button-info-price-value {
  display: inline-block;
  margin-right: 4px;
}

.holder-network {
  margin-right: 20px;
}

.holder-network-title {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
}

.holder-network-title .textSecondaryColor:hover{
  color: unset;
}

.holder-network-currency {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
}
</style>