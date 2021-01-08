<template>
    <div @click="play" ref="lottie-frame">

    </div>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';
import lottie, {AnimationItem} from 'lottie-web'

@Component
export default class LottieToggle extends Vue {
    @Prop() data!: any;
    @Prop() speed?: number;

    animation?: AnimationItem;
    toggle = false;

    play() {
        this.animation?.setSpeed(this.speed ?? 1);
        if (this.toggle) {
            this.animation?.setDirection(1)
        } else {
            this.animation?.setDirection(-1)

        }
        this.animation?.play();
        this.toggle = !this.toggle;
    }

    mounted() {
        const e = this.$refs['lottie-frame'] as HTMLElement;
        this.animation = lottie.loadAnimation({
            container: e,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: this.data
        })
    }
}
</script>
