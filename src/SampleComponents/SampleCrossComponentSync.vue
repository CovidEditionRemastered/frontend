<template>
    <div>
        {{ routeQueries.value }}
    </div>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';


@Component
export default class SampleCrossComponentSync extends Vue {
    routeQueries = {
        value: '20'
    }
}
</script>
