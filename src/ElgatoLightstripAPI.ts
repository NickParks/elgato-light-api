import bonjour, { Bonjour, RemoteService, Service } from "bonjour";
import { put, get } from "request-promise";
import { EventEmitter } from "events";
import { LightStrip, LightStringOptions } from "./types/LightStrip";

export class ElgatoLightstripAPI extends EventEmitter {
    private bonjour: Bonjour;
    public lightStrips: Array<LightStrip>;

    /**
     * Creates an instance of ElgatoKeylightAPI.
     *
     * @memberof ElgatoKeylightAPI
     */
    constructor() {
        super();

        this.bonjour = bonjour();

        this.lightStrips = new Array();

        // Continually monitors for a new keylight to be added
        const browser = this.bonjour.find({ type: 'elgato light' });
        browser.on('up', service => {
            console.log("type: "+service.type)
            this.addLightstrip(service);
        });
    }

    /**
     * Adds a key light instance to our current array
     *
     * @private
     * @param {RemoteService} service
     * @memberof ElgatoKeylightAPI
     */
    private async addLightstrip(service: RemoteService) {
        let lightStrip: LightStrip = {
            ip: service['referer'].address,
            port: service.port,
            name: service.name
        }

        try {
            //Grab our keylights settings, info, and current options
            let settingsCall = await get(`http://${lightStrip.ip}:${lightStrip.port}/elgato/lights/settings`);
            lightStrip.settings = await JSON.parse(settingsCall);

            let infoCall = await get(`http://${lightStrip.ip}:${lightStrip.port}/elgato/accessory-info`);
            lightStrip.info = await JSON.parse(infoCall);

            let optionsCall = await get(`http://${lightStrip.ip}:${lightStrip.port}/elgato/lights`);
            lightStrip.options = await JSON.parse(optionsCall);

            //Push the keylight to our array and emit the event
            this.lightStrips.push(lightStrip);
            this.emit('newLightStrip', lightStrip);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Updates a light to the given options
     *
     * @param {KeyLight} light
     * @param {KeyLightOptions} options
     * @returns {Promise<any>}
     * @memberof ElgatoKeylightAPI
     */
    public async updateLightOptions(light: LightStrip, options: LightStringOptions): Promise<any> {
        return new Promise(async (resolve, reject) => {
            light.options = options;
            try {
                await put(`http://${light.ip}:${light.port}/elgato/lights`, {
                    body: JSON.stringify(options)
                });
                //@ts-expect-error
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
     * @returns {Promise<any>}
     * @memberof ElgatoKeylightAPI
     */
    public async updateAllStrips(options: LightStringOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            for (let x = 0; x < this.lightStrips.length; x++) {
                this.updateLightOptions(this.lightStrips[x], options).catch(e => {
                    return reject(e);
                });
            }
            //@ts-expect-error
            return resolve();
        });
    }
}