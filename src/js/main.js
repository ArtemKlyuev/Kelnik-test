/**
 *  NodeList.prototype.forEach polyfill for IE
 */

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

const scrollToTop = () => {

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

scrollToTop();

const addToFav = () => {

    const stars = document.querySelectorAll('.apartment-card__star');

    const addToFave = function () {
        this.classList.toggle('apartment-card__star_favorite');
    }

    stars.forEach(el => el.addEventListener('click', addToFave));

};

addToFav();

const sortingCards = () => {
    const resultSwitchers = document.querySelectorAll('.results__switcher');

    let priceCounter = 0;
    let roomCounter = 0;

    const sortByRooms = function () {

        const resultsCards = document.querySelector('.results__cards');
        const rooms = document.querySelectorAll('.apartment-card');
        const itemsArr = [];

        roomCounter++;

        for (let num in rooms) {
            if (rooms[num].nodeType === 1) {
                itemsArr.push(rooms[num]);
            }
        }

        itemsArr.sort((a, b) => {
            if (roomCounter % 2) {
                return +a.getAttribute('data-rooms') === +b.getAttribute('data-rooms') ? 0 :
                    +a.getAttribute('data-rooms') > +b.getAttribute('data-rooms') ? -1 : 1;
            }

            return +a.getAttribute('data-rooms') === +b.getAttribute('data-rooms') ? 0 :
                +a.getAttribute('data-rooms') > +b.getAttribute('data-rooms') ? 1 : -1;
        });

        itemsArr.forEach(el => resultsCards.appendChild(el));

        this.classList.toggle('results__switcher_descending');
        this.classList.contains('js-selected') ? null : this.classList.add('js-selected');

        resultSwitchers[0].classList.remove('js-selected');
    };

    const sortByPrice = function () {

        const resultsCards = document.querySelector('.results__cards');
        const cards = document.querySelectorAll('.apartment-card');
        const itemsArr = [];

        priceCounter++;

        for (let price in cards) {
            if (cards[price].nodeType === 1) {
                itemsArr.push(cards[price]);
            }
        }

        itemsArr.sort((a, b) => {

            if (priceCounter % 2) {

                return +a.children[4].textContent.split(' ').slice(0, 3).join('') === +b.children[4].textContent.split(' ').slice(0, 3).join('') ? 0 :
                    +a.children[4].textContent.split(' ').slice(0, 3).join('') > +b.children[4].textContent.split(' ').slice(0, 3).join('') ? -1 : 1;
            }

            return +a.children[4].textContent.split(' ').slice(0, 3).join('') === +b.children[4].textContent.split(' ').slice(0, 3).join('') ? 0 :
                +a.children[4].textContent.split(' ').slice(0, 3).join('') > +b.children[4].textContent.split(' ').slice(0, 3).join('') ? 1 : -1;
        });

        itemsArr.forEach(el => resultsCards.appendChild(el));

        this.classList.toggle('results__switcher_descending');
        this.classList.contains('js-selected') ? null : this.classList.add('js-selected');

        resultSwitchers[1].classList.remove('js-selected');
    };

    resultSwitchers[0].addEventListener('click', sortByPrice);
    resultSwitchers[1].addEventListener('click', sortByRooms);
};

sortingCards();

const showMoreCards = () => {

    const showMoreBtn = document.querySelector('.results__btn-show');

    const checkStatus = response => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }

    const resultsError = document.querySelector('.results__error');


    const fetchData = function () {

        fetch('fetching_data/fetching_data.html')
            .then(checkStatus)
            .then(response => response.text())
            .then(response => {
                resultsError.classList.remove('js-visible');
                resultsError.textContent = '';
                const results = document.querySelector('.results__cards');
                results.innerHTML += response;
                addToFav();
            })
            .catch(error => {
                resultsError.classList.add('js-visible');
                resultsError.textContent = 'Ошибка при получении данных';
                console.error(error);
            });

    };

    showMoreBtn.addEventListener('click', fetchData);

};

showMoreCards();

const mobileMenu = () => {

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

mobileMenu();

const formValidation = () => {

    const form = document.querySelector('.form-subscribe');

    const checkValid = function (e) {

        const checkBoxChecked = document.querySelector('.form-subscribe__checkbox').checked; //.getAttribute('checked');
        const checkBoxError = document.querySelector('.form-subscribe__checkbox-error');
        const emailInput = document.querySelector('.form-subscribe__email').value;
        const emailPattern = /^[a-z][a-z0-9]+@[a-z]+\.[a-z]+$/i;
        const emailError = document.querySelector('.form-subscribe__email-error');

        if (!emailPattern.test(emailInput) || !checkBoxChecked) {
            if (!emailPattern.test(emailInput)) {
                checkBoxError.textContent = '';
                emailError.textContent = 'Вы ввели неправильный E-mail';
                emailError.classList.add('js-visible');
            } else {
                emailError.textContent = '';
                checkBoxError.textContent = 'Подтвердите подписку';
                checkBoxError.classList.add('js-visible');
            }
            e.preventDefault();
            return false;
        }

        emailError.textContent = '';
        emailError.classList.remove('js-visible');
        checkBoxError.textContent = '';
        checkBoxError.classList.remove('js-visible');
    }

    form.addEventListener('submit', checkValid);
};

formValidation();