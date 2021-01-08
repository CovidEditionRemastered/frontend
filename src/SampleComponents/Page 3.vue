<template>
    <q-list bordered>
        <q-item clickable v-ripple v-for="i in 5">
            <q-item-section avatar>
                <q-icon color="primary" name="bluetooth"/>
            </q-item-section>

            <q-item-section>Icon as avatar {{ i }}</q-item-section>
        </q-item>
    </q-list>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';


@Component
export default class Page3 extends Vue {

}
</script>
