export default {

    install(Vue: any) {


        Vue.mixin({

            created() {
                if (this.onResize) {
                    window.addEventListener('resize', this.onResize);
                }

            },

            destroyed() {

                if (this.onResize) {
                    window.removeEventListener('resize', this.onResize);
                }
            }
        })
    }
};


