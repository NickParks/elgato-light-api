import bonjour, { Bonjour, RemoteService } from "bonjour";
import { put, get } from "request-promise";
import { EventEmitter } from "events";
import { KeyLight, KeyLightOptions } from "./types/KeyLight";

export class ElgatoKeylightAPI extends EventEmitter {
    private bonjour: Bonjour;
    public keyLights: Array<KeyLight>;

    /**
     * Creates an instance of ElgatoKeylightAPI.
     *
     * @memberof ElgatoKeylightAPI
     */
    constructor() {
        super();

        this.bonjour = bonjour();

        this.keyLights = new Array();

        // Continually monitors for a new keylight to be added
        this.bonjour.find({ type: 'elg' }, service => {
            if (service.txt.md.startsWith('Elgato Key Light')) {
                this.addKeylight(service);
            }
        });
    }

    /**
     * Adds a key light instance to our current array
     *
     * @private
     * @param {RemoteService} service
     * @memberof ElgatoKeylightAPI
     */
    private async addKeylight(service: RemoteService) {
        let keyLight: KeyLight = {
            ip: service['referer'].address,
            port: service.port,
            name: service.name
        }

        try {
            //Grab our keylights settings, info, and current options
            let settingsCall = await get(`http://${keyLight.ip}:${keyLight.port}/elgato/lights/settings`);
            keyLight.settings = await JSON.parse(settingsCall);

            let infoCall = await get(`http://${keyLight.ip}:${keyLight.port}/elgato/accessory-info`);
            keyLight.info = await JSON.parse(infoCall);

            let optionsCall = await get(`http://${keyLight.ip}:${keyLight.port}/elgato/lights`);
            keyLight.options = await JSON.parse(optionsCall);

            //Push the keylight to our array and emit the event
            this.keyLights.push(keyLight);
            this.emit('newKeyLight', keyLight);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Updates a light to the given options
     *
     * @param {KeyLight} light
     * @param {KeyLightOptions} options
     * @returns {Promise<void>}
     * @memberof ElgatoKeylightAPI
     */
    public async updateLightOptions(light: KeyLight, options: KeyLightOptions): Promise<void> {
        return new Promise(async (resolve, reject) => {
            light.options = options;
            try {
                await put(`http://${light.ip}:${light.port}/elgato/lights`, {
                    body: JSON.stringify(options)
                });
                return resolve();
            } catch (e) {
                return reject(e);
            }
        });
    }

    /**
     * Updates all lights to the given options
     *
     * @param {KeyLightOptions} options
     * @returns {Promise<void>}
     * @memberof ElgatoKeylightAPI
     */
    public async updateAllLights(options: KeyLightOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            for (let x = 0; x < this.keyLights.length; x++) {
                this.updateLightOptions(this.keyLights[x], options).catch(e => {
                    return reject(e);
                });
            }
            return resolve();
        });
    }
}