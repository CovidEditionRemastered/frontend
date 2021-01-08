import {boot} from "quasar/wrappers";
import {Kore} from "@kirinnee/core";
import ResizePlugin from "src/plugins/ResizePlugin";
import Vue from 'vue';
import RouteSyncPlugin from "src/plugins/RouteSyncPlugin";
import GStorePlugin from "src/plugins/GStorePlugin";
import {GStore} from "@kirinnee/gstore";
import {StoreValue, StoreValueDefault} from "src/classLibrary/Core/StoreValue";
import {RAMValue, RAMValueDefault} from "src/classLibrary/Core/RAMValue";
import vueg from 'vueg';
import TabPlugin from "src/plugins/TabPlugin";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import DarkPlugin from "src/plugins/DarkPlugin";
import ApiPlugin from "src/plugins/ApiPlugin";

Vue.use(ResizePlugin);
Vue.use(RouteSyncPlugin);
Vue.use(GStorePlugin);
Vue.use(TabPlugin);
Vue.use(VueAwesomeSwiper)
Vue.use(DarkPlugin);
Vue.use(ApiPlugin);

// core inits
export default boot(({app, router}) => {


    Vue.use(vueg, router)
    // Core
    const core = new Kore();
    core.ExtendPrimitives();

    const old = app.data;
    app.data = function () {
        let prev: any = {}
        if (typeof old == "function") {
            prev = (old as any)()
        } else if (typeof old === "object") {
            prev = old;
        }
        prev.persistentStore = new GStore<StoreValue>(StoreValueDefault, true, "app-settings");
        prev.store = new GStore<RAMValue>(RAMValueDefault, false, "");
        return prev;
    }
    if (!app.methods) app.methods = {};
    app.methods.ChangeKey = function (storeKey: string) {
        (this as any).persistentStore = new GStore<StoreValue>(StoreValueDefault, true, storeKey);
    }

});
