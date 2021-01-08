<template>
    <div @mouseenter="enter" @mouseleave="leave" ref="lottie-frame">

    </div>
</template>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';
import lottie, {AnimationItem} from 'lottie-web'

@Component
export default class LottieHover extends Vue {
    @Prop() data!: any;
    @Prop() speed?: number;
    @Prop() initialPlay?: boolean;

    animation?: AnimationItem;

    enter() {
        this.animation?.setDirection(1);
        this.animation?.setSpeed(this.speed ?? 1);
        this.animation?.play();
    }

    leave() {
        this.animation?.setDirection(-1);
        this.animation?.setSpeed(this.speed ?? 1);
        this.animation?.play();
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
            if (this.initialPlay)
                this.animation?.play()
        }
    }
</script>
