import { ElgatoKeylightAPI } from "../ElgatoKeylightAPI";
import { ElgatoLightstripAPI } from "../ElgatoLightstripAPI";
import { KeyLight } from "../types/KeyLight";
import { LightStrip } from "../types/LightStrip";

const keylightAPI = new ElgatoKeylightAPI();
const lightstripAPI = new ElgatoLightstripAPI();

async function start() {
    keylightAPI.on('newKeyLight', (newLight: KeyLight) => {
        console.log('New Key Light: ' + newLight.name);
    });
    
    lightstripAPI.on('newLightStrip', (newLight: LightStrip) => {
        console.log('New Light Strip: ' + newLight.name);
    });

    setTimeout(() => {
        keylightAPI.updateAllLights({
            numberOfLights: 1,
            lights: [{
                on: 1,
                temperature: 145,
                brightness: 15
            }]
        });

        lightstripAPI.updateAllStrips({
            numberOfLights: 1,
            lights: [{
                on: 1,
                saturation: 100,
                hue: 100,
                brightness: 100
            }]
        });
    }, 1000 * 3);
}

start();