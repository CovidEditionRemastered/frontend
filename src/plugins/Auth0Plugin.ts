import {Auth0Client} from "@auth0/auth0-spa-js";
import {Auth0} from "src/classLibrary/Core/Auth0";

declare module 'vue/types/vue' {
    interface Vue {
        $auth: Auth0,
        LoggedIn: boolean,
    }
}
export default {
    install(Vue: any, options: { client: Auth0Client, redirectCallback: Function }) {

        const c = new Auth0(options.client, options.redirectCallback);
        const o = Vue.observable(c);
        Vue.prototype.$auth = o;

        Vue.mixin({
            data: function () {
                return {
                    LoggedIn: false
                }
            },
            watch: {
                '$auth.isAuthenticated': {
                    deep: true,
                    immediate: true,
                    handler: function () {
                        Vue.set(this, "LoggedIn", o.isAuthenticated)
                    },
                }
            }
        })
    },
};
