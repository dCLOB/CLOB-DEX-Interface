<template>
  <div id="my-page">
    <div id="my-content">
      <Header
          :symbol="symbol"
          :symbolList="symbolList"
          @changeTheme="changeTheme"
      />
<!--@changeSymbol="changeSymbol"-->
      <main id="root" class="market primaryBg">
        <div class="container-full market-main-wrap">
          <div class="market-content">
            <!-- <div class="favorites-header">
              <div class="favorites-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.7662 10.2375L17.9454 14.945L19.0838 21.5937C19.1334 21.8844 19.0142 22.1783 18.7758 22.3519C18.6412 22.4504 18.4809 22.5 18.3207 22.5C18.1977 22.5 18.0739 22.4705 17.9609 22.4108L12 19.2718L6.03991 22.4101C5.77987 22.5481 5.46333 22.5256 5.22496 22.3511C4.98659 22.1775 4.8674 21.8837 4.91693 21.5929L6.05539 14.9442L1.23377 10.2375C1.02325 10.0313 0.946635 9.72273 1.03796 9.44286C1.12928 9.16299 1.37153 8.95754 1.6633 8.9149L8.32612 7.94581L11.3058 1.89713C11.5666 1.36762 12.4334 1.36762 12.6942 1.89713L15.6739 7.94581L22.3367 8.9149C22.6285 8.95754 22.8707 9.16221 22.962 9.44286C23.0534 9.72351 22.9767 10.0305 22.7662 10.2375V10.2375Z" fill="url(#paint0_linear_2213:8943)"/>
                  <defs>
                    <linearGradient id="paint0_linear_2213:8943" x1="1" y1="12" x2="23" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FC7648"/>
                      <stop offset="1" stop-color="#FC4981"/>
                    </linearGradient>
                  </defs>
                </svg>
                <h3>{{ $t('favorites') }}</h3>
              </div>
              <div class="favorites-item-logged" v-if="this.$store.state.authentication.status.loggedIn">
                <div class="favorites-item">
                  <p>TSLA/USDC<span style="color: #56BD86">+3.62%</span></p>
                </div>
                <div class="favorites-item">
                  <p>AMZN/USDC<span style="color: #EF564D">-5.62%</span></p>
                </div>
                <div class="favorites-item">
                  <p>APL/USDC<span style="color: #56BD86">+4.30%</span></p>
                </div>
              </div>
            </div> -->
            <div class="market-header">

              <div class="last-price-title-wrap marketHeaderButton">
                <img src="@/assets/img/tesla.svg" alt="">

                <div class="last-price-title">
                  <span class="last-price-title-name">TSLA/USDС</span>
                  <span
                      class="last-price-title-amount"
                      ref="lastPricePreview"
                      v-text="lastPrice.toFixed(2)"
                  ></span>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.66675 5.3335L8.00008 10.6668L13.3334 5.3335" stroke="#FFB200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

              </div>

              <div class="last-price-wrap"> <span class="marketPrice-label underline">{{ $t('index') }}</span>
                <span
                    class="market-price-value yellow-color"
                    ref="lastPriceHeader"
                    v-text="indexOracle"
                ></span></div>
<!--              <div class="last-price-wrap"> <span class="marketPrice-label underline">{{ $t('premium') }}</span>-->
<!--                <span class="market-price-value textMainColor">0.01%</span></div>-->
<!--              <div class="last-price-wrap"> <span class="marketPrice-label underline">{{ $t('fundingCountdown') }}</span>-->
<!--                <span class="market-price-value textMainColor">0.0100% 03:35:15</span></div>-->
              <div class="last-price-wrap"> <span class="marketPrice-label">{{ $t('twentyFourChange') }}</span>
                <span
                    class="market-price-value textMainColor"
                    v-text="price24h.toFixed(6)"
                ></span></div>

<!--              <div class="last-price-wrap last-price-wrap-high">-->
<!--                <span class="marketPrice-label">{{ $t('twentyFourHigh') }}</span>-->
<!--                <span-->
<!--                    class="market-price-value textMainColor"-->
<!--                    v-text="symbolHigh.toFixed(2)"-->
<!--                ></span>-->
<!--              </div>-->

<!--              <div class="last-price-wrap last-price-wrap-low">-->
<!--                <span class="marketPrice-label">{{ $t('twentyFourLow') }}</span>-->
<!--                <span-->
<!--                    class="market-price-value textMainColor"-->
<!--                    v-text="symbolLow.toFixed(2)"-->
<!--                ></span>-->
<!--              </div>-->

              <div class="last-price-wrap last-price-wrap-close">
                <span class="marketPrice-label"
                >{{ $t('twentyFourVolumeTSLA') }} ({{ baseCurrency }})</span
                >
                <span
                    class="market-price-value textMainColor"
                    v-text="quoteTokenVolume24h.toFixed(4)"
                ></span>
              </div>

              <div class="last-price-wrap last-price-wrap-volume">
                <span class="marketPrice-label"
                >{{ $t('twentyFourVolumeUSDT') }} ({{ quoteCurrency }})</span
                >
                <span
                    class="market-price-value textMainColor"
                    v-text="symbolVolume.toFixed(4)"
                ></span>
              </div>
            </div>
            <div class="flex-wrap market-main-content">
              <div class="market-trading-widget">
                <div class="chart">
                  <div class="chart-item-header">
                    <div class="chart_price">Price chart</div>
                  </div>
                  <div id="graph" class="block">
                    <TradingViewComponent
                        v-if="!!symbolInfo.symbol"
                        :symbolInfo="symbolInfo"
                        ref="kLineWidget"
                    />
                    <!--                <div id="easymarkets-charts"></div>-->
                  </div>
                </div>
              </div>
              <div class="market-info">
                <div class="order-books-main-wrap order-books-isAskFalse-wrap"  >
                  <div class="order-books-isAskFalse-title textMainColor">{{ $t('orderBook') }}</div>
