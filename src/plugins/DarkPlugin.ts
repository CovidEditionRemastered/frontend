declare module 'vue/types/vue' {
    interface Vue {
        dark: boolean,
    }
}
export default {
    install(Vue: any) {
        Vue.mixin({
            created() {
                const parent = this;
                Object.defineProperty(this, 'dark', {
                    get(): boolean {
                        return parent.$q.dark.isActive;
                    },
                    set(dark: boolean) {
                        this.$q.dark.set(dark);
                        localStorage.setItem('dark-mode', JSON.stringify(dark));
                    }
                })
            }
        })
    },
};
