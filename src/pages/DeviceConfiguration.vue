<template>
    <q-page>
        <Container v-if="device != null" class="q-pa-md row justify-center">
            <div class="column q-gutter-lg">
                <q-card class="card-s">
                    <q-card-section class="bg-secondary text-white">
                        <div class="text-h6">{{ device.principal.name }}</div>
                        <div class="text-subtitle2">{{ device.principal.description }}</div>
                    </q-card-section>
                    <q-separator/>
                    <q-card-actions align="between">
                        <div class="q-gutter-sm row">
                            <DeleteDevice :name="device.principal.name" :uuid="device.principal.id" @delete="init"/>
                            <EditDevice :original-name="device.principal.name" :original-description="device.principal.description"
                                        :uuid="device.principal.id"
                                        @edit="init"
                            />
                        </div>
                        <q-toggle v-model="device.principal.powerState" @input="Toggle"/>
                    </q-card-actions>
                </q-card>
                <q-card class="card-s">
                    <q-card-section class="bg-secondary text-white">
                        <div class="text-h6">Programs</div>
                        <div class="text-subtitle2">Stored Procedures</div>

                    </q-card-section>
                    <q-card-section>
                        <q-list>
                            <ProgramRow :program="p" v-for="p in device.programs" :device="device.principal" @delete="init"/>
                        </q-list>
                    </q-card-section>
                    <AddProgram :device-id="routeParams.deviceId" @added="init"/>
                </q-card>
            </div>
        </Container>
        <div v-else>
            <Error404/>
        </div>
    </q-page>

</template>

<style lang='scss' scoped>
.card-s {
    width: 100%;
    max-width: 800px;
    min-width: 400px;
}
</style>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';
import {DeviceResponse} from "src/classLibrary/response/models";
import Container from "components/Core/Container.vue";
import Error404 from "pages/Error404.vue";
import {Alert} from "src/classLibrary/Alert";
import {ApiError} from "src/classLibrary/Core/Api";
import DeleteDevice from "components/Button/DeleteDevice.vue";
import EditDevice from "components/Button/EditDevice.vue";
import AddProgram from "components/Button/AddProgram.vue";
import ProgramRow from "components/ProgramRow.vue";
import TriggerRow from "components/TriggerRow.vue";
import AddTrigger from "components/Button/AddTrigger.vue";


@Component({
    components: {ProgramRow, AddProgram, EditDevice, DeleteDevice, Error404, Container}
})
export default class DeviceConfiguration extends Vue {
    routeParams = {
        deviceId: ''
    }

    device: DeviceResponse | null = null;

    async Toggle() {
        const a = new Alert(this.$q);
        const token = await this.$auth.CoreToken;
        const r = await this.$api.QPost(`Hardware/user/${this.device?.principal.id}?state=${this.device?.principal.powerState ? 'true' : 'false'}`, null, token);
        if (r.isNone()) {
            a.Ok("Toggled")
        } else {
            a.Bad("Error occurred");
        }
    }

    async init() {
        const token = await this.$auth.CoreToken;
        const a = new Alert(this.$q);
        const p = this;

        const r = await this.$api.Get<DeviceResponse>(`Device/${this.routeParams.deviceId}`, null, token);

        r.match({
            err(val: ApiError) {
                a.Bad("Error occurred");
                console.error(val);
            }, ok(val: DeviceResponse) {
                p.device = val;
            }
        })

    }

}
</script>