<!--                  <ul class="order-books-isAskFalse-list">-->
<!--                    <li class="order-books-isAskFalse-items"-->
<!--                        :class="{selected: toggleOrderBookItems === '0.01'}"-->
<!--                        @click="toggleOrderBookItems = '0.01'"-->
<!--                    >0.01</li>-->
<!--                    <li class="order-books-isAskFalse-items"-->
<!--                        :class="{selected: toggleOrderBookItems === '0.1'}"-->
<!--                        @click="toggleOrderBookItems = '0.1'"-->
<!--                    >0.1</li>-->
<!--                    <li class="order-books-isAskFalse-items"-->
<!--                        :class="{selected: toggleOrderBookItems === '1'}"-->
<!--                        @click="toggleOrderBookItems = '1'"-->
<!--                    >1</li>-->
<!--                    <li class="order-books-isAskFalse-items"-->
<!--                        :class="{selected: toggleOrderBookItems === '10'}"-->
<!--                        @click="toggleOrderBookItems = '10'"-->
<!--                    >10</li>-->
<!--                    <li class="order-books-isAskFalse-items"-->
<!--                        :class="{selected: toggleOrderBookItems === '50'}"-->
<!--                        @click="toggleOrderBookItems = '50'"-->
<!--                    >50</li>-->
<!--                    <li class="order-books-isAskFalse-items"-->
<!--                        :class="{selected: toggleOrderBookItems === '100'}"-->
<!--                        @click="toggleOrderBookItems = '100'"-->
<!--                    >100</li>-->
<!--                  </ul>-->
                  <div class="chart-item-header">
                    <span class="order-books-price-title textMainColor">{{ $t('priceTextPrice') }} <span class="order-books-currency">({{quoteCurrency}})</span></span>
                    <span class="order-books-amount-title textMainColor">{{ $t('size') }} <span class="order-books-currency">({{baseCurrency}})</span></span>
                    <span class="order-books-total-title textMainColor">{{ $t('sum') }} <span class="order-books-currency">({{baseCurrency}})</span></span>
                  </div>
                  <div class="order-books order-books-isAskFalse">
                    <TradingOrdersFalse v-for="(order, index) in orderBookFalse" :key="index"
                                        :order="order" :length="orderBookFalse.length" :elIndex="index"/>
                  </div>
                </div>
                <div class="order-books-main-wrap">
                  <div class="last-price-wrapper">


                    <div class="last-price-item" ref="lastPriceOrderBookIcon">
                      <svg v-if="iconState" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.241757 8.6906C1.31405 3.67978 5.88721 0 11.0132 0C14.0446 0 16.9864 1.27555 19.0572 3.48583C22.5909 7.25753 22.9925 13.1695 19.9889 17.3784C18.5524 19.3916 16.4423 20.8914 14.0625 21.5747C11.5958 22.2833 8.90146 22.1022 6.55455 21.0632C4.29828 20.0646 2.41244 18.3025 1.26213 16.1222C0.0669246 13.8567 -0.293967 11.1943 0.241757 8.6906ZM11.6073 5.74556L14.7469 8.8084C15.5306 9.57292 14.3152 10.7585 13.5314 9.99374L11.9545 8.4552V15.5689C11.9545 16.0764 11.5199 16.5 10.9997 16.5C10.4795 16.5 10.045 16.0764 10.045 15.5689V8.41971L8.46113 9.92808C7.66993 10.6823 6.46566 9.48574 7.26058 8.72848L10.3996 5.73858C10.7359 5.41779 11.2744 5.42087 11.6073 5.74556Z" fill="#7DBD56"/>
                      </svg>

                      <svg v-if="!iconState" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.24176 9.6906C2.31405 4.67978 6.88721 1 12.0132 1C15.0446 1 17.9864 2.27555 20.0572 4.48583C23.5909 8.25753 23.9925 14.1695 20.9889 18.3784C19.5524 20.3916 17.4423 21.8914 15.0625 22.5747C12.5958 23.2833 9.90146 23.1022 7.55455 22.0632C5.29827 21.0646 3.41244 19.3025 2.26213 17.1222C1.06692 14.8567 0.706033 12.1943 1.24176 9.6906ZM11.3927 17.2544L8.25312 14.1916C7.46937 13.4271 8.68481 12.2415 9.46856 13.0063L11.0455 14.5448L11.0455 7.43106C11.0455 6.92362 11.4801 6.5 12.0003 6.5C12.5205 6.5 12.955 6.92362 12.955 7.43106L12.955 14.5803L14.5389 13.0719C15.3301 12.3177 16.5343 13.5143 15.7394 14.2715L12.6004 17.2614C12.2641 17.5822 11.7256 17.5791 11.3927 17.2544Z" fill="#EF564D"/>
                      </svg>
                      <span class="last-price-item-value" ref="lastPriceOrderBook" v-text="lastPrice.toFixed(2)"></span>
                    </div>
<!--                    <div class="last-price-item"><span class="market-price-value-default" ref="lastPrice" v-text="lastPrice.toFixed(2)"></span>-->
<!--                    </div>-->
                  </div>
                  <div class="order-books order-books-isAskTrue">
                    <TradingOrders v-for="(order, index) in orderBookTrue" :key="index" :order="order" :length="orderBookTrue.length" :elIndex="index" />
                  </div>
                </div>
                <div class="trade-history-main-wrap">
                  <div class="trade-history-title textMainColor">{{ $t('trades') }}</div>
                  <div class="trade-history-wrap">
                    <div class="chart-item-header">
                      <span class="order-books-price-title textMainColor">{{ $t('priceTextPrice') }} <span class="order-books-currency">{{quoteCurrency}}</span></span>
                      <span class="order-books-amount-title textMainColor">{{ $t('size') }} <span class="order-books-currency">{{baseCurrency}}</span></span>
                      <span class="order-books-total-title textMainColor">{{ $t('time') }}</span>
                    </div>
                    <vue-custom-scrollbar class="scroll-area" :settings="scrollSettings">

                      <div class="trade-history-list">
                        <TradingHistoryMarket v-for="(history, index) in tradeHistory" :key="index"
                                              :history="history" />
                      </div>
                    </vue-custom-scrollbar>
                  </div>
                </div>
              </div>
            </div>

            <TradingAccordeon ref="tradingAccordeon" />


          </div>

          <div class="market-sidebar">
