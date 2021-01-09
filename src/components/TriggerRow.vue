<template>
    <q-item>
        <q-item-section>
            <q-item-label lines="1">{{ trigger.name }}</q-item-label>
            <q-item-label caption lines="2">
                {{ trigger.id }}
            </q-item-label>
        </q-item-section>

        <q-item-section top side>
            <div clas="text-grey-8 q-gutter-xs">
                <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="del = true"></q-btn>
            </div>
        </q-item-section>
        <q-dialog v-model="del">
            <q-card class="q-pa-md q-gutter-md">
                <h6>Delete Trigger</h6>
                <div class="text-body2">Are you sure you want to delete this trigger?</div>
                <div class="row justify-between">
                    <q-btn flat @click="del = false">
                        Back
                    </q-btn>
                    <q-btn icon="delete" color="negative" outline @click="deleteTrigger">
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
import {DevicePrincipalResponse, TriggerResponse} from "src/classLibrary/response/models";
import {Alert} from "src/classLibrary/Alert";

@Component({})
export default class TriggerRow extends Vue {
    @Prop() device!: DevicePrincipalResponse
    @Prop() trigger!: TriggerResponse

    del = false;

    async deleteTrigger() {
        const token = await this.$auth.CoreToken;
        const resp = await this.$api.QDelete(`Device/${this.device.id}/Trigger/${this.trigger.id}`, null, token);

        const alert = new Alert(this.$q);
        if (resp.isNone()) {
            alert.Ok("Successfully deleted");
            this.del = false;
            this.$emit("delete");
            return;
        }
        const val = resp.unwrap();
        console.error(val);
    }
}
</script>
