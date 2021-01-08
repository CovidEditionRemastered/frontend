<template>
    <q-card style="width: 350px">
        <q-card-section class="bg-secondary text-white">
            <div class="row justify-between">
                <div>
                    <div class="text-h6">{{ device.name }}</div>
                    <div class="text-subtitle2">{{ device.description }}</div>
                </div>

                <q-toggle v-model="device.toggle" @input="Toggle"/>
            </div>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="between">
            <DeleteDevice :name="device.name" :uuid="device.uuid" @delete="$emit('delete')"/>
            <EditDevice :original-name="device.name" :original-description="device.description" :uuid="device.uuid"
                        @edit="$emit('edit')"
            />
            <q-btn color="primary" @click="$router.push(`/${device.uuid}`)">View</q-btn>
        </q-card-actions>
    </q-card>
</template>

<style lang='scss' scoped>

</style>

<script lang='ts'>
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Device} from "src/classLibrary/Device";
import DeleteDevice from "components/Button/DeleteDevice.vue";
import EditDevice from "components/Button/EditDevice.vue";
import {Alert} from "src/classLibrary/Alert";

@Component({
    components: {EditDevice, DeleteDevice}
})
export default class DeviceCard extends Vue {
    @Prop() device!: Device

    async Toggle() {
        const a = new Alert(this.$q);
        const token = await this.$auth.CoreToken;
        const r = await this.$api.QPost(`Hardware/user/${this.device.uuid}?state=${this.device.toggle ? 'true' : 'false'}`, null, token);
        if (r.isNone()) {
            a.Ok("Toggled")
        } else {
            a.Bad("Error occurred");
        }
    }

}
</script>
