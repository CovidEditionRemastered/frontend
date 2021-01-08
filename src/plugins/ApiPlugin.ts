import {Api} from "src/classLibrary/Core/Api";

declare module 'vue/types/vue' {
    interface Vue {
        $api: Api;
    }
}

export default {
    install(Vue: any) {
        const api = new Api(process.env.API ?? "http://core.localhost:4001");
        Vue.prototype.$api = api;
    }
};


