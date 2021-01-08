<template>
    <q-page class="text-h4">
        My name is {{ routeParams.workerName }}
    </q-page>
</template>


<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';


@Component
    export default class Worker extends Vue {
    layoutTabs = [];
    routeParams = {
        workerName: ''
    }
}
</script>