<!--            <div class="market-sidebar-top">-->
<!--              <div class="market-sidebar-top-left">-->
<!--                <span>{{ $t('crossTrading') }}</span>-->
<!--                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99984 0.666504C3.94671 0.666504 0.666504 3.94634 0.666504 7.99984C0.666504 12.0529 3.94634 15.3332 7.99984 15.3332C12.053 15.3332 15.3332 12.0533 15.3332 7.99984C15.3332 3.94677 12.0533 0.666504 7.99984 0.666504ZM7.99984 14.3099C4.52046 14.3099 1.68976 11.4792 1.68976 7.99984C1.68976 4.52043 4.52046 1.68976 7.99984 1.68976C11.4792 1.68976 14.3099 4.52043 14.3099 7.99984C14.3099 11.4792 11.4792 14.3099 7.99984 14.3099ZM7.99995 6.77942C7.56556 6.77942 7.25667 6.96287 7.25667 7.23314V10.9109C7.25667 11.1426 7.56556 11.3742 7.99995 11.3742C8.41503 11.3742 8.75286 11.1426 8.75286 10.9109V7.23308C8.75286 6.96284 8.41503 6.77942 7.99995 6.77942ZM7.2085 5.19634C7.2085 4.82953 7.55597 4.51099 8.00001 4.51099C8.43437 4.51099 8.78193 4.82953 8.78193 5.19634C8.78193 5.56318 8.4344 5.89137 8.00001 5.89137C7.556 5.89137 7.2085 5.56318 7.2085 5.19634Z" fill="#A4A5AF"/>-->
<!--                </svg>-->
<!--              </div>-->
<!--              <div class="market-sidebar-top-right">5x</div>-->
<!--            </div>-->
            <div class="chart-form-wrap mainBorderColor">
              <div class="SellBuy primary">
                <div class="title_sellbuy tab">
                  <div
                      class="tab_sellbuy"
                      :class="{ active: toggleForms === 'limit' }"
                  >
                    <div
                        class="clickTabs tablinks"
                        @click="toggleForms = 'limit'"
                    >
                      {{ $t('limit') }}
                    </div>
                  </div>
                  <div
                      class="tab_sellbuy"
                      :class="{ active: toggleForms === 'market' }"
                  >
                    <div
                        class="clickTabs tablinks"
                        @click="toggleForms = 'market'"
                    >
                      {{ $t('market') }}
                    </div>
                  </div>
                  <div
                      class="tab_sellbuy"
                      :class="{ active: toggleForms === 'stop-limit' }"
                  >
                    <!-- <div
                        class="clickTabs tablinks"
                        @click="toggleForms = 'stop-limit'"
                    >
                      {{ $t('stopLimit') }}
                    </div> -->
                  </div>
                </div>
                <div
                    v-if="toggleForms === 'limit'"
                    class="contenttabs"
                    id="Limit"
                >
                  <div class="main_input tabcontent">
                    <div class="local_input">
                      <form
                          class="order-buy-form limit-form"
                          onsubmit="return false;"
                      >
                        <TradingInputPrice
                            inputId="buyPrice"
                            :quoteCurrency="quoteCurrency"
                            :class="{isEmpty: isEmptyPrice}"
                            :modelValue="createBuyLimit.price"
                            @update:modelValue="createBuyLimit.price = $event"
                        />

                        <!--Quantity-->
                        <TradingInputSize
                            inputId="buyAmount"
                            :baseCurrency="baseCurrency"
                            :class="{isEmpty: isEmptyAmount}"
                            @update:modelValue="createBuyLimit.amount = $event"
                            :modelValue="createBuyLimit.amount"
                            :inputCurrentName="currentCurrencyName"
                        />


                        <div
                            id="error_input"
                            class="
                            style_error_form style_error_form-buy
                            js-orders-exception
                          "
                            v-if="limitBuyValidFlag"
                        >
                          Enter correct values please
                        </div>
                        <div
                            class="style_error_form style_error_form-sell"
                            v-if="limitBuyErrorFlag"
                            v-text="errors.message"
                        ></div>
                      </form>

                    </div>
                  </div>
                </div>
                <div
                    v-if="toggleForms === 'market'"
                    class="contenttabs"
                    id="Market"
                >
                  <div class="main_input tabcontent">
                    <div class="local_input">

                      <form class="market-form">
                        <!-- <TradingInputPrice
                            inputId="buyPriceMarket"
                            :quoteCurrency="quoteCurrency"
                            :modelValue="songPrice.lastPrice"
                            @update:modelValue="songPrice.lastPrice = $event"
                            :inputReadOnly="true"
                        /> -->

                        <TradingInputSize
                            inputId="buyAmountMarket"
                            :baseCurrency="baseCurrency"
                            :class="{isEmpty: isEmptyAmount}"
                            @update:modelValue="createBuyMarket.amount = $event"
                            :modelValue="createBuyMarket.amount"
                            :inputCurrentName="currentCurrencyName"

                        />

                        <div
                            id="error_input_market"
                            class="
                            style_error_form style_error_form-buy
                            js-orders-exception
                          "
                            v-if="marketBuyValidFlag"
                        >
                          Enter correct values please
                        </div>
                        <div
                            class="style_error_form style_error_form-sell"
                            v-if="marketBuyErrorFlag"
                            v-text="errors.message"
                        ></div>

                      </form>
                    </div>
                  </div>
                </div>
                <div
                    v-if="toggleForms === 'stop-limit'"
                    class="contenttabs"
                    id="StopLimit"
                >
                  <div class="main_input tabcontent">
                    <div class="local_input">
                      <form>
                        <TradingInputPrice
                            inputId="buyPriceStopLimit"
                            :quoteCurrency="quoteCurrency"
                            :modelValue="createBuyStopLimit.price"
                            @update:modelValue="createBuyStopLimit.price = $event"
                        />

                        <TradingInputSize
                            inputId="buyAmountStopLimit"
                            :baseCurrency="baseCurrency"
                            @update:modelValue="
                            createBuyStopLimit.amount = $event
                          "
                            :modelValue="createBuyStopLimit.amount"
                            :inputCurrentName="currentCurrencyName"
                        />


                        <span class="buy-form__warning"></span>
                        <div
                            id="buy_sltp_error"
                            class="
                            style_error_form style_error_form-buy
                            js-orders-exception
                          "
                            v-if="stopLimitBuyValidFlag"
                        >
                          Enter correct values please
                        </div>
                        <div
                            class="style_error_form style_error_form-sell"
                            v-if="stopLimitBuyErrorFlag"
                            v-text="errors.message"
                        ></div>

                      </form>
                    </div>
                  </div>
                </div>
