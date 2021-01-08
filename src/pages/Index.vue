<template>
    <q-page>
        <Container :max-height="1">
            <q-scroll-area class="fit">
                <div class="full-width q-mt-lg row justify-center q-gutter-lg">
                    <DeviceCard v-for="d in devices" :key="d.uuid" :device="d" @delete="load" @edit="load"/>
                </div>
                <AddNewDevice @added="load"/>
            </q-scroll-area>
        </Container>
    </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LottieAnimation from "components/Core/LottieAnimation.vue";
import Container from "components/Core/Container.vue";
import AddNewDevice from "components/Button/AddNewDevice.vue";
import DeviceCard from "components/DeviceCard.vue";
import {Device} from "src/classLibrary/Device";
import {ApiError} from "src/classLibrary/Core/Api";
import {Alert} from "src/classLibrary/Alert";

@Component({
    components: {DeviceCard, AddNewDevice, Container, LottieAnimation}
})
export default class PageIndex extends Vue {
    layoutTabs = [];

    devices: Device[] = [];

    created() {
        this.load();
    }

    async load() {
        const token = await this.$auth.CoreToken;
        const r = await this.$api.Get<{ id: string, name: string, description: string, powerState: boolean }[]>(`Device`, null, token)
        const p = this;
        const a = new Alert(this.$q);
        r.match({
            err(val: ApiError) {
                a.Bad("Error");
                console.error(val);
            }, ok(val) {
                p.devices = val.Map(x => new Device(x.name, x.description, x.id, x.powerState))
            }
        })
    }


};
</script>
