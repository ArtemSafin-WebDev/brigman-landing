import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function intro() {
    const pcBlock = document.querySelector('.intro__pc-block');

    if (!pcBlock) return;

    let frameCount = 60;

    if (window.matchMedia('(max-width: 640px)').matches) return;

    let pc = {
        frame: 1
    };

    const images = [];

    for (let i = 0; i < 60; i++) {
        const img = document.createElement('img');
        img.src = `img/pc-resized/${i + 1}.png`;
        img.classList.add('intro__pc-block-image');
        img.style.display = 'none';
        images.push(img);
        pcBlock.appendChild(img);
    }

    if (images.length) {
        images[0].style.display = '';
    }

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
            images.forEach(image => (image.style.display = 'none'));
            images[pc.frame - 1].style.display = '';
            // image.src = `img/pc-resized/${pc.frame}.png`;
        }
    });
}
