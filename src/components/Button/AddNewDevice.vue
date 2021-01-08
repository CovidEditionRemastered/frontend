<template>
    <div>
        <q-btn icon="add" fab class="fixed-bottom-right q-ma-md" color="accent" @click="add = true"/>
        <q-dialog v-model="add">
            <div style="background: white" class="dialog-k q-pa-md">
                <h5 style="margin: 0">Add New Device</h5>
                <q-form @submit="onSubmit"
                        class="q-gutter-md">
                    <q-input label="Device UUID" filled v-model="deviceId"
                             hint="Device UUID provided during set up"
                             :rules="uuidRule"
                    />
                    <q-input label="Device Password" filled v-model="devicePassword" type="password" hint="Device password configured during set up"
                             :rules="passwordRule"
                    />
                    <q-input label="Name" v-model="name" filled hint="Identify your device with this name"
                             :rules="nameRule"
                    />
                    <q-input label="Description" filled v-model="description" hint="Description for the device"/>
                    <div class="row justify-between">
                        <q-btn outline @click="add = false">Back</q-btn>
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
import {Component, Vue} from 'vue-property-decorator';
import {ApiError} from "src/classLibrary/Core/Api";
import {Alert} from "src/classLibrary/Alert";

const requiredRule: any = (val: any) => val && val.length > 0 || 'Required'
const uuidRegex: any = (val: any) => val && /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/.test(val.toLowerCase()) || 'Not a valid UUID'

@Component({})
export default class AddNewDevice extends Vue {
    add = false;
    deviceId = "";
    devicePassword = "";
    name = "";
    description = "";

    uuidRule: any[] = [uuidRegex];
    passwordRule: any[] = [requiredRule];
    nameRule: any[] = [requiredRule];

    async onSubmit() {
        const token = await this.$auth.CoreToken;

        const r = await this.$api.Post<{ name: string, id: string, description: string }>(`Device/${this.deviceId}`, {
            password: this.devicePassword,
            name: this.name,
            description: this.description,
        }, token);

        const a = new Alert(this.$q);
        const p = this;
        r.match({
            err(val: ApiError) {
                a.Bad("Error occurred");
                console.error(val);
            }, ok(val) {
                a.Ok(val.name + " has been added");
                p.add = false;
                p.$emit("added");
            }
        })

    }
}
</script>
