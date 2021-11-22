import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, EffectFade } from 'swiper';

Swiper.use([EffectFade]);

gsap.registerPlugin(ScrollTrigger);

export default function reviews() {
    const elements = Array.from(document.querySelectorAll('.js-reviews'));

    elements.forEach(element => {
        if (!window.matchMedia('(max-width: 640px)').matches) {
            const row = element.querySelector('.reviews__row');
            const headingBlock = element.querySelector('.reviews__info');
            const slider = element.querySelector('.reviews__slider');
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: 'bottom bottom',
                    scrub: 1,
                    pin: '.reviews-pin-wrapper',
                    end: () => `+=${slider.offsetWidth * 0.7}`,
                    pinSpacing: true
                }
            });

            tl.to(row, {
                x: () => -(headingBlock.offsetWidth + slider.offsetWidth - row.offsetWidth),
                duration: 0.4
            });
        } else {
            const container = element.querySelector('.swiper-container');

            new Swiper(container, {
                slidesPerView: 'auto',
                spaceBetween: 10,
                watchOverflow: true
            });
        }
    });
}
