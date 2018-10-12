export default function scrollToTop() {
    const scrollUpBtn = document.querySelector('.scroll-up-btn');

    const trackScroll = () => {

        const scrolled = window.pageYOffset;

        if (scrolled > 100) {
            scrollUpBtn.classList.add('js-visible');
        } else {
            scrollUpBtn.classList.remove('js-visible');
        }
    }

    const backToTop = () => {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -50);
            setTimeout(backToTop, 10);
        }
    }

    window.addEventListener('scroll', trackScroll);
    scrollUpBtn.addEventListener('click', backToTop);
};