export interface DeviceResponse {
    principal: DevicePrincipalResponse;
    triggers: TriggerResponse[];
    programs: ProgramResponse[];
}

export interface DevicePrincipalResponse {
    id: string;
    name: string;
    description: string;
    powerState: boolean;
}

export interface TriggerResponse {
    id: string;
    name: string;
}

export interface ProgramResponse {
    id: string;
    name: string;
    code: string;
}
