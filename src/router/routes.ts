import {RouteConfig} from 'vue-router';
import Error404 from "pages/Error404.vue";
import Index from "pages/Index.vue";
import SwipeSample from "pages/SwipeSample.vue";
import Home from "pages/Home.vue";
import DeviceConfiguration from "pages/DeviceConfiguration.vue";


const routes: RouteConfig[] = [
    {
        name: 'dashboard',
        path: '/',
        component: Index,
        meta: {
            transition: {},
            auth: [false, true]
        },
    },
    {
        name: 'dashboard',
        path: '/:deviceId',
        component: DeviceConfiguration,
        meta: {
            transition: {},
            auth: [false, true]
        },
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: {
            auth: [true, true]
        }
    },
    {
        name: 'swiper',
        path: '/swiper/:tab',
        component: SwipeSample,
        meta: {
            auth: [true, true]
        }
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: Error404
    }
];

export default routes;
