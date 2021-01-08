export class Device {

    name: string;
    description: string;
    uuid: string;
    toggle: boolean;

    constructor(name: string, description: string, uuid: string, toggle: boolean) {
        this.name = name;
        this.description = description;
        this.uuid = uuid;
        this.toggle = toggle;
    }

}
