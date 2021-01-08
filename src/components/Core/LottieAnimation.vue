<template>
    <div ref="lottie-frame" class="animation">

    </div>
</template>
<style lang="scss">
.animation {
    position: relative;
}
</style>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';
import lottie from 'lottie-web'

@Component
export default class LottieAnimation extends Vue {
    @Prop() data!: any;
    @Prop() speed?: number;
    @Prop() loop?: boolean

    mounted() {
        const e = this.$refs['lottie-frame'] as HTMLElement;
        lottie.loadAnimation({
            container: e,
            renderer: 'svg',
            loop: this.loop ?? true,
            autoplay: true,
            animationData: this.data,
        }).setSpeed(this.speed ?? 1)
    }
}
</script>
