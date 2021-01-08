<template>
    <q-page class="bg-white">
        <ErrorComponent :max-height="true" :animation="$animations.errors.lochness"
                        text="Error - Lochness Monster Exists?"/>
    </q-page>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LottieAnimation from "components/Core/LottieAnimation.vue";
import Container from "components/Core/Container.vue";
import LottieHover from "components/Core/LottieHover.vue";
import ErrorComponent from "components/Core/ErrorComponent.vue";

@Component({
    components: {ErrorComponent, LottieHover, Container, LottieAnimation}
})
export default class Error404 extends Vue {
    layoutTabs = [];
}
</script>
