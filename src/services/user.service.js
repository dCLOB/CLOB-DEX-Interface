import {authHeader} from '../helpers';
import LocalStorageService from "../services/LocalStorageService";
import instance from "../api/instance";
import axios from "axios";
export const userService = {
    login,
    logout,
    getAll
};

// LocalstorageService
const localStorageService = LocalStorageService.getService();

function login(username, password) {
    const requestOptions = { username, password };

    return instance.post('/api/v1/login', requestOptions)
        .then(res => {
            console.dir(res.data.body.tokenUser)
            if (res.data.body.tokenUser) {
                localStorage.setItem('isLogged', true);
                localStorage.setItem('access_token', JSON.stringify(res.data.body.tokenUser.access_token));
                localStorage.setItem('refresh_token', JSON.stringify(res.data.body.tokenUser.refresh_token));
                localStorage.setItem('headerPhoto', JSON.stringify(res.data.body.tokenUser.user.photo));
                localStorage.setItem('headerFirstName', JSON.stringify(res.data.body.tokenUser.user.username));
                if(res.data.body.tokenUser.user) {
                    localStorage.setItem('user', JSON.stringify(res.data.body.tokenUser.user));
                }
            }

            return res.data.body.tokenUser.user;
        });
}

function logout() {
    return instance.post('/api/v1/logout')
    .then(res => {
        localStorageService.clearToken();
    });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://172.31.18.236:8080/api/v1/login`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.errors[0].message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}