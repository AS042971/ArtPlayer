---
title: Static propertys
sidebar_position: 5
slug: /class
---

:::tip Tip

Static attributes exist in the constructor artplayer, and the player instance is not directly associated

:::

## instances

-   Type: `Array`

A array that saves all player instances, and can manage multiple instances through this property when multiple players exist at the same time.

<div className="run-code">▶ Run Code</div>

```js
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
});

art.on('ready', () => {
    console.info(Artplayer.instances.length);
});
```

## version

-   Type: `String`

Current player version number

<div className="run-code">▶ Run Code</div>

```js
console.info(Artplayer.version);
```

## env

-   Type: `String`

Current player environment variable

<div className="run-code">▶ Run Code</div>

```js
console.info(Artplayer.env);
```

## utils

-   Type: `Object`

Common utils for player

<div className="run-code">▶ Run Code</div>

```js
console.info(Object.keys(Artplayer.utils));
```

## config

-   Type: `Object`

Store native properties and methods of video

<div className="run-code">▶ Run Code</div>

```js
console.info(Artplayer.config);
```

## scheme

-   Type: `Object`

Verification scheme for player option

<div className="run-code">▶ Run Code</div>

```js
console.info(Artplayer.scheme);
```

## validator

-   Type: `Function`

Validator for player option

## option

-   Type: `Object`

Player default option

<div className="run-code">▶ Run Code</div>

```js
console.info(Artplayer.option);
```

## html

-   Type: `String`

Player defaults `HTML` String, usually used for `SSR`

<div className="run-code">▶ Run Code</div>

```js
console.info(Artplayer.html);
```

## kindOf

-   Type: `Function`

JS type identification function

<div className="run-code">▶ Run Code</div>

```js
console.info(Artplayer.kindOf('0'));
console.info(Artplayer.kindOf(0));
console.info(Artplayer.kindOf({}));
console.info(Artplayer.kindOf([]));
```
