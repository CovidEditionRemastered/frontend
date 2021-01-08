<template>
    <div>
        <q-input label="name" value="" v-model="PersistentStore.StoreValue.sampleValue"/>
        <br>
        <q-input label="telephone" value="" @input="onInput"/>
        <br>
        <q-input label="address" value=""/>
        <br>
        <q-input label="helper" value=""/>
        <br>
    </div>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';


@Component
export default class Page1 extends Vue {
    onInput(v: string) {
        this.ChangeStoreKey(v);
    }
}
</script>
