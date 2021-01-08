import {Tab} from "src/classLibrary/Core/StrongTyping/Tabs";

interface RAMValue {
    title: string;
    leftIcon: string;
    rightIcon: string;
    tabs: Tab[];
}


const RAMValueDefault: RAMValue = {
    tabs: [],
    title: 'Soapy',
    leftIcon: 'menu',
    rightIcon: 'menu'
}

export {
    RAMValue,
    RAMValueDefault
}
