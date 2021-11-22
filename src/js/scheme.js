import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function scheme() {
    const elements = Array.from(document.querySelectorAll('.js-scheme'));

    elements.forEach(element => {
        const layers = Array.from(element.querySelectorAll('.scheme__stages-layer'));
        const bullets = Array.from(element.querySelectorAll('.scheme__stages-pagination-bullet'));
        const tl = gsap.timeline({
            scrollTrigger: {
                start: 'bottom bottom',
                end: `+=${layers.length * 200}%`,
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

       
    });
}
