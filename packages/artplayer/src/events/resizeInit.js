import { throttle } from '../utils';

export default function resizeInit(art, events) {
    const { notice, option } = art;

    const resizeFn = throttle(() => {
        if (art.normalSize) {
            art.autoSize = option.autoSize;
        }
        art.aspectRatioReset = true;
        notice.show = '';
        art.emit('resize');
    }, 500);

    events.proxy(window, ['orientationchange', 'resize'], () => {
        resizeFn();
    });

    if (screen && screen.orientation && screen.orientation.onchange) {
        events.proxy(screen.orientation, 'change', () => {
            resizeFn();
        });
    }
}
