<template>
    <q-item>

        <q-item-section>
            <q-item-label lines="1">{{ program.name }}</q-item-label>
            <q-item-label caption lines="2">
                {{ program.code }}
            </q-item-label>
        </q-item-section>

        <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
                <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="del = true"/>
                <q-btn class="gt-xs" size="12px" flat dense round icon="play_arrow" v-if="!started" @click="Start"/>
                <q-circular-progress class="gt-xs" size="12px" indeterminate v-else/>
            </div>
        </q-item-section>
        <q-dialog v-model="del">
            <q-card class="q-pa-md q-gutter-md">
                <h6>Delete Program</h6>
                <div class="text-body2">Are you sure you want to delete this program?</div>
                <div class="row justify-between">
                    <q-btn flat @click="del = false">
                        Back
                    </q-btn>
                    <q-btn icon="delete" color="negative" outline>
                        Delete
                    </q-btn>
                </div>
            </q-card>
        </q-dialog>
    </q-item>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ProgramResponse} from "src/classLibrary/response/models";

const $$ = val => new Promise(resolve => setTimeout(resolve, val));

@Component({})
export default class ProgramRow extends Vue {
    del = false;
    started = false;

    @Prop() program!: ProgramResponse

    async Start() {
        this.started = true;
        await $$(2000);
        this.started = false;

    }
}
</script>
