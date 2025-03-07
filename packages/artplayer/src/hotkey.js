import { isMobile } from './utils';

export default class Hotkey {
    constructor(art) {
        this.art = art;
        this.keys = {};

        art.once('video:loadedmetadata', () => {
            if (art.option.hotkey && !isMobile) {
                this.init();
            }
        });
    }

    init() {
        const { proxy } = this.art.events;

        this.add(27, () => {
            if (this.art.fullscreenWeb) {
                this.art.fullscreenWeb = false;
            }
        });

        this.add(32, () => {
            this.art.toggle();
        });

        this.add(37, () => {
            this.art.backward = 5;
        });

        this.add(38, () => {
            this.art.volume += 0.1;
        });

        this.add(39, () => {
            this.art.forward = 5;
        });

        this.add(40, () => {
            this.art.volume -= 0.1;
        });

        proxy(window, 'keydown', (event) => {
            if (this.art.isFocus) {
                const tag = document.activeElement.tagName.toUpperCase();
                const editable = document.activeElement.getAttribute('contenteditable');
                if (tag !== 'INPUT' && tag !== 'TEXTAREA' && editable !== '' && editable !== 'true') {
                    const events = this.keys[event.keyCode];
                    if (events) {
                        event.preventDefault();
                        for (let index = 0; index < events.length; index++) {
                            events[index].call(this.art, event);
                        }
                        this.art.emit('hotkey', event);
                    }
                }
            }
        });
    }

    add(key, event) {
        if (this.keys[key]) {
            this.keys[key].push(event);
        } else {
            this.keys[key] = [event];
        }
        return this;
    }

    remove(key, event) {
        if (this.keys[key]) {
            const index = this.keys[key].indexOf(event);
            if (index !== -1) {
                this.keys[key].splice(index, 1);
            }
        }
        return this;
    }
}
