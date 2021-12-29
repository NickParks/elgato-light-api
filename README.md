# Elgato Light API
Control Elgato Key Lights and Light Strips with Javascript!

## Installation

Running `npm i elgato-light-api` will install the package. Typescript is natively supported.

## How to use

Create a new instance of `ElgatoLightAPI`:

```Javascript
const lightAPI = new ElgatoLightAPI();
```

An Event Emitter is used to notify listeners when a new Key Light is detected.
```Javascript
lightAPI.on('newLight', (newLight: KeyLight) => {
    console.log(newLight.name);
});
```

Currently, `ElgatoLightAPI` has two main functions, `updateLightOptions` and `updateAllLights`. And an exposed Array `keyLights`

#### UpdateLightOptions
```Javascript
lightAPI.updateLightOptions(lightAPI.keyLights[0], options).then(() => {
    console.log("Lights are all updated to the same value!");
}).catch(e => {
    console.error("Error: ", e);
});
```

#### UpdateAllLights
```Javascript
lightAPI.updateAllLights(options).then(() => {
    console.log("Lights are all updated to the same value!");
}).catch(e => {
    console.error("Error: ", e);
});
```
The interfaces required can all be found in [KeyLight.ts](https://github.com/NickParks/elgato-key-light/blob/master/src/types/KeyLight.ts)

## Feedback or Issues
This was a quick project to allow for easier control over my Keylights, if you find any issues or have feedback feel free to create an issue about it here.

If you'd like to add any features or fix any bugs you may find submit a PR!
