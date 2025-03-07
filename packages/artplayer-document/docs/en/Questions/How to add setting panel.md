---
title: How to add setting panel
sidebar_position: 6
---

Settings panels are similar to a collection of list selections, and support multi-layer nested

| Property   | Type                | Description              |
| ---------- | ------------------- | ------------------------ |
| `html`     | `String`、`Element` | DOM elements of selector |
| `icon`     | `String`、`Element` | Icon of selector         |
| `selector` | `Array`             | Selector list            |
| `onSelect` | `Function`          | Selector click event     |
| `width`    | `Number`            | Panel width              |
| `default`  | `Boolean`           | Default selected         |
| `tooltip`  | `String`            | Tooltip text             |

<div className="run-code">▶ Run Code</div>

```js
var art = new Artplayer({
    container: '.artplayer-app',
    url: '/assets/sample/video.mp4',
    setting: true,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    settings: [
        {
            html: 'Select Subtitle',
            width: 250,
            tooltip: 'Subtitle 01',
            selector: [
                {
                    default: true,
                    html: '<span style="color:red">Subtitle 01</span>',
                    url: '/assets/sample/subtitle.srt?id=1',
                },
                {
                    html: '<span style="color:yellow">Subtitle 02</span>',
                    url: '/assets/sample/subtitle.srt?id=2',
                },
            ],
            onSelect: function(item, $dom) {
                console.info(item, $dom);
                art.subtitle.url = item.url;

                // Change the tooltip
                return item.html;
            },
        },
        {
            html: 'Select Quality',
            width: 150,
            tooltip: '1080P',
            selector: [
                {
                    default: true,
                    html: '1080P',
                    url: '/assets/sample/video.mp4?id=1080',
                },
                {
                    html: '720P',
                    url: '/assets/sample/video.mp4?id=720',
                },
                {
                    html: '360P',
                    url: '/assets/sample/video.mp4?id=360',
                },
            ],
            onSelect: function(item, $dom) {
                console.info(item, $dom);
                art.switchQuality(item.url, item.html);

                // Change the tooltip
                return item.html;
            },
        },
        {
            html: 'Multi-layer nested',
            selector: [
                {
                    html: 'Nested 01',
                    selector: [
                        {
                            html: 'Nested 02',
                        },
                        {
                            html: 'Nested 02',
                        },
                    ],
                },
                {
                    html: 'Nested 01',
                    selector: [
                        {
                            html: 'Nested 02',
                        },
                        {
                            html: 'Nested 02',
                        },
                    ],
                },
            ],
        },
    ],
});
```
