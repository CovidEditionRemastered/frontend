<template>
    <div>
        <swiper v-if="!error" ref="swipe-navigation" @slide-change="SlideChange" :options="options">
            <q-resize-observer @resize="onResize"/>
            <swiper-slide v-for="r in routes" :key="r.param" style="height: 100%" width="100%">
                <component :is="r.component"/>
            </swiper-slide>
        </swiper>
        <ErrorComponent v-else
                        :max-height="true"
                        :animation="$animations.errors.doggyCantSwim"
                        text="Error - Doggy can't Swim"
        />
    </div>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';
import {AsyncComponent, ComponentOptions} from "vue";
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import Container from "components/Core/Container.vue";
import ErrorComponent from "components/Core/ErrorComponent.vue";


type VueComponent = ComponentOptions<Vue> | typeof Vue | AsyncComponent;

export type SwipeRoute = {
    param: string
    component: VueComponent;
}


@Component({
    components: {ErrorComponent, Container, Swiper, SwiperSlide}
})
export default class SwipeComponent extends Vue {
    @Prop() routes!: SwipeRoute[];
    @Prop() params!: boolean;
    @Prop() paramKey!: string;

    routeParams: any = {}
    routeQueries: any = {}
    mount = false;

    error = false;

    options = {
        simulateTouch: false
    }

    mounted() {
        const parent = this;
        const key = this.params ? `routeParams.${this.paramKey}` : `routeQueries.${this.paramKey}`;
        this.$watch(key, function (val) {
            parent.error = !parent.routes.Map(x => x.param).Has(val);

            const a = parent.Routes[val];

            Vue.nextTick(() => {
                parent.toSlide(a.index);
                parent.mount = true;
            })


        }, {deep: true, immediate: true});
    }

    get Routes(): { [param: string]: { param: string, component: VueComponent, index: number } } {
        return this.routes.Map(({param, component}, i) => {
            return {param, component, index: i};
        }).AsValue(k => k.param).AsObject() as any;
    }

    onResize() {
        Vue.nextTick(() => {
            (this.$refs['swipe-navigation'] as any).$swiper.emit('resize');
        })
    }

    SlideChange(e: any) {
        const i = e.activeIndex as number;
        if (this.params) {
            this.routeParams[this.paramKey] = this.routes[i].param;
        } else {
            this.routeQueries[this.paramKey] = this.routes[i].param;
        }
    }

    toSlide(index: number) {
        const speed = this.mount ? 300 : 0;
        (this.$refs['swipe-navigation'] as any).$swiper.slideTo(index, speed);
    }

}
</script>
