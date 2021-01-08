<template>
    <div>
        <q-btn icon="edit" flat @click="openDialog">Edit</q-btn>
        <q-dialog v-model="edit">
            <div style="background: white" class="dialog-k q-pa-md">
                <h5 style="margin: 0">Edit Device</h5>
                <q-form @submit="onSubmit"
                        class="q-gutter-md">
                    <q-input filled
                             label="Name"
                             v-model="name"
                             hint="Identify your device with this name"
                             :rules="nameRule"
                    />
                    <q-input label="Description" filled v-model="description" hint="Description for the device"/>
                    <div class="row justify-between">
                        <q-btn outline @click="edit = false">Back</q-btn>
                        <q-btn label="Submit" type="submit" color="primary"/>
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
import {ApiError} from "src/classLibrary/Core/Api";

const requiredRule: any = (val: any) => val && val.length > 0 || 'Required'

@Component({})
export default class EditDevice extends Vue {
    @Prop() originalName!: string;
    @Prop() originalDescription!: string;
    @Prop() uuid!: string;
    edit = false;
    name = "";
    description = "";

    nameRule: any[] = [requiredRule];

    openDialog() {
        this.name = this.originalName;
        this.description = this.originalDescription;
        this.edit = true;
    }

    async onSubmit() {
        const token = await this.$auth.CoreToken;
        const a = new Alert(this.$q);
        const r = await this.$api.Put(`Device/${this.uuid}`, {
            name: this.name,
            description: this.description,
        }, token)
        const p = this;
        r.match({
            err(val: ApiError) {
                a.Bad("Error");
                console.error(val);
            }, ok() {
                a.Ok("Successfully edited device");
                p.edit = false;
                p.$emit('edit');
            }
        })
    }


}
</script>
