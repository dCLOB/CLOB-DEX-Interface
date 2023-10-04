import { https } from "./axios";

// export const BASE_URL = "https://api.huobi.pro";

export const API_URL_REAL = 'http://deridex-dev.ml:3001/v1/';

export const API_URL = {
    common_symbols: "/v1/common/symbols",
    history_kline: "/market/history/kline",
    order_book_kline: "/market/depth",
};

// export async function apiGet(url, params, config) {
//     // console.log('config', config)
//     let _url = API_URL[url];
//     _url = _url ? `${BASE_URL}${_url}` : url;
//     _url = params ? _url + params : _url;
//     const res = await https.get(_url, config).catch(() => {
//         return;
//     });
//     return res ? res.data : void 0;
// }
//
// export async function apiPost(url, params, config) {
//     let _url = API_URL[url];
//     _url = _url ? `${BASE_URL}${_url}` : url;
//     const res = await https.post(_url, params, config).catch(() => {
//         return;
//     });
//     return res ? res.data : void 0;
// }

export async function apiGetNew(url, params, config) { // use interceptor what is config and params
    // let _url = API_URL[url];
    let _url = `${API_URL_REAL}${url}`;
    // _url = _url ? `${API_URL_REAL}${_url}` : url;
    _url = params ? _url + params : _url;
    const res = await https.get(_url, config).catch(() => {
        return;
    });
    return res ? res.data : void 0;
}
