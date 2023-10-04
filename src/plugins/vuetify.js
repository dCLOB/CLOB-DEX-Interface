import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)



const opts = {}

export default new Vuetify({
    theme: {
        dark: localStorage.getItem('theme') === 'dark',
        themes: {
            light: {
                primary: '#fff',
                revertPrimary: '#111223',
                textMainColor: '#111223',
                textSecondaryColor: '#828393',
                textSecondaryRevert: '#111223',
                textAccentColor: '#ffb200',
                primaryBg: '#fff',
                secondary: '#b0bec5',
                switchColor: '#EBEBF0',
                accent: '#ffb200',
                error: '#b71c1c',
                mainBorderColor: '#E0E0E6',
                walletHoverBGColor: '#F3F3F7',
                btnCancelHover: '#F3F3F7',
                btnTryHover: '#FFC233',
                marketHeaderButton: '#F3F3F7',
                primaryColor: '#111223',
                assetsBtnsHover: '#F3F3F7',
                textFormMaxColor: '#828393',
                orderFormProgressItemBg: '#fff',
                orderFormProgressItemBorderActive: '#FFB200',
                inputBg: '#FFFFFF',
                blackwhite: '#1C1D38',
                orderBackgroundLineRed: '#FDE6E5',
                orderBackgroundLineGreen: '#E6F5ED',
                primaryGradientFrom: '#FC7648',
                primaryGradientTo: '#FC4981',
            },
            dark: {
                primary: '#16172e',
                revertPrimary: '#fff',
                textMainColor: '#fff',
                textSecondaryColor: '#A4A5AF',
                textSecondaryRevert: '#fff',
                textAccentColor: '#ffb200',
                primaryBg: '#16172C',
                secondary: '#424242',
                switchColor: '#3E3F55',
                accent: '#ffb200',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                mainBorderColor: '#282942',
                walletHoverBGColor: '#1C1D38',
                btnCancelHover: '#3E3F55',
                btnTryHover: '#FFC233',
                marketHeaderButton: '#282944',
                primaryColor: '#fff',
                assetsBtnsHover: '#3E3F55',
                textFormMaxColor: '#A4A5AF',
                orderFormProgressItemBg: '#282942',
                orderFormProgressItemBorderActive: '#FFB200',
                inputBg: '#16172C',
                blackwhite: '#FFFFFF',
                orderBackgroundLineRed: '#422332',
                orderBackgroundLineGreen: '#23383E',
                primaryGradientFrom: '#FC7648',
                primaryGradientTo: '#FC4981',
            },
        },
        options: {
            customProperties: true,
        },
    },
})