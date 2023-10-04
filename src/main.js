import {ValidationProvider, ValidationObserver, extend} from "vee-validate";
import {required, min_value, max_value, min, max, email} from 'vee-validate/dist/rules.umd.js'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import '@kouts/vue-modal/dist/vue-modal.css'
import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import VueI18n from 'vue-i18n'
import router from './router'
import store from './store'
import '@/assets/css/normalize.css';
import '@/assets/css/main.css'
import customAxios from './api/$axios';

// setup fake backend
import {configureFakeBackend} from './helpers';

configureFakeBackend();

window.$axios = customAxios;

Vue.use(VueI18n)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('vueCustomScrollbar', vueCustomScrollbar)
Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },
});

//
const messages = {
    en: {
        buy: 'Buy',
        priceTextPrice: 'Price',
        homePage: 'Homepage',
        swaps: 'Swaps',
        data: 'Data',
        knowledgeBase: 'Knowledge Base',
        reports: 'Reports',
        network: 'Network',
        connectWallet: 'Connect Wallet',
        index: 'Index',
        premium: 'Premium',
        fundingCountdown: 'Funding / Countdown',
        twentyFourChange: '24h Change',
        twentyFourHigh: '24h High',
        twentyFourLow: '24h Low',
        twentyFourVolumeTSLA: '24h Volume',
        twentyFourVolumeUSDT: '24h Volume',
        orderBook: 'Order Book',
        size: 'Size',
        sum: 'Sum',
        crossTrading: 'Cross',
        limit: 'Limit',
        market: 'Market',
        stopLimit: 'Stop Limit',
        trades: 'Trades',
        amount: 'Amount',
        time: 'Time',
        positions: 'Positions',
        openOrders: 'Open Orders',
        history: 'History',
        emptyPositionsText: 'There are no positions yet.',
        emptyOpenOrdersText: 'There are no orders yet.',
        emptyHystoryText: 'There are no data yet.',
        wrongConnection: 'Wrong Connection',
        wrongConnectionMessage: 'Access to the wallet was rejected. The connection couldn\'t be established.',
        cancelText: 'Cancel',
        modalBtnTryAgainText: 'Try Again',
        switchNetwork: 'Switch Network',
        switchNetworkMessage: 'We\'ve detected an Unsupported network. Please, use Binance Smart Chain network in your wallet.',
        tradingPostCallateral: 'Post Callateral',
        tradingAssets: 'Assets',
        tradingBalance: 'Trading Balance',
        tradingUnrealizedPNL: 'Unrealized PNL',
        tradingToken: 'Token',
        tradingBuyLongBtnText: 'Buy/Long',
        tradingSellShortBtnText: 'Sell/Short',
        tradingMax: 'Max',
        tradingDepositBtnText: 'Deposit',
        tradingWithdrawBtnText: 'Withdraw',
        tradingMarginData: 'Margin Data',
        tradingPortfolioLeverage: 'Portfolio Leverage',
        tradingMinMargin: 'Min Margin',
        tradingEquity: 'Equity',
        pair: 'Pair',
        accordeonOptionsBasePrice: 'Base Price',
        basePrice: 'Base Price',
        accordeonOptionsLiqPrice: 'Liq Price',
        accordeonOptionsPL: 'P/L',
        accordeonOptionsPLPerc: 'P/L%',
        accordeonOptionsNA: 'N/A',
        type: 'Type',
        accordeonOptionsPlaced: 'Placed',
        accordeonAverageExecutionPrice: 'Average Execution Price',
        status: 'Status',
        inactive: 'Inactive',
        favorites: 'Favorites',
        teslaAboutText: 'The brainchild of Elon Mask, the famous enterpreneur, this tech firm create: electric cars, solar roof panels and energy storage systems.'
    },
    ru: {
        buy: 'Купить',
        priceTextPrice: 'Цена',
        homePage: 'На главную',
        swaps: 'Свопы',
        data: 'Данные',
        knowledgeBase: 'База знаний',
        reports: 'Отчеты',
        network: 'Сеть',
        connectWallet: 'Подключить кошелек',
        index: 'Показатель',
        premium: 'Премиум',
        fundingCountdown: 'Финансирование / Обратный отсчет',
        twentyFourChange: '24ч Изменения',
        twentyFourHigh: '24ч Высший',
        twentyFourLow: '24ч Низший',
        twentyFourVolumeTSLA: '24ч Объем',
        twentyFourVolumeUSDT: '24ч Объем',
        orderBook: 'Книга заказов',
        size: 'Размер',
        sum: 'Сумма',
        crossTrading: 'Пересечения',
        limit: 'Лимит',
        market: 'Рынок',
        stopLimit: 'Стоп лимит',
        trades: 'Торги',
        amount: 'Количество',
        time: 'Время',
        positions: 'Позиции',
        openOrders: 'Открытые заказы',
        history: 'История',
        emptyPositionsText: 'Позиций пока нет.',
        emptyOpenOrdersText: 'Заказов пока нет.',
        emptyHystoryText: 'Данных пока нет.',
        wrongConnection: 'Соединение не установлено',
        wrongConnectionMessage: 'Доступ к кошельку был отклонен. Не удалось установить соединение.',
        cancelText: 'Отмена',
        modalBtnTryAgainText: 'Попробовать снова',
        switchNetwork: 'Переключить сеть',
        switchNetworkMessage: 'Мы обнаружили неподдерживаемую сеть. Пожалуйста, используйте сеть Binance Smart Chain в своем кошельке.',
        tradingPostCallateral: 'Размещать обеспечение',
        tradingAssets: 'Ресурсы',
        tradingBalance: 'Торговый баланс',
        tradingUnrealizedPNL: 'Нереализованная PNL',
        tradingToken: 'Токен',
        tradingBuyLongBtnText: 'Купить / Продлить',
        tradingSellShortBtnText: 'Продать / Сократить',
        tradingMax: 'Максимум',
        tradingDepositBtnText: 'Депозит',
        tradingWithdrawBtnText: 'Отозвать',
        tradingMarginData: 'Данные о запасе',
        tradingPortfolioLeverage: 'Портфолио использования',
        tradingMinMargin: 'Мин запас',
        tradingEquity: 'Капитал',
        pair: 'Пара',
        accordeonOptionsBasePrice: 'Базовая цена',
        accordeonOptionsLiqPrice: 'Цена Liq',
        accordeonOptionsPL: 'P/L',
        accordeonOptionsPLPerc: 'P/L%',
        accordeonOptionsNA: 'N/A',
        type: 'Тип',
        accordeonOptionsPlaced: 'Размещен',
        accordeonAverageExecutionPrice: 'Средняя цена исполнения',
        status: 'Статус',
        inactive: 'Неактивный',
        favorites: 'Избранные',
        teslaAboutText: 'Эта техническая фирма, детище известного предпринимателя Илона Маска, создает: электромобили, солнечные панели на крыше и системы хранения энергии.'
    },
    es: {
        buy: 'Comprar',
        priceTextPrice: 'Precio',
        homePage: 'Página principal',
        swaps: 'Intercambios',
        data: 'Datos',
        knowledgeBase: 'Base de conocimientos',
        reports: 'Informes',
        network: 'La red',
        connectWallet: 'Conectar billetera',
        index: 'Índice',
        premium: 'Prima',
        fundingCountdown: 'Financiamiento / Cuenta regresiva',
        twentyFourChange: 'Cambio 24h',
        twentyFourHigh: '24h alto',
        twentyFourLow: 'Bajo 24h',
        twentyFourVolumeTSLA: 'Volumen de 24h',
        twentyFourVolumeUSDT: 'Volumen de 24h',
        orderBook: 'Libro de pedidos',
        size: 'Tamaño',
        sum: 'Suma',
        crossTrading: 'Cruzar',
        limit: 'Límite',
        market: 'Mercado',
        stopLimit: 'Límite de parada',
        trades: 'Vientos alisios',
        time: 'Hora',
        positions: 'Posiciones',
        openOrders: 'Ordenes abiertas',
        history: 'Historia ',
        emptyPositionsText: 'Aún no hay posiciones.',
        emptyOpenOrdersText: 'Aún no hay pedidos.',
        emptyHystoryText: 'Aún no hay datos.',
        wrongConnection: 'Conexión incorrecta ',
        wrongConnectionMessage: 'Se rechazó el acceso a la billetera. No se pudo establecer la conexión.',
        cancelText: 'Cancelar',
        modalBtnTryAgainText: 'Intentar otra vez',
        switchNetwork: 'Cambiar de red',
        switchNetworkMessage: 'Hemos detectado una red no admitida. Por favor, use la red Binance Smart Chain en su billetera.',
        tradingPostCallateral: 'Publicar garantía',
        tradingAssets: 'Activos',
        tradingBalance: 'Balance comercial',
        tradingUnrealizedPNL: 'PNL no realizado',
        tradingToken: 'Simbólico',
        tradingBuyLongBtnText: 'Compra / Largo',
        tradingSellShortBtnText: 'Vender corto',
        tradingMax: 'Max',
        tradingDepositBtnText: 'Depositar',
        tradingWithdrawBtnText: 'Retirar',
        tradingMarginData: 'Datos de margen',
        tradingPortfolioLeverage: 'Apalancamiento de la cartera',
        tradingMinMargin: 'Margen mínimo',
        tradingEquity: 'Margen mínimo',
        pair: 'Par',
        amount: 'Monto',
        accordeonOptionsBasePrice: 'Precio base',
        accordeonOptionsLiqPrice: 'Precio de Liq',
        accordeonOptionsPL: 'P/L',
        accordeonOptionsPLPerc: 'P/L%',
        accordeonOptionsNA: 'N/A',
        type: 'Type',
        accordeonOptionsPlaced: 'Metido',
        accordeonAverageExecutionPrice: 'Precio de ejecución medio',
        status: 'Estado',
        inactive: 'Inactivo',
        favorites: 'Favoritos',
        teslaAboutText:'La creación de Elon Mask, el famoso empresario, crea esta firma de tecnología: automóviles eléctricos, paneles de techo solar y sistemas de almacenamiento de energía.'
    }
}


// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'en',
    messages, // set locale messages
})


extend('required', {
    ...required,
    message: 'This field is required'
});

extend('email', {
    ...email,
    message: 'Please enter a valid email address.'
});


extend('min_value', {
    ...min_value,
    message: "Must be higher than {min}"
});

extend('max_value', {
    ...max_value,
    message: "Must be less than {max}"
});


extend('positive', value => {
    return value.length > 0;
});

extend("min", {
        ...min,
        message: "Please enter at least 2 characters."
    },
);
extend("max", max);


export default new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App),
})

