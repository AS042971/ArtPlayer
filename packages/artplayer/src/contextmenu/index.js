import { setStyles, includeFromEvent, isMobile } from '../utils';
import Component from '../utils/component';
import playbackRate from './playbackRate';
import aspectRatio from './aspectRatio';
import flip from './flip';
import info from './info';
import version from './version';
import close from './close';

export default class Contextmenu extends Component {
    constructor(art) {
        super(art);

        this.art = art;
        this.name = 'contextmenu';
        this.$parent = art.template.$contextmenu;

        art.once('video:loadedmetadata', () => {
            if (!isMobile) {
                this.init();
            }
        });
    }

    init() {
        const {
            option,
            template: { $player, $contextmenu },
            events: { proxy },
        } = this.art;

        this.add(
            playbackRate({
                disable: !option.playbackRate,
                name: 'playbackRate',
                index: 10,
            }),
        );

        this.add(
            aspectRatio({
                disable: !option.aspectRatio,
                name: 'aspectRatio',
                index: 20,
            }),
        );

        this.add(
            flip({
                disable: !option.flip,
                name: 'flip',
                index: 30,
            }),
        );

        this.add(
            info({
                disable: false,
                name: 'info',
                index: 40,
            }),
        );

        this.add(
            version({
                disable: false,
                name: 'version',
                index: 50,
            }),
        );

        this.add(
            close({
                disable: false,
                name: 'close',
                index: 60,
            }),
        );

        for (let index = 0; index < option.contextmenu.length; index++) {
            this.add(option.contextmenu[index]);
        }

        proxy($player, 'contextmenu', (event) => {
            event.preventDefault();
            this.show = true;

            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const { height: cHeight, width: cWidth, left: cLeft, top: cTop } = $player.getBoundingClientRect();
            const { height: mHeight, width: mWidth } = $contextmenu.getBoundingClientRect();
            let menuLeft = mouseX - cLeft;
            let menuTop = mouseY - cTop;

            if (mouseX + mWidth > cLeft + cWidth) {
                menuLeft = cWidth - mWidth;
            }

            if (mouseY + mHeight > cTop + cHeight) {
                menuTop = cHeight - mHeight;
            }

            setStyles($contextmenu, {
                top: `${menuTop}px`,
                left: `${menuLeft}px`,
            });
        });

        proxy($player, 'click', (event) => {
            if (!includeFromEvent(event, $contextmenu)) {
                this.show = false;
            }
        });

        this.art.on('blur', () => {
            this.show = false;
        });
    }
}
