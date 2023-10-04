import Router from 'vue-router';
import { alert } from './alert.module';
import Home from '../pages/Home.vue'
import Trading from "../pages/Trading"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/trading/:id?",
        name: "Trading",
        component: Trading,
    },
    {
        path: '*',
        redirect: '/'
    },
];

export const router = new Router({
    mode: 'history',
    routes,
    linkActiveClass: "active",
    modules: {
        alert,
        status,
    }
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        return next()
    }else {
        return next();
    }
})

export default router;
