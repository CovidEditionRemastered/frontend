<template>
    <q-page class="sizing">
        <div class="fixed-bottom-right row justify-end" style="width: 110%">
            <LottieAnimation class="col-12 col-md-6" :data="$animations.welcome" loop/>
        </div>
        <h2 class="text-weight-thin text-center">Soapy</h2>
        <h5 class="text-weight-light text-center">The world at your finger tips</h5>

        <div class="row justify-center">

            <q-btn v-if="LoggedIn" color="primary justify-center row" @click="$router.push('/')">
                Let's Go
            </q-btn>
            <q-btn v-else color="primary" @click="$auth.Login()">
                Login/Register
            </q-btn>
        </div>
    </q-page>
</template>

<style lang='scss' scoped>
    .sizing {
        max-height: 100vh;
        border: 1px solid transparent;
        //overflow: hidden;
    }
</style>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';
import LottieAnimation from "components/Core/LottieAnimation.vue";
@Component({
    components: {LottieAnimation}
})
export default class Home extends Vue {

}
</script>
