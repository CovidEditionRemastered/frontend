export default {


    install(Vue: any) {

        Vue.mixin({

            mounted() {
                if (this.layoutTabs) {
                    this.Store.StoreValue.tabs = this.layoutTabs;
                }

            },
        })
    }
};

