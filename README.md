# Elgato Light API
Control Elgato Lights with Javascript!

## Installation

Working on this!

~~Running `npm i elgato-light-api` will install the package. Typescript is natively supported.~~

## How to use

### Site for Color Codes:
I found this nice site that gives you an pretty solid color picker and returns the values you need for the code. 

You need to ues the `HSL` field: [http://colorizer.org/](http://colorizer.org/)
### This section is going to be updated soonTM

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
This project was started by because a Discord friend of mine had problems with other LightStrip Software for Twitch Chat Integration so I was looking for one and found the `elgato-key-light` api by [Nick Parks](https://github.com/NickParks/elgato-key-light). On this repo, I luckily found and Issue [#2](https://github.com/NickParks/elgato-light-api/issues/2) which describes how to update an light strip. With my coding experience I made it support Elgato light strips.

So thanks for your help [Nick Parks](https://github.com/NickParks/elgato-key-light) and [Sebastian Hahner](https://github.com/sebinside).

If you'd like to add any features or fix any bugs you may find submit a PR!
If you need help understanding or using this code, DM me on Discord. [LPTP1#1233](https://discord.com/users/478473771678826496)
