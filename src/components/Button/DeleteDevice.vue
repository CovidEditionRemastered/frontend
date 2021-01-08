<template>
    <div>
        <q-btn icon="delete" color="negative" outline @click="del = true">Delete</q-btn>
        <q-dialog v-model="del">
            <div style="background: white" class="dialog-k q-pa-md">
                <h5 style="margin: 0">Deleting {{ name }}</h5>
                <q-form @submit="onSubmit"
                        class="q-gutter-md">
                    <q-input label="Name of Device" v-model="typedName"
                             color="negative"
                             filled hint="Type name of device to delete"
                             :rules="rule"
                    />
                    <div class="row justify-between">
                        <q-btn outline @click="del = false">Back</q-btn>
                        <q-btn label="Delete" icon="delete" outline type="submit" color="negative"/>
                    </div>
                </q-form>
            </div>

        </q-dialog>
    </div>
</template>

<style lang='scss' scoped>
.dialog-k {
    width: 100%;
    max-width: 600px;
}
</style>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Alert} from "src/classLibrary/Alert";

@Component({})
export default class EditDevice extends Vue {
    @Prop() name!: string;
    @Prop() uuid!: string;

    del = false;
    typedName = '';

    rule: any[] = [(val: any) => val && val == this.name || 'Does not match'];

    async onSubmit() {
        const token = await this.$auth.CoreToken;
        const r = await this.$api.QDelete(`Device/${this.uuid}`, null, token);
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

}
</script>
