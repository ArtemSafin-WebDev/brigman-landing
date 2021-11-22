import { Swiper } from 'swiper';

export default function howToOrderSlider() {

    if (!window.matchMedia("(max-width: 640px)").matches) return;
    const elements = Array.from(document.querySelectorAll('.js-how-to-order-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 10,
            watchOverflow: true
        });
    });
}
