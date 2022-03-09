import { ElgatoKeylightAPI } from "../ElgatoKeylightAPI";
import { KeyLight } from "../types/KeyLight";

const lightAPI = new ElgatoKeylightAPI();

async function start() {
    lightAPI.on('newLight', (newLight: KeyLight) => {
        console.log(newLight.name);
    });

    setTimeout(() => {
        lightAPI.updateAllLights({
            numberOfLights: 1,
            lights: [{
                on: 1,
                temperature: 145,
                brightness: 15
            }]
        });
    }, 1000 * 3);
}

start();