<!--                <div class="main_input-order-form">-->
<!--                  <ul class="order-form-list">-->
<!--                    <li class="order-form-item" :class="{active: orderFormActiveClass >= 0, old: orderFormActiveClass > 0}" @click="toggleProgressOrderForm(0)">-->
<!--                      <span :style="{opacity: 1}" class="primaryColor">0%</span>-->
<!--                    </li>-->
<!--                    <li class="order-form-item" :class="{active: orderFormActiveClass >= 25, old: orderFormActiveClass > 26}" @click="toggleProgressOrderForm(25)">-->
<!--                      <span :style="{opacity: orderFormActiveClass >= 25 ? '1' : '0', 'transition-duration': orderFormActiveClass >= 25 ? 300 + 'ms' : 100 + 'ms'}">25%</span>-->
<!--                    </li>-->
<!--                    <li class="order-form-item" :class="{active: orderFormActiveClass >= 50 , old: orderFormActiveClass > 51}" @click="toggleProgressOrderForm(50)">-->
<!--                      <span :style="{opacity: orderFormActiveClass >= 50 ? '1' : '0', 'transition-duration': orderFormActiveClass >= 25 ? 600 + 'ms' : 100 + 'ms'}">50%</span>-->
<!--                    </li>-->
<!--                    <li class="order-form-item" :class="{active: orderFormActiveClass >= 75, old: orderFormActiveClass > 76}" @click="toggleProgressOrderForm(75)">-->
<!--                      <span :style="{opacity: orderFormActiveClass >= 75 ? '1' : '0', 'transition-duration': orderFormActiveClass >= 25 ? 900 + 'ms' : 100 + 'ms'}">75%</span>-->
<!--                    </li>-->
<!--                    <li class="order-form-item" :class="{active: orderFormActiveClass >= 100, oldlast: orderFormActiveClass === 100}" @click="toggleProgressOrderForm(100)">-->
<!--                      <span :style="{opacity: orderFormActiveClass >= 100 ? '1' : '0', 'transition-duration': orderFormActiveClass >= 25 ? 1200 + 'ms' : 100 + 'ms'}">100%</span>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                  <div class="order-form-progress-line" :style="setWidth"></div>-->
<!--                  <div class="order-form-background-line"></div>-->
<!--                </div>-->

                <div  class="order-form-buttons-wrapper" v-if="(getMetamaskWallet.address && !getMetamaskWallet.disconected) || (getBinanceWallet.address && !getBinanceWallet.disconected)">
                  <!-- <div class="order-form-type-fee">
                    <p>Type of Fee</p>
                    <div class="holder-fee-btns">
                      <button class="fee-btn active">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_2213:55485)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3332 7.99999C15.3332 10.4053 14.1745 12.5393 12.3852 13.8777C11.1642 14.7907 9.6425 15.3333 7.99984 15.3333C6.50384 15.3333 5.1105 14.886 3.95184 14.1123C2.5695 13.1993 1.5135 11.8243 1.0075 10.211C0.783837 9.51066 0.666504 8.76999 0.666504 7.99999C0.666504 5.62399 1.7995 3.50832 3.55584 2.16999C3.58884 2.14066 3.62184 2.11499 3.6585 2.09299C4.87584 1.19466 6.3755 0.666656 7.99984 0.666656C9.49584 0.666656 10.8892 1.11766 12.0515 1.88766C13.4338 2.80432 14.4862 4.17932 14.9958 5.79266C15.2158 6.48932 15.3332 7.22999 15.3332 7.99999Z" fill="url(#paint0_linear_2213:55485)"/>
                            <path d="M7.97662 4C8.77115 4 9.46817 4.15479 10.0677 4.46436C10.6744 4.77393 11.1403 5.2167 11.4653 5.79265C11.7976 6.3614 11.9997 7.17598 11.9997 7.93191C11.9997 8.68785 11.8335 9.6602 11.5013 10.2289C11.1763 10.7905 10.7104 11.2261 10.1036 11.5356C9.50413 11.8452 8.80711 12 8.01258 12H5.36896L5.33301 4H7.97662ZM7.95841 10.7149C8.75294 10.7149 9.36689 10.4989 9.80027 10.067C10.2337 9.635 10.4503 8.71664 10.4503 7.93191C10.4503 7.14718 10.1977 6.383 9.76432 5.94383C9.33094 5.49747 8.71698 5.27429 7.92245 5.27429H6.84984L6.88579 10.7149H7.95841Z" fill="white"/>
                          </g>
                          <defs>
                            <linearGradient id="paint0_linear_2213:55485" x1="0.666504" y1="7.99999" x2="15.3332" y2="7.99999" gradientUnits="userSpaceOnUse">
                              <stop stop-color="#FC7648"/>
                              <stop offset="1" stop-color="#FC4981"/>
                            </linearGradient>
                            <clipPath id="clip0_2213:55485">
                              <rect width="14.6667" height="14.6667" fill="white" transform="translate(0.666504 0.666656)"/>
                            </clipPath>
                          </defs>
                        </svg>

                        DXLN
                      </button>
                      <button class="fee-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <g clip-path="url(#clip0)">
                            <path d="M7.99984 0.666504C12.0495 0.666504 15.3332 3.95021 15.3332 7.99984C15.3332 12.0495 12.0495 15.3332 7.99984 15.3332C3.95021 15.3332 0.666504 12.0515 0.666504 7.99984C0.666504 3.94817 3.95021 0.666504 7.99984 0.666504Z" fill="#26A17B"/>
                            <path d="M9.03264 7.18226V6.09042H11.528V4.42822H4.73447V6.09042H7.22985V7.18226C5.20299 7.27596 3.67725 7.67725 3.67725 8.15798C3.67725 8.63872 5.20299 9.04001 7.22985 9.13371V12.6272H9.03468V9.13371C11.0595 9.04001 12.5812 8.63872 12.5812 8.15798C12.5791 7.67725 11.0575 7.27596 9.03264 7.18226ZM9.03468 8.83834C8.98375 8.84038 8.72301 8.85668 8.14041 8.85668C7.67393 8.85668 7.348 8.84445 7.23189 8.83834V8.84038C5.44133 8.76094 4.10299 8.44928 4.10299 8.0765C4.10299 7.70373 5.43929 7.39207 7.23189 7.31262V8.52668C7.35004 8.53483 7.68412 8.5552 8.14856 8.5552C8.70468 8.5552 8.98375 8.53279 9.03672 8.52668V7.30855C10.8252 7.38799 12.1595 7.69966 12.1595 8.07243C12.1554 8.4452 10.8212 8.75686 9.03468 8.83834Z" fill="white"/>
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect width="14.6667" height="14.6667" fill="white" transform="translate(0.666504 0.666504)"/>
                            </clipPath>
                          </defs>
                        </svg>
                        {{ quoteCurrency }}
                      </button>
                    </div>
                  </div> -->
                  <div class="order-form-buy-sell-buttons">
                    <button class="buy-sell-buttons" @click="buyLongEvent">{{ $t('tradingBuyLongBtnText') }}</button>
                    <button class="buy-sell-buttons" @click="sellShortEvent">{{ $t('tradingSellShortBtnText') }}</button>
                  </div>
                  <div class="order-form-max-wrapper">
                    <div class="order-form-max-blocks">
                      <div class="max-blocks-item item-title">Max</div>
                      <div class="max-blocks-item item-amount textFormMaxColor toggleFontWeight"><span class="textMainColor">536,625.22</span>{{quoteCurrency}}</div>
                    </div>
                    <div class="order-form-max-blocks">
                      <div class="max-blocks-item item-title">Max</div>
                      <div class="max-blocks-item item-amount textFormMaxColor toggleFontWeight"><span class="textMainColor">536,625.22</span>{{quoteCurrency}}</div>
                    </div>
                  </div>
                </div>
                <div v-if="!haveWalletProvider || (metamaskWalletDisconected && binanceWalletDisconected)" class="order-form-buttons-wrapper">
                  <button class="order-form-callateral-button" @click="openConnectWalletDialog">{{ $t('connectWallet') }}</button>
                </div>
              </div>
            </div>
            <!--chart-assets-info-->
            <ChartAssetsInfo :quoteCurrency="quoteCurrency" :address="getMetamaskWallet && getMetamaskWallet.address"/>
            <!-- <ChartAssetsInfo v-if="this.$store.state.authentication.status.loggedIn" :quoteCurrency="quoteCurrency" /> -->
            <!-- chart-margin-info -->
            <ChartMarginInfo v-if="this.$store.state.authentication.status.loggedIn" :quoteCurrency="quoteCurrency" />
            <!-- chart-pair-info -->
            <ChartPairInfo />
            <!--popups  -->
            <ConnectWallet
              ref="connectWallet"
            />
          </div>
        </div>
      </main>
    </div>
<!--    <v-switch-->
<!--        v-model="isLogged"-->
<!--    ></v-switch>-->
    <CommonDialog
        ref="commonDialogOrderSuccess"
        :title="'Order'"
    >
      <h1 style="text-align: center">Success</h1>
      <div class="service-btn-block">
        <button class="service-btn btn-try accent" @click="closeDialogOrderSuccess">Accepted</button>
      </div>
    </CommonDialog>
    <CommonDialog
        ref="commonDialogOrderError"
        :title="'Order'"
    >
      <h1 style="text-align: center">Error</h1>
      <div style="text-align: center; margin: 20px auto">Error {{orderError}}</div>
      <div class="service-btn-block">
        <button class="service-btn btn-try custom-accent" @click="closeDialogOrderError"><span>Accepted</span></button>
      </div>
    </CommonDialog>
    <CommonDialog
        ref="commonDialogLowBalance"
        :title="'Order'"
    >
      <div style="text-align: center; margin: 20px auto">{{lowBalance}}</div>
      <div class="service-btn-block">
        <button class="service-btn btn-try custom-accent" @click="closeDialogLowBalance"><span>Got It</span></button>
      </div>
    </CommonDialog>
  </div>
</template>


<script>
import { apiGet } from "@/api/tradingview-api";
// import { ws } from "@/utils/socket";
import Header from "../components/header/Header";
import TradingViewComponent from "../components/trading/TradingViewComponent";
import TradingOrders from "../components/trading/TradingOrders";
import TradingHistoryMarket from "../components/trading/TradingHistoryMarket";
import TradingOrdersFalse from "../components/trading/TradingOrdersFalse";
import TradingInputPrice from "../components/inputs/TradingInputPrice";
import TradingAccordeon from "../components/trading/TradingAccordeon.vue";
import TradingInputSize from "../components/inputs/TradingInputSize";
import settingData from "../components/trading/tradingSettingData";
import ChartAssetsInfo from "../components/trading/ChartAssetsInfo";
import ChartMarginInfo from "../components/trading/ChartMarginInfo";
import ChartPairInfo from "../components/trading/ChartPairInfo";
import axios from "axios";
import customAxios from "../api/$axios";
import store from '../store'

import ConnectWallet from "../components/popups/ConnectWallet";
import {mapActions, mapGetters} from 'vuex';
const Web3Utils = require('web3-utils');
import {getOraclePrice, getWalletBalanceUSDC} from "@/services/getBalanceService";
import Web3 from 'web3';
import CommonDialog from "../components/popups/CommonDialog";

if (window.ethereum) {
  window.web3 = new Web3(ethereum);
  try {
    // Request account access if needed
    ethereum.enable();
  } catch (error) {
    // User denied account access...
  }
} else if (window.web3) { // Legacy dapp browsers...
  window.web3 = new Web3(web3.currentProvider);
} else { // Non-dapp browsers...
  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

const ws = require("ws");
const url = 'wss://deridex-dev/ws';
let openedSocket = null;
const timeInterval = 5000;


export default {
  name: "Market",
  components: {
    TradingViewComponent,
    TradingInputSize,
    TradingInputPrice,
    TradingOrdersFalse,
    TradingHistoryMarket,
    TradingOrders,
    Header,
    TradingAccordeon,
    ChartAssetsInfo,
    ChartMarginInfo,
    ChartPairInfo,
    ConnectWallet,
    CommonDialog
  },
  data() {
    return {
      ...settingData,
      isLogged: false,
      symbol: "",
      baseCurrency: localStorage.getItem("baseCurrency"),
      quoteCurrency: localStorage.getItem("quoteCurrency"),
      symbolInfo: {symbol: 'TSLA-USDC'},
      symbolList: [],
      orderBookFalseFull: [],
      orderBookFalse: [],
      orderBookTrueFull: [],
      orderBookTrue: [],
      tradeHistory: [],
      symbolInfoList: [],
      orderBookList: [],
      symbolVolume: 0,
      symbolLow: 0,
      symbolClose: 0,
      symbolHigh: 0,
      toggleOrderBookItems: '0.01',
      tradeHistoryPrice: 0,
      orderFormActiveClass: 0,
      setWidth: {width: 0 + 'px'},
      lastPrice: 0,
      lastPriceIncrease: 0,
      price24h: 0,
      quoteTokenVolume24h: 0,
      indexOracle: 0,
      iconState: true,
      orderError: '',
      lowBalance: 'Insufficient funds',
      isEmptyPrice: false,
      isEmptyAmount: false,
    }
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
    'createBuyLimit.price'(newVal) {
      this.createBuyLimit.price = newVal.toString()
    },
    'createBuyLimit.amount'(newVal) {
      this.createBuyLimit.amount = newVal.toString()
    },
    'createBuyStopLimit.price'(newVal) {
      this.createBuyStopLimit.price = newVal.toString()
    },
    'createBuyStopLimit.amount'(newVal) {
      this.createBuyStopLimit.amount = newVal.toString()
    },
    isLogged: function (val) {
      if(val === true) {
        this.$store.dispatch('authentication/login');
      }else {
        this.$store.dispatch('authentication/logout');
      }
    },
    "$i18n.locale": function (newVal, oldVal) {
      this.$refs.kLineWidget.updateTheme();
    },

  },
  methods: {
    ...mapActions({
      getMarkets: 'markets/getMarkets',
      getMarketsTrades: 'markets/getMarketsTrades',
      getOrderBook: 'markets/getOrderBook',
      getOrders: 'orders/getOrders',
      deleteOrderById: 'orders/deleteOrderById',
      metamaskRequest: 'wallets/metamaskRequest'
    }),
    getOraclePrice,
    getWalletBalanceUSDC,
    openDialogOrderSuccess() {
      // this.$refs.commonDialogOrderSuccess.openPopups();
    },
    closeDialogOrderSuccess() {
      this.$refs.commonDialogOrderSuccess.closePopups();
    },
    openDialogOrderError() {
      this.$refs.commonDialogOrderError.openPopups();
    },
    closeDialogOrderError() {
      this.$refs.commonDialogOrderError.closePopups();
    },
    openDialogLowBalance() {
      this.$refs.commonDialogLowBalance.openPopups();
    },
    closeDialogLowBalance() {
      this.$refs.commonDialogLowBalance.closePopups();
    },
    clearFormFields() {
      this.createBuyLimit.price = 0,
      this.createBuyLimit.amount = 0,
      this.createBuyStopLimit.price = 0,
      this.createBuyStopLimit.amount = 0,
      this.createBuyMarket.amount = '0'
    },
    getFullData() {
      this.market()
      this.trades()
    },
    connect() {
      var client = new WebSocket("ws://deridex-dev.ml:3002/ws");
      console.dir(client)
      return new Promise((resolve, reject) => {
        console.log("client try to connect...");

        client.onopen = (event) => {
          const typeMessage = JSON.stringify({"type":"subscribe","channels":["Market#TSLA-USDC"]});
          client.send(typeMessage);
        }

        client.onmessage = (event) => {
          const order = JSON.parse(event.data);

            this.$refs.kLineWidget.getWsTrades(order);

            // if (order.type === 'newMarketTrade') {
            //   this.changeValue(this.lastPrice, Number(order.trade.price), this.$refs.lastPricePreview)
            //   this.changeValue(this.lastPrice, Number(order.trade.price), this.$refs.lastPriceHeader)
            //   this.changeValue(this.lastPrice, Number(order.trade.price), this.$refs.lastPriceOrderBook)
            //   this.changeClassEl(this.lastPrice, Number(order.trade.price), this.$refs.lastPriceOrderBookIcon)
            //   this.tradeHistory.unshift(order.trade)
            //   this.lastPrice = Number(order.trade.price)
            // }

            if (order.type === 'level2OrderbookUpdate') {
              this.getMarketsTrades({market_id:'TSLA-USDC'}, {per_page: 20}).then(res => {
                res = res.data.data.trades
                this.tradeHistory = res.sort(this.sortFunction)
                this.changeValue(this.lastPrice, Number(this.tradeHistory[0].price), this.$refs.lastPricePreview)
                this.changeValue(this.lastPrice, Number(this.tradeHistory[0].price), this.$refs.lastPriceHeader)
                this.changeValue(this.lastPrice, Number(this.tradeHistory[0].price), this.$refs.lastPriceOrderBook)
                this.changeClassEl(this.lastPrice, Number(this.tradeHistory[0].price), this.$refs.lastPriceOrderBookIcon)
                this.lastPrice = Number(this.tradeHistory[0].price)
              })
              if(order.side === 'sell') {
                this.getOrderBook({market_id:'TSLA-USDC', size: 10}).then(res => {
                  res = res.data
                  this.orderBookFalse = res.asks.slice(0, 10).sort((a, b) => b[0] - a[0])
                  // this.orderBookFalse = this.orderBookFalse.reverse()
                })
                // let coincidence = true
                // for(let i = 0; i < this.orderBookFalse.length; i++) {
                //   if(+order.amount === 0) {
                //     const index = this.orderBookFalse.indexOf(i);
                //     if (index > -1) {
                //       this.orderBookFalseFull.splice(index, 1);
                //     }
                //     this.orderBookFalse = this.orderBookFalseFull.slice(0, 10)
                //     coincidence = false
                //     break
                //   }
                //   if(+order.price === +this.orderBookFalse[i][0]) {
                //     this.orderBookFalse[i][1] = ((+this.orderBookFalse[i][1] * 10000) + (+order.amount * 10000)) / 10000
                //     coincidence = false
                //     break
                //   }
                // }
                // if(coincidence) {
                //   this.orderBookFalse.pop()
                //   this.orderBookFalse.unshift([+order.price, +order.amount])
                //   this.orderBookFalse.sort((a, b) => b[0] - a[0])
                // }
              }
              if(order.side === 'buy') {
                this.getOrderBook({market_id:'TSLA-USDC', size: 10}).then(res => {
                  res = res.data.orderBook
                  this.orderBookTrue = res.bids.slice(0, 10).sort((a, b) => b[0] - a[0])
                })

              //   let coincidence = true
              //   for(let i = 0; i < this.orderBookTrue.length; i++) {
              //     if(+order.amount === 0) {
              //       const index = this.orderBookTrue.indexOf(i);
              //       if (index > -1) {
              //         this.orderBookTrueFull.splice(index, 1);
              //       }
              //       this.orderBookTrue = this.orderBookTrueFull.slice(0, 10)
              //       coincidence = false
              //       break
              //     }
              //     if(+order.price === +this.orderBookTrue[i][0]) {
              //       this.orderBookTrue[i][1] = ((+this.orderBookTrue[i][1] * 10000) + (+order.amount * 10000)) / 10000
              //       coincidence = false
              //       break
              //     }
              //   }
              //   if(coincidence) {
              //     this.orderBookTrue.pop()
              //     this.orderBookTrue.unshift([+order.price, +order.amount])
              //     this.orderBookTrue.sort((a, b) => b[0] - a[0])
              //   }
              }
            }
          if (!event.data) {
            client?.send(
                JSON.stringify({
                  pong: Date.now(),
                })
            );
            return;
          }
        }

        client.onclose = (event) => {
          console.log("WEBSOCKET_CLOSE: connection closed %o", event);
          openedSocket = false;
          reject(event);
        }

        client.onerror = (event) => {
          console.log("WEBSOCKET_ERROR: Error", new Error(event.message));
          openedSocket = false;
          reject(event);
        }
      });
    },
    async reconnect() {
      try {
        await this.connect();
      } catch (err) {
        console.log("WEBSOCKET_RECONNECT: Error", new Error(err.message));
      }
    },
    getWsTrades() {
      this.reconnect();

      // setInterval(() => {
      //   if (openedSocket == false) {
      //     this.reconnect();
      //   }
      // }, timeInterval);
    },
    market() {
      this.getOrderBook({market_id:'TSLA-USDC', size: 100}).then(res => {
        res = res.data
        this.orderBookFalseFull = res.asks
        this.orderBookFalse = this.orderBookFalseFull.slice(0, 10).reverse()
        this.orderBookTrueFull = res.bids
        this.orderBookTrue = this.orderBookTrueFull.slice(0, 10)
      })
    },
    trades() {
      this.getMarketsTrades({market_id:'TSLA-USDC'}, {per_page: 20}).then(res => {
        res = res.data.data.trades
        this.tradeHistory = res.sort(this.sortFunction)
        this.changeValue(this.lastPrice, Number(this.tradeHistory[0].price), this.$refs.lastPricePreview)
        this.changeValue(this.lastPrice, Number(this.tradeHistory[0].price), this.$refs.lastPriceHeader)
        this.changeValue(this.lastPrice, Number(this.tradeHistory[0].price), this.$refs.lastPriceOrderBook)
        this.changeClassEl(this.lastPrice, Number(this.tradeHistory[0].price), this.$refs.lastPriceOrderBookIcon)
        this.lastPrice = Number(this.tradeHistory[0].price)
        this.$refs.kLineWidget.getWsTrades(this.tradeHistory[0]);
      })
    },
    marketSymbol() {
      this.getMarkets().then(res => {
        let response = res.data.data[0]
        this.$refs.kLineWidget.setSymbol(response.quote_token, response.base_token)
        this.symbolVolume = Number(response.amount24h)
        this.lastPrice = Number(response.last_price)
        this.lastPriceIncrease = Number(response.last_price_increase)
        this.price24h = Number(response.price24h)
        this.quoteTokenVolume24h = Number(response.quote_token_volume24h)
      })
    },
    sortFunction(a,b){
      var dateA = new Date(a.executedAt).getTime();
      var dateB = new Date(b.executedAt).getTime();
      return dateA < dateB ? 1 : -1;
    },
    async buyLongEvent() {
      let order = null;
      let orderId = '';
      let signature = '';
      let ability = true;

      let accounts = await web3.eth.getAccounts();
      const price = Number(this.createBuyLimit.price);
      const amount = Number(this.createBuyLimit.amount);

      if(price === 0) {
        this.isEmptyPrice = true;
      }

      if(amount === 0) {
        this.isEmptyAmount = true;
      }

      if (this.isEmptyPrice || this.isEmptyAmount) {
        setTimeout(() => {
          this.isEmptyPrice = false;
          this.isEmptyAmount = false;
        }, 200)
        return false;
      }

      await this.getWalletBalanceUSDC(accounts[0]).then(async (res) => {
        const balance = await Number(res) / 1000000;

        if(price > balance) {
          ability = false
        }
      })

      if (!ability) {
        this.openDialogLowBalance()
        return false;
      }

      if(this.toggleForms === 'limit') {
        this.createBuyLimit.side = 'buy'
        delete this.createBuyLimit.order_type

        $axios.post(`/orders/build/limit`, this.createBuyLimit)
            .then(async (res) => {
              if(res.data.status === -1) {
                this.orderError = res.data.desc
                this.openDialogOrderError()
                return false
              }
              order = res;
              orderId = order.data.data.order_id;
              let message = orderId
              // let hash = await web3.utils.sha3(message)
              // let accounts = await web3.eth.getAccounts()
              signature = await web3.eth.personal.sign(orderId, accounts[0])
              
                if(order.status === 200) {
                  $axios.post(`/orders`, {
                    "order_id": order.data.data.order_id,
                    "signature": signature
                  }).then((res) => {
                    this.openDialogOrderSuccess()
                  })
                }
              }).then((res) => {
                this.getOrders({market_id:'TSLA-USDC', status: 'pending'}).then((data) => {
                  // console.dir(data)
                });
                this.clearFormFields()
                this.$refs.tradingAccordeon.getTablesData()
              })
      }
      if(this.toggleForms === 'market') {
        this.createBuyMarket.orderType = 'market'
        this.createBuyMarket.side = 'buy'
        $axios.post(`/orders/build/market`, this.createBuyMarket)
            .then(async (res) => {
              order = res;
              orderId = order.data.data.order_id;
              let message = orderId
              // let hash = await web3.utils.sha3(message)
              // let accounts = await web3.eth.getAccounts()
              signature = await web3.eth.personal.sign(orderId, accounts[0])
              
              if(order.status === 200) {
                $axios.post(`/orders`, {
                  "order_id": order.data.data.order_id,
                  "signature": signature
                }).then((res) => {
                  this.openDialogOrderSuccess()
                })
                this.clearFormFields()
              }
            }).then((res) => {
          this.getOrders({market_id:'TSLA-USDC', status: 'pending'}).then((data) => {
            // console.dir(data)
          });
        })
      }
      if(this.toggleForms === 'stop-limit') {
        this.createBuyStopLimit.orderType = 'stop-limit'
        this.createBuyStopLimit.side = 'buy'
        $axios.post(`/orders/build/stop-limit`, this.createBuyStopLimit)
            .then(async (res) => {
              order = res;
              orderId = order.data.data.order_id;
              let message = orderId
              let hash = await web3.utils.sha3(message)
              let accounts = await web3.eth.getAccounts()
              signature = await web3.eth.personal.sign(orderId, accounts[0])
              
              if(order.status === 200) {
                $axios.post(`/orders`, {
                  "order_id": order.data.data.order_id,
                  "signature": signature
                }).then((res) => {
                  this.openDialogOrderSuccess()
                })
                this.clearFormFields()
              }
            }).then((res) => {
          this.getOrders({market_id:'TSLA-USDC', status: 'pending'}).then((data) => {
            // console.dir(data)
          });
        })
      }
    },
    async sellShortEvent() {
      let order = null;
      let orderId = '';
      let signature = '';let ability = true;

      let accounts = await web3.eth.getAccounts();
      const price = Number(this.createBuyLimit.price);
      const amount = Number(this.createBuyLimit.amount);

      if(price === 0) {
        this.isEmptyPrice = true;
      }

      if(amount === 0) {
        this.isEmptyAmount = true;
      }

      if (this.isEmptyPrice || this.isEmptyAmount) {
        setTimeout(() => {
          this.isEmptyPrice = false;
          this.isEmptyAmount = false;
        }, 200)
        return false;
      }

      await this.getWalletBalanceUSDC(accounts[0]).then(async (res) => {
        const balance = await Number(res) / 1000000;

        if(price > balance) {
          ability = false
        }
      })

      if (!ability) {
        this.openDialogLowBalance()
        return false;
      }

      if(this.toggleForms === 'limit') {
        this.createBuyLimit.side = 'sell'
        delete this.createBuyLimit.order_type

        $axios.post(`/orders/build/limit`, this.createBuyLimit)
            .then(async (res) => {
              order = res;
              orderId = order.data.data.order_id;
              let message = orderId
              let hash = await web3.utils.sha3(message)
              let accounts = await web3.eth.getAccounts()
              signature = await web3.eth.personal.sign(orderId, accounts[0])
              
              if(order.status === 200) {
                $axios.post(`/orders`, {
                  "order_id": order.data.data.order_id,
                  "signature": signature
                }).then((res) => {
                  this.openDialogOrderSuccess()
                })
                this.clearFormFields()
              }
            }).then((res) => {
          this.getOrders({market_id:'TSLA-USDC', status: 'pending'}).then((data) => {
            // console.dir(data)
          });
        })
      }
      if(this.toggleForms === 'market') {
        this.createBuyMarket.orderType = 'market'
        this.createBuyMarket.side = 'sell'
        $axios.post(`/orders/build/market`, this.createBuyMarket)
            .then(async (res) => {
              order = res;
              orderId = order.data.data.order_id;
              let message = orderId
              let hash = await web3.utils.sha3(message)
              let accounts = await web3.eth.getAccounts()
              signature = await web3.eth.personal.sign(orderId, accounts[0])
              
              if(order.status === 200) {
                $axios.post(`/orders`, {
                  "order_id": order.data.data.order_id,
                  "signature": signature
                }).then((res) => {
                  this.openDialogOrderSuccess()
                })
                this.clearFormFields()
              }
            }).then((res) => {
          this.getOrders({market_id:'TSLA-USDC', status: 'pending'}).then((data) => {
            // console.dir(data)
          });
        })
      }
      if(this.toggleForms === 'stop-limit') {
        this.createBuyStopLimit.orderType = 'stop-limit'
        this.createBuyStopLimit.side = 'sell'
        $axios.post(`/orders/build/stop-limit`, this.createBuyStopLimit)
            .then(async (res) => {
              order = res;
              orderId = order.data.data.order_id;
              let message = orderId
              let hash = await web3.utils.sha3(message)
              let accounts = await web3.eth.getAccounts()
              signature = await web3.eth.personal.sign(orderId, accounts[0])
              
              if(order.status === 200) {
                $axios.post(`/orders`, {
                  "order_id": order.data.data.order_id,
                  "signature": signature
                }).then((res) => {
                  this.openDialogOrderSuccess()
                })
                this.clearFormFields()
              }
            }).then((res) => {
          this.getOrders({market_id:'TSLA-USDC', status: 'pending'}).then((data) => {
            // console.dir(data)
          });
        })
      }
    },
    openConnectWalletDialog() {
      this.$refs.connectWallet.openPopups();
    },

    toggleProgressOrderForm(active, e) {
      this.orderFormActiveClass = active
      let widthInPixels = active * 2.24
      this.setWidth = {width: widthInPixels + 'px'}

    },
    changeValue(OldVal, newVal, ref) {
      if (OldVal < newVal) {
        ref.style.color = "#56BD86"
      } else if (OldVal > newVal) {
        ref.style.color = "#EF564D";
      } else {
        ref && (ref.style.color = this.$vuetify.theme.dark ? "#7DBD56" : "#EF4D60");
      }
    },
    changeClassEl(OldVal, newVal) {
      if (OldVal < newVal) {
        this.iconState = true
      } else if (OldVal > newVal) {
        this.iconState = false
      }
    },
    changeSymbol(quoteCurrency, baseCurrency) {
      this.$refs.kLineWidget.updateTheme();
    },
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem(
          "theme",
          this.$vuetify.theme.dark ? "dark" : "light"
      );
      this.$refs.kLineWidget.updateTheme();
    },
  },
  created() {
    // ws.initWebSocket();
    // this.fetchSymbolList();
    // this.fetchOrderBookList();
    console.log(this.$refs)
    // this.getWsTrades();
  },
  mounted() {
    this.$store.state.authentication.status.loggedIn = false
    this.market()
    this.trades()
    this.marketSymbol()
    this.getOraclePrice().then((res) => {
      this.indexOracle = res || 0
    })
    setTimeout(() => {
      this.changeSymbol( 'TSLA', 'USDC')
    }, 1000)

    this.getFullData()
    setInterval(()=>{
      this.getFullData()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.requestInterval);
  },
};
</script>

<style scoped>

.market-content {
  width: calc(100% - 280px);
  margin-right: auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
}

.market-sidebar {
  width: 280px;
  border-top: none;
  border-left: 1px solid;
  border-color: var(--v-mainBorderColor-base) !important;
  height: auto;
  min-height: 100vh;
}

.favorites-item {
  display: flex;
  height: 100%;
  align-items: center;
  border-right: 1px solid var(--v-mainBorderColor-base);
}

.favorites-item-logged {
  display: flex;
  height: 100%;
}

.favorites-item p {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

.favorites-item span {
  padding: 0 8px;
}

.favorites-item svg {
  margin-right: 5px;
}

.market-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 12px 20px;
  border: 1px solid;
  border-top: 0;
  border-color: var(--v-mainBorderColor-base) !important;
}

.favorites-header {
  width: 100%;
  border-bottom: 1px solid;
  border-color: var(--v-mainBorderColor-base) !important;
}

.market-header .currencyName {
  margin-right: 75px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #272727;
  display: block;
  margin-bottom: 10px;
  width: 100%;
}
.market-header .last-price-wrap {
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
}
.marketPrice-label {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #A4A5AF;
  display: inline-block;
  margin-right: 10px;
}
.marketPrice-label.underline {
  text-decoration: underline;
}
.market-trading-widget {
  width: calc(100% - 285px);
  margin-right: auto;
}

.market-info {
  width: 284px;
  border-left: 1px solid;
  border-color: var(--v-mainBorderColor-base) !important;
}

.tab_sellbuy:last-child .tablinks {
  margin-right: 0;
}

.chart-form-wrap {
  margin-top: 0;
  border-bottom: 1px solid;
}

.market-header .last-price-wrap {
  flex-direction: column;
}

.trade-history-wrap {
  margin-bottom: 0px;
  overflow-y: auto;
  height: auto;
}

.open-orders {
  width: 100%;
  margin-top: 10px;
}

.order-history-table {
  width: 100%;
  margin-top: 10px;
}

.order-books-isAskFalse-wrap {
  padding-top: 20px;
  height: auto;
  position: relative;
  padding-bottom: 16px;
}
.chart-item-header {
  background: transparent;
  padding: 0 20px 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
}
.order-books:last-child {
  margin-bottom: 0;
  border-radius: 5px;
}
.order-books {
  padding: 0 20px;
  overflow-y: auto;
}
.last-price-wrapper {
  display: flex;
  margin-bottom: 15px;
  padding: 0px 20px;
  align-items: center;
  justify-content: space-between;
}
.last-price-item:last-child {
  margin-right: 0;
}

.last-price-item {
  margin-right: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 18px;
  color: #858495;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.last-price-item svg {
  width: 22px;
  height: 22px;
  display: block;
  object-fit: fill;
  margin-right: 13px;
}
.trade-history-main-wrap {
  padding-top: 20px;
  position: relative;
}

.trade-history-title {
  display: block;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  padding: 0px 20px;
  color: #ffffff;
  margin-bottom: 12px;
}

.SellBuy .tab {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 20px 0;
}

.tab_sellbuy {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}

.tablinks {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #A4A5AF;
  margin-right: 40px;
  padding-bottom: 5px;
  position: relative;
  transition: all 0.5s;
}

.tablinks:after {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  background: #fff;
  bottom: 0;
  height: 1px;
  opacity: 0;
  transition: all .5s;
}

.active .tablinks {
  color: #ffffff;
}

.active .tablinks:after {
  opacity: 1;
  background: linear-gradient(90deg, var(--v-primaryGradientFrom-base) 0%, var(--v-primaryGradientTo-base) 100%);
}


.tabcontent {
  flex-wrap: wrap;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 0px;
}

.local_input {
  width: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.label_input {
  display: block;
  margin-bottom: 20px;
  width: 100%;
}

.wrap_title_sell_buy {
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
  color: #858495;
}

.tabcontent form {
  width: 100%;
}

.chart .chart-item-header {
  display: none;
}

.market .table-title {
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 29px;
  color: #ffffff;
}

.table-title {
  display: block;
  margin-top: 30px;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #272727;
}

.market .table-wrap {
  border: none;
  border-radius: 0px;
}

.order-books-isAskFalse-title {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  padding: 0 20px;
  margin-bottom: 12px;
}

.order-books-isAskFalse-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px !important;
  margin-bottom: 12px;
}

.order-books-isAskFalse-items {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 24px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
}

.order-books-isAskFalse-items.selected,
.order-books-isAskFalse-items:hover {
  background: #282942;
  border-radius: 4px;
  color: #ffffff;
}

.order-books-price-title, .order-books-amount-title, .order-books-total-title {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #ffffff;
}

.order-books-currency {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #a4a5af;
  text-transform: uppercase;
}

.last-price-item-value {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  color: #56BD86;
}

.market-price-value-default {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
}

.market-price-value.yellow-color {
  color: #FFB200;
}

.trade-history-list {
  padding: 0 20px;
  max-height: 115px;
}

.order-books-isAskTrue {
  padding-bottom: 25px;
}

.market-header .last-price-title-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 192px;
  padding: 6px 13px;
  border-radius: 6px;
  margin-right: 24px;
  border: 1px solid var(--v-assetsBtnsHover-base) !important;
}

.market-header .last-price-title-wrap img {
  display: block;
  margin-right: 13px;
  width: 33px;
  height: 33px;
  object-fit: contain;
}

.market-header .last-price-title-wrap svg {
  display: block;
  margin-left: auto;
}

.market-header .last-price-wrap {
  margin-right: 24px;
}

.market-header .last-price-wrap:last-child {
  margin-right: 0;
}

.last-price-title {
  display: flex;
  flex-direction: column;
}

.last-price-title .last-price-title-amount {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #56BD86;

}

.last-price-title-name {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
}

.main_input-order-form {
  width: 240px;
  height: 16px;
  margin: 0 auto;
  position: relative;
  margin-top: 7px;
}
.order-form-list {
  display: flex;
  justify-content: space-between;
  position: absolute;
  padding: 0;
}
.order-form-item {
  width: 16px;
  height: 16px;
  border: 2px solid #111222;
  border-radius: 50%;
  margin-right: 40px;
  list-style: none;
  z-index: 100;
  position: relative;
  cursor: pointer;
}
.order-form-item span {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  position: absolute;
  left: 10px;
  transform: translateX(-50%);
  top: -25px;
  opacity: 0;
}
.order-form-list li:last-child span{
  left: auto;
  right: 0;
  transform: none;
}
.order-form-item:last-child {
  margin-right: 0;
}
.order-form-item.active {
  border: 2px solid #FFB200;
}
.order-form-item.active.old {
  border: 2px solid #111222;
  background: #FFB200;
}
.order-form-item.active.oldlast {
  background: #282942;
  border: 2px solid #FFB200;
}
.order-form-background-line  {
  position: absolute;
  width: 224px;
  height: 4px;
  background: #282942;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);

}
.order-form-progress-line {
  background: #FFB200;
  position: absolute;
  height: 4px;
  width: 50%;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  z-index: 90;
  transition: all ease 0.9s;
}
.order-form-buttons-wrapper {
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
  padding-bottom: 22px;
}

.order-form-buy-sell-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 20px;
}
.buy-sell-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 114px;
  height: 48px;
  border-radius: 6px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  background: #7DBD56;
  transition: .2s all;
}
.buy-sell-buttons:hover {
  background: #8fd662;
}
.buy-sell-buttons:last-child {
  background: #EF4D60;
}
.buy-sell-buttons:last-child:hover {
  background: #f15d6e;
}
.order-form-max-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.order-form-max-blocks {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #A4A5AF;
}

.order-form-max-blocks:last-child {
  text-align: right;
}
.max-blocks-item.item-amount {
  font-weight: normal;
}
.order-form-max-blocks span {
  font-weight: bold;
  margin-right: 4px;
}
.market-sidebar-top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;

}
.market-sidebar-top-left {
  display: flex;
}
.market-sidebar-top-left span {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  margin-right: 5px;
}
.market-sidebar-top-right {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
}

.v-application .trade-history-main-wrap {
  /*border-top: 1px solid;*/
  border-color: var(--v-mainBorderColor-base) !important;
}

.favorites-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.favorites-item {
  padding: 20px;
}

.order-form-type-fee {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #A4A5AF;
}

.order-form-type-fee p {
  margin-bottom: 8px;
}

.fee-btn {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  margin-right: 8px;
  border-radius: 4px;
}

.fee-btn svg {
  margin-right: 5px;
}

.holder-fee-btns .active {
  background-color: var(--v-switchColor-base);
  color: var(--v-revertPrimary-base);
}

</style>