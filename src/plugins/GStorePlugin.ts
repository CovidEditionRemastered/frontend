import {GStore} from "@kirinnee/gstore";
import {StoreValue} from "src/classLibrary/Core/StoreValue";
import {RAMValue} from "src/classLibrary/Core/RAMValue";

declare module 'vue/types/vue' {
    interface Vue {
        Store: GStore<RAMValue>
        PersistentStore: GStore<StoreValue>;
        ChangeStoreKey: (s: string) => void;
    }
}

export default {
    install(Vue: any) {

        Object.defineProperty(Vue.prototype, 'ChangeStoreKey', {
            get() {
                return this.$root.ChangeKey;
            }
        })

        Object.defineProperty(Vue.prototype, "PersistentStore", {
            get(): any {
                return this.$root.persistentStore;
            }
        })

        Object.defineProperty(Vue.prototype, "Store", {
            get(): any {
                return this.$root.store;
            }
        })
    }
};


