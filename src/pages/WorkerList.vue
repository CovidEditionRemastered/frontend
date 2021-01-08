<template>
    <q-page>
        <q-list>
            <q-item v-for="w in workers" clickable :to="`/worker/${w}`" :key="w">
                {{ w }}
            </q-item>
        </q-list>
    </q-page>
</template>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';

@Component
    export default class WorkerList extends Vue {
    workers = ["John", "Marry", "Jerry", "Wei Jie", "China", "Sheryl", "Ernest", "Ching Wee", "Jing Ying", "Charmaine", "Natalie", "Bryan",
        "Kenny", "Irene", "Bok", "Karin", "karen", "Jia ni", "Rachael", "Chin Chee", "Aloysious", "Yu Hann", "Hannah", "Calvin"
        , "Yu Xuan", "Jing yi"];
    layoutTabs = [];
}
</script>
