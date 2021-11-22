import Plyr from 'plyr';

export default function video() {
    const elements = Array.from(document.querySelectorAll('.js-video'));

    elements.forEach(element => {
        const playerElement = element.querySelector('.video__card-media-plyr');
        const player = new Plyr(playerElement);
        const close = element.querySelector('.video__card-close');

        let playing = false;

        element.addEventListener('click', event => {
            const insideLink = event.target.matches('.video__card-link') || event.target.closest('.video__card-link');
            const insideClose = event.target.matches('.video__card-close') || event.target.closest('.video__card-close');
            if (insideLink || insideClose || playing) return;

            event.preventDefault();

            element.classList.add('video-mode');
            playing = true;

            player.play();
        });
        close.addEventListener('click', event => {
            if (!playing) return;
            event.preventDefault();
            element.classList.remove('video-mode');
            playing = false;
            player.stop();
        })
    });
}
