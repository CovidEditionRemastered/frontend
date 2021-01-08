<template>
    <q-layout view="hHh lpR fFf">

        <q-page-container>
            <router-view id="main-page"/>
        </q-page-container>

    </q-layout>
</template>


<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';


@Component
export default class EmptyLayout extends Vue {

}
</script>
