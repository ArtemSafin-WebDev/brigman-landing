import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function anchorLinks() {
    const scrollByHash = hash => {
        const elementToScroll = document.querySelector(hash);
        if (elementToScroll) {
            if (window.menuOpen) {
                window.closeMenu();
            } else {
                console.log('menu not open');
            }

            gsap.to(window, {
                duration: 4,
                ease: 'power2.out',
                scrollTo: {
                    y: elementToScroll,
                    autoKill: false,
                    offsetY: 80
                }
            });
        } else {
            console.error('No element to scroll');
        }
    };
    document.addEventListener('click', event => {
        if (event.target.matches('a') || event.target.closest('a')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');
            const hash = link.hash;

            console.log('Hash', hash);

            if (hash) {
                event.preventDefault();
                scrollByHash(hash);
            }
        }
    });
}
