export interface LightStrip {
    ip: string;
    port: number;
    name: string;
    settings?: LightStripSettings;
    info?: LightStrinInfo;
    options?: LightStringOptions;
}

export interface LightStripSettings {
    powerOnBehavior: number;
    powerOnBrightness: number;
    powerOnTemperature: number;
    switchOnDurationMs: number;
    switchOffDurationMs: number;
    colorChangeDurationMs: number;
}

export interface LightStrinInfo {
    productName: string;
    hardwareBoardType: number;
    firmwareBuildNumber: number;
    firmwareVersion: string;
    serialNumber: string;
    displayName: string;
    features: Array<string>;
}

export interface LightStringOptions {
    numberOfLights: number,
    lights: [{
        on: number,
        hue: number,
        saturation: number,
        brightness: number
    }]
}