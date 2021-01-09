<template>
    <div>
        <q-btn icon="add" fab class="absolute-bottom-right q-mx-md lower" color="accent" @click="add = true"/>
        <q-dialog v-model="add">
            <div style="background: white" class="dialog-k q-pa-xl">
                <h5 style="margin: 0">Add New Trigger</h5>
                <q-form @submit="onSubmit" class="q-gutter-md">
                    <q-input label="Name" v-model="name" filled hint="Trigger Name" :rules="nameRule"></q-input>
                    <q-input label="Code" filled v-model="code" hint="Javascript Code" :rules="codeRule"></q-input>
                    <div class="row justify-between">
                        <q-btn outline @click="add = false">Back</q-btn>
                        <q-btn label="Submit" type="submit" color="primary"></q-btn>
                    </div>
                </q-form>
            </div>
        </q-dialog>
    </div>
</template>

<style lang='scss' scoped>
.lower {
    transform: translateY(50%);
}

.dialog-k {
    width: 100%;
    max-width: 600px;
}
</style>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';
import {TriggerResponse} from "src/classLibrary/response/models";
import {ApiError} from "src/classLibrary/Core/Api";
import {Alert} from "src/classLibrary/Alert";

const requiredRule: any = (val: any) => val && val.length > 0 || 'Required'
@Component({})
export default class AddTrigger extends Vue {
    add = false;
    name: string = '';
    code: string = '';
    nameRule: any[] = [requiredRule];
    codeRule: any[] = [requiredRule];
    @Prop() deviceId!: string;

    async onSubmit() {
        const token = await this.$auth.CoreToken;

        const response = await this.$api.Post<TriggerResponse>(`Device/${this.deviceId}/Trigger`, {
            name: this.name,
            code: this.code
        }, token);

        const a = new Alert(this.$q);
        const p = this;
        response.match({
            err(val: ApiError) {
                a.Bad("Error occurred");
                console.error(val);
            }, ok(val) {
                a.Ok(val.name + " has been added");
                p.add = false;
                p.$emit("added");
            }
        });
    }
}
</script>
