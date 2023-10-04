import axios from 'axios';
import { getFromLocalStorage, saveToLocalStorage } from '../helpers';

const metamask = getFromLocalStorage('metamask');
const binance = getFromLocalStorage('binance');
const signString = getFromLocalStorage('auth-date');
const currentWallet = wallet();

const customAxios = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    // timeout: 20000
});

function wallet() {
    if (metamask) {
        if (!metamask.disconected) {
            return metamask;
        }
    }

    if (binance) {
        if (!binance.disconected) {
            return binance;
        }
    }

    return null;
}

function setHeaders(wallet) {
    return `${wallet.address}#${signString}#${wallet.signature}`;
}

const requestHandler = request => {
    if (currentWallet) {
        request.headers['Authentication'] = setHeaders(currentWallet);
    }
    return request;
};

const responseHandler = response => {
    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );

export default customAxios;