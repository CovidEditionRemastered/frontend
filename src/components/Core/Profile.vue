<template>
    <q-img :src="Image" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
            <q-avatar size="64px" class="q-mb-sm">
                <img :src="Avatar" :alt="AutoAvatar">
            </q-avatar>
            <div class="text-weight-bold">{{ Name }}</div>
            <div>@{{ Handle }}</div>
        </div>
    </q-img>

</template>

<style lang='scss' scoped>
.profile {
    width: 100%;

}

</style>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator';
import {goodOnes} from "boot/assets";
import {Auth0User} from "src/classLibrary/Core/Auth0";
import {GenerateAvatar} from "src/classLibrary/AvatarGenerator";


@Component
export default class Profile extends Vue {

    get User(): Auth0User | undefined {
        return this.$auth.user;
    }


    get AutoAvatar(): string {
        return GenerateAvatar(this.Name)
    }


    get Image(): string {
        return this.$images.md[`${this.mdBackground}index`];
    }

    get Avatar(): string {
        return this.User?.picture ?? this.AutoAvatar;
    }

    get Name(): string {
        return this.User?.name ?? "Unknown User";
    }

    get Handle(): string {
        return this.User?.nickname ?? "unknown_user";
    }

    get mdBackground(): number {
        return goodOnes.Random()!;
    }
}
</script>
