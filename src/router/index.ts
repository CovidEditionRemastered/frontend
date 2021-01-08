import {route} from 'quasar/wrappers';
import VueRouter from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route(function ({Vue}) {
    Vue.use(VueRouter);

    return new VueRouter({
        scrollBehavior: () => ({x: 0, y: 0}),
        routes,
        mode: process.env.VUE_ROUTER_MODE,
        base: process.env.VUE_ROUTER_BASE
    });
})
