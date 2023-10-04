import  { userService } from '../services';
import LocalStorageService from "../services/LocalStorageService";
import router from '../router'

// LocalstorageService
const localStorageService = LocalStorageService.getService();

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true } }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}) {
            commit('loginRequest');
        },
        logout({commit}) {
            commit('logout');
        }
    },
    mutations: {
        loginRequest(state) {
            state.status = { loggedIn: true };
        },
        loginSuccess(state) {
            state.status = { loggedIn: true };
        },
        loginFailure(state) {
            state.status = { loggedIn: false };
        },
        logout(state) {
            state.status = { loggedIn: false };
        }
    }
}
