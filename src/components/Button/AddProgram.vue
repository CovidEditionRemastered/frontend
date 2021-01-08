<template>

    <div>
        <q-btn icon="add" fab class="absolute-bottom-right q-mx-md lower" color="accent" @click="add = true"/>
        <q-dialog v-model="add">
            <div style="background: white" class="dialog-k q-pa-md">
                <h5 style="margin: 0">Add New Device</h5>
                <q-form @submit="onSubmit"
                        class="q-gutter-md">

                    <q-input label="Name" v-model="name" filled hint="Program Name"
                             :rules="nameRule"
                    />
                    <q-input label="Code" filled v-model="code" :rules="codeRule" hint="Program Sequence"/>
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
.lower {
    transform: translateY(50%);
}
</style>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Alert} from "src/classLibrary/Alert";
import {ApiError} from "src/classLibrary/Core/Api";

const requiredRule: any = (val: any) => val && val.length > 0 || 'Required'
@Component({})
export default class AddProgram extends Vue {
    add = false;
    nameRule: any[] = [requiredRule];
    codeRule: any[] = [requiredRule]
    code: string = '[]';
    name: string = '';
    @Prop() deviceId!: string;

    async onSubmit() {
        const token = await this.$auth.CoreToken;

        const r = await this.$api.Post<{ name: string, code: string }>(`Device/${this.deviceId}/Program`, {
            name: this.name,
            code: this.code,
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
