import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function whyBrigman() {
    const elements = Array.from(document.querySelectorAll('.js-why-brigman'));

    elements.forEach(element => {
        const row = element.querySelector('.why-brigman__row');
        const headingBlock = element.querySelector('.why-brigman__heading-block');
        const slider = element.querySelector('.why-brigman__slider');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: 'bottom bottom',
                scrub: 1,
                pin: '.why-brigman-pin-wrapper',
                end: () => `+=${slider.offsetWidth * 0.7}`,
                pinSpacing: true
            }
        });

        tl.to(row, {
            x: () => -(headingBlock.offsetWidth + slider.offsetWidth - row.offsetWidth),
            duration: 0.4
        });
    });
}
