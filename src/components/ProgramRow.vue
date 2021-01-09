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
                <q-btn size="12px" flat dense round icon="delete" @click="del = true"/>
                <q-btn size="12px" flat dense round icon="play_arrow" v-if="!started" @click="Start"/>
                <q-circular-progress size="12px" indeterminate v-else/>
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
                    <q-btn icon="delete" color="negative" outline @click="deleteProgram">
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
import {DevicePrincipalResponse, ProgramResponse} from "src/classLibrary/response/models";
import {Alert} from "src/classLibrary/Alert";

const $$ = (s: number) => new Promise(resolve => setTimeout(resolve, s));

@Component({})
export default class ProgramRow extends Vue {
    del = false;
    started = false;

    @Prop() device!: DevicePrincipalResponse
    @Prop() program!: ProgramResponse

    async deleteProgram() {
        const token = await this.$auth.CoreToken;
        const r = await this.$api.QDelete(`Device/${this.device.id}/Program/${this.program.id}`, null, token);
        const a = new Alert(this.$q);
        if (r.isNone()) {
            a.Ok("Successfully deleted");
            this.del = false;
            this.$emit("delete");
            return;
        }
        const val = r.unwrap();
        console.error(val);
    }

    async Toggle() {
        const token = await this.$auth.CoreToken;
        this.device.powerState = !this.device.powerState;
        await this.$api.QPost(`Hardware/user/${this.device?.id}?state=${this.device?.powerState ? 'true' : 'false'}`, null, token);

    }

    async Start() {
        this.started = true;
        const r = JSON.parse(this.program.code);
        for (let i = 0; i < r.length; i++) {
            await this.Toggle();
            await $$(r[i] + 100);
        }
        this.started = false;

    }
}
</script>
