<template>

    <Container :max-height="maxHeight" max-width="max-width" class="column q-mx-auto">
        <div class="col-9">
            <LottieHover :initial-play="true" :data="animation" class="full-height"/>
        </div>
        <div class="col-3 text-h6 text-weight-thin q-mx-auto">
            {{ text }}
        </div>
    </Container>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import LottieAnimation from "components/Core/LottieAnimation.vue";
import Container from "components/Core/Container.vue";
import LottieHover from "components/Core/LottieHover.vue";

@Component({
    components: {LottieHover, Container, LottieAnimation}
})
export default class ErrorComponent extends Vue {
    @Prop() animation!: object
    @Prop() text!: string;
    @Prop({default: undefined}) maxHeight?: boolean | number;
    @Prop({default: undefined}) maxWidth?: boolean | number;
}
</script>
