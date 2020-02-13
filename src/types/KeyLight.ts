export interface KeyLight {
    ip: string;
    port: number;
    name: string;
    settings?: KeyLightSettings;
    info?: KeyLightInfo;
    options?: KeyLightOptions;
}

export interface KeyLightSettings {
    powerOnBehavior: number;
    powerOnBrightness: number;
    powerOnTemperature: number;
    switchOnDurationMs: number;
    switchOffDurationMs: number;
    colorChangeDurationMs: number;
}

export interface KeyLightInfo {
    productName: string;
    hardwareBoardType: number;
    firmwareBuildNumber: number;
    firmwareVersion: string;
    serialNumber: string;
    displayName: string;
    features: Array<string>;
}

export interface KeyLightOptions {
    numberOfLights: number;
    lights: [{
        on: number;
        brightness: number;
        temperature: number;
    }];
}