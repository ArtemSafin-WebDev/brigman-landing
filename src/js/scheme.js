import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Swiper, EffectFade } from 'swiper';

Swiper.use([EffectFade]);

gsap.registerPlugin(ScrollTrigger);

export default function scheme() {
    const elements = Array.from(document.querySelectorAll('.js-scheme'));

    elements.forEach(element => {
        if (!window.matchMedia('(max-width: 640px)').matches) {
            const layers = Array.from(element.querySelectorAll('.scheme__stages-layer'));
            const bullets = Array.from(element.querySelectorAll('.scheme__stages-pagination-bullet'));
            const tl = gsap.timeline({
                scrollTrigger: {
                    start: 'bottom bottom',
                    end: `+=${layers.length * 100}%`,
                    trigger: element,
                    anticipatePin: 1,
                    pin: true,
                    pinSpacing: true,
                    scrub: true,
                    snap: {
                        snapTo: 'labelsDirectional', // snap to the closest label in the timeline
                        duration: { min: 0.2, max: 0.6 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                        delay: 0.1, // wait 0.2 seconds from the last scroll event before doing the snapping
                        ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
                    },
                    onUpdate: self => {
                        const currentProgress = self.progress;

                        const sectionStep = 100 / (layers.length - 1);
                        const progress = (currentProgress / sectionStep) * 100;
                        const currentSectionIndex = Math.round(progress);

                        bullets.forEach(bullet => bullet.classList.remove('active'));
                        bullets[currentSectionIndex].classList.add('active');
                    }
                }
            });

            layers.forEach((layer, layerIndex) => {
                if (layerIndex === 0) {
                    tl.addLabel(`stage-${layerIndex}`, '<');
                    return;
                }

                tl.to(layers[layerIndex - 1], {
                    autoAlpha: 0,
                    duration: 0.4,
                    ease: 'none'
                });

                tl.to(layer, {
                    autoAlpha: 1,
                    duration: 0.4,
                    ease: 'none'
                });
                tl.addLabel(`stage-${layerIndex}`, '>');
            });
        } else {
            const container = element.querySelector('.swiper-container');
            const bullets = Array.from(element.querySelectorAll('.scheme__stages-pagination-bullet'));

            const setActiveBullet = index => {
                bullets.forEach(bullet => bullet.classList.remove('active'));
                bullets[index].classList.add('active');
            };
            const instance = new Swiper(container, {
                watchOverflow: true,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                autoHeight: true,
                init: false,
                on: {
                    init: swiper => {
                        setActiveBullet(swiper.activeIndex);
                    },
                    slideChange: swiper => {
                        setActiveBullet(swiper.activeIndex);
                    },
                    slideChangeTransitionEnd: () => {
                        ScrollTrigger.refresh();
                    }
                }
            });

            instance.init();

            bullets.forEach((bullet, bulletIndex) => {
                bullet.addEventListener('click', event => {
                    event.preventDefault();
                    instance.slideTo(bulletIndex);
                })
            })
        }
    });
}
