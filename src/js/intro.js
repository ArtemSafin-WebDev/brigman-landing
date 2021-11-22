import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function intro() {
    const pcBlock = document.querySelector('.intro__pc-block');

    if (!pcBlock) return;

    let frameCount = 60;

    const image = document.querySelector('.intro__pc-block-image');

    let pc = {
        frame: 1
    };

    const tl = gsap.timeline({
        scrollTrigger: {
            start: 'top top+=80',
            trigger: pcBlock,
            end: () => {
                const distanceToCommnity = document.querySelector('.intro__community-wrapper').getBoundingClientRect().bottom + window.pageYOffset;
                const distanceToApproach = document.querySelector('.our-approach__text').getBoundingClientRect().bottom + window.pageYOffset;
                return `+=${distanceToApproach - distanceToCommnity - pcBlock.offsetHeight}`;
            },
            pin: pcBlock,
            markers: false,
            pinSpacing: false,
            scrub: true
        }
    });

    tl.to(pc, {
        frame: frameCount,
        snap: 'frame',
        onUpdate: () => {
            image.src = `img/pc-resized/${pc.frame}.png`;
        }
    });
}
