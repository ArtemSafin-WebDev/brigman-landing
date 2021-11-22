import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function faq() {
    const elements = Array.from(document.querySelectorAll('.js-faq'));

    elements.forEach(element => {
        const tabBtns = Array.from(element.querySelectorAll('.faq__popular-link'));
        const tabItems = Array.from(element.querySelectorAll('.faq__tabs-item'))

        const setActiveBtn = index => {
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabItems.forEach(item => item.classList.remove('active'));
            tabBtns[index].classList.add('active');
            tabItems[index].classList.add('active');
            ScrollTrigger.refresh()
        }

        if (tabBtns.length) {
            setActiveBtn(0);
        }

        


        tabBtns.forEach((btn, btnIndex) => {
            btn.addEventListener('click', event => {
                event.preventDefault();

                setActiveBtn(btnIndex);
            })
        })
    })
}