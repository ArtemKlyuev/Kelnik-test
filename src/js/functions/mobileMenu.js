export default function mobileMenu() {

    const burgerBtn = document.querySelector('.menu-burger');

    const showMenu = function () {

        const header = document.querySelector('.header');

        if (header.classList.contains('js-menu-open')) {
            header.classList.add('js-menu-closed');
            header.classList.remove('js-menu-open');
        } else {
            header.classList.add('js-menu-open');
            header.classList.remove('js-menu-closed');
        }
    };

    burgerBtn.addEventListener('click', showMenu);
};