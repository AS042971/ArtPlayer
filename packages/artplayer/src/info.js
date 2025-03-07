import { queryAll, isMobile } from './utils';
import Component from './utils/component';

export default class Info extends Component {
    constructor(art) {
        super(art);
        this.name = 'info';
        art.once('video:loadedmetadata', () => {
            if (!isMobile) {
                this.init();
            }
        });
    }

    init() {
        const {
            events: { proxy },
            template: { $infoPanel, $infoClose, $video },
        } = this.art;

        proxy($infoClose, 'click', () => {
            this.show = false;
        });

        let timer = null;
        const $types = queryAll('[data-video]', $infoPanel) || [];

        this.art.on('destroy', () => {
            clearTimeout(timer);
        });

        function loop() {
            for (let index = 0; index < $types.length; index++) {
                const item = $types[index];
                const value = $video[item.dataset.video];
                const innerText = typeof value === 'number' ? value.toFixed(2) : value;
                if (item.innerText !== innerText) {
                    item.innerText = innerText;
                }
            }
            timer = setTimeout(loop, 1000);
        }

        loop();
    }
}
