<template>
    <q-page>
        {{ API }}
        <q-input v-model="routeParams.matrixSize" label="Matrix Size"/>
        <q-input v-model="routeQueries.value" label="Matrix Value"/>
        <table>
            <tr v-for="i1 in Size">
                <td v-for="i2 in Size">
                    {{ i1 + i2 }} {{ Value }}
                </td>
            </tr>
        </table>
        <SampleCrossComponentSync/>
    </q-page>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';
import {Tab} from "src/classLibrary/Core/StrongTyping/Tabs";
import SampleCrossComponentSync from "src/SampleComponents/SampleCrossComponentSync.vue";

@Component({
    components: {SampleCrossComponentSync}
})
export default class MatrixDisplay extends Vue {
    routeParams = {
        matrixSize: '1',
    }
    routeQueries = {
        value: '20'
    }

    layoutTabs: Tab[] = [
        {
            label: "hey",
            link: "/",
        },
        {
            label: "Not found",
            link: "/notfound",

        }
    ]

    get API(): string {
        return process.env.API ?? 'none';
    }

    async init() {
        console.log("Initialized");
    }

    onMissingParam() {
        console.log('No Size !!');
    }

    get Value(): string {
        return this.routeQueries.value.Repeat(2);
    }

    get Size(): number {
        try {
            return this.routeParams.matrixSize.ToInt().AtMax(10);
        } catch {
            return 1;
        }

    }
}
</script>
