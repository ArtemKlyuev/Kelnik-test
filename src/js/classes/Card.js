import Data from './Data';
import {
    sortState
} from '../functions/sort';

export default class Card extends Data {
    constructor() {
        super();
    }

    _customHandler() {
        const btnShow = document.querySelector('.results__btn-show');
        if (this._response.length >= 20) {
            btnShow.classList.add('js-visible');
            btnShow.textContent = 'Показать ещё 20';
        } else if (this._response.length < 20 && this._response.length > 0) {
            btnShow.classList.add('js-visible');
            btnShow.textContent = `Показать ещё ${this._response.length}`
        }
    }

    _showError(error) {
        super._showError(error);
        const resultsError = document.querySelector('.results__error');
        resultsError.classList.add('js-visible');
        resultsError.textContent = 'Ошибка при получении данных';
    }
};

/**
 * Создание карточек квартир на основе данных, приходящих с сервера
 * @param {Object} cardData - данные карточки
 * @param {null|Array} cardData.badges - null или массив со скидками
 * @param {string} cardData.img - путь к картинке
 * @param {string} cardData.title - название карточки
 * @param {number} cardData.rooms - количество комнат
 * @param {string} cardData.finish - отделка
 * @param {number} cardData.square - площадь
 * @param {string} cardData.floor - этаж
 * @param {number} cardData.price - цена
 * @param {string} cardData.status - какой статус у карточки(забронировано, продано и т.д.)
 */
Card.prototype._buildCard = function (cardData) {
    const resultsCards = document.querySelector('.results__cards');
    let {
        badges,
        img,
        title,
        rooms,
        finish,
        square,
        floor,
        price,
        status
    } = cardData;

    const statusTranslation = {
        reserved: 'забронировано',
        free: 'свободно',
        sold: 'продано'
    };

    const cardInnerNodes = [];

    //Создаём контейнер карточки
    const card = document.createElement('div');
    card.className = `apartment-card apartment-card_${status} col`;
    card.setAttribute('data-rooms', `${rooms}`);
    card.setAttribute('data-price', `${price}`);

    //Создаём хэдер карточки с бэйдэиками скидок и звёздочкой
    const cardHeader = document.createElement('div');
    cardHeader.className = 'apartment-card__header';
    const cardStar = '<span class="apartment-card__star"></span>';

    if (badges === null) {
        cardHeader.innerHTML = cardStar;
    } else if (badges.length > 1) {
        const headerBadges = badges.reduce((acc, el) => acc += `<span class="apartment-card__badge">${el}</span>`, ``);
        cardHeader.innerHTML = headerBadges + `${cardStar}`;
    } else if (badges) {
        cardHeader.innerHTML = `<span class="apartment-card__badge">${badges[0]}</span>` + `${cardStar}`;
    }

    cardInnerNodes.push(cardHeader);

    //Создаём изображение
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'apartment-card__img-wrapper';
    const cardImg = document.createElement('img');
    cardImg.className = 'apartment-card__img';
    cardImg.setAttribute('alt', 'plan');
    cardImg.setAttribute('src', `${img}`);
    imgWrapper.appendChild(cardImg);
    cardInnerNodes.push(imgWrapper);

    //Создаём название карточки
    const cardTitle = document.createElement('h4');
    cardTitle.className = 'apartment-card__title';
    cardTitle.textContent = `${title}`;
    cardInnerNodes.push(cardTitle);

    //Создаём контейнер с информацией
    const cardInfo = document.createElement('div');
    cardInfo.className = 'apartment-card__info';
    cardInnerNodes.push(cardInfo);

    //Добавляем информацию об отделке
    const textFinish = document.createElement('span');
    textFinish.className = 'apartment-card__text-finish';
    finish = finish.split(' ');
    textFinish.innerHTML = `${finish[0]}<br>${finish[1]}`;
    cardInfo.appendChild(textFinish);

    //Добавляем информацию о площади
    const textSquare = textFinish.cloneNode(false);
    textSquare.className = 'apartment-card__text-square';
    textSquare.innerHTML = `<span class="apartment-card__text-first-line">${square} м<sup>2</sup></span><br>площадь`;
    cardInfo.appendChild(textSquare);

    //Добавляем информацию об этаже
    const textFloor = textSquare.cloneNode(false);
    textFloor.className = 'apartment-card__text-floor';
    textFloor.innerHTML = `<span class="apartment-card__text-first-line">${floor}</span><br>этаж`;
    cardInfo.appendChild(textFloor);

    //Добавляем цену
    const cardPrice = document.createElement('p');
    cardPrice.className = 'apartment-card__price';

    price = price + '';

    const priceArr = [];

    while (price.length > 0) {
        if (price.length < 3) {
            priceArr.push(price);
            break;
        }
        priceArr.push(price.slice(price.length - 3));
        price = price.slice(0, price.length - 3);
    }

    price = priceArr.reverse().join(' ');

    cardPrice.textContent = `${price} руб.`;
    cardInnerNodes.push(cardPrice);

    //Создаём кнопку
    const cardBtn = document.createElement('button');
    cardBtn.className = `apartment-card__btn apartment-card__btn_${status}`;
    cardBtn.textContent = `${statusTranslation[status]}`;
    cardInnerNodes.push(cardBtn);

    //Циклом добавляем наши созданные элементы в контейнер карточки
    cardInnerNodes.forEach(el => card.appendChild(el));

    //Добавляем результаты в основной контейнер со всеми остальными карточками
    resultsCards.appendChild(card);
};

Card.prototype.showMore = function () {
    const btnShow = document.querySelector('.results__btn-show');
    let isEndOfResults = false;
    let remainingCards = [];

    function checkEnd() {
        if (remainingCards.length === 0) {
            isEndOfResults = true;
            btnShow.classList.remove('js-visible');
            return;
        }
    };
    return function () {

        if (isEndOfResults) {
            return;
        }

        if (remainingCards.length > 0) {
            const newArr = remainingCards.filter((el, indx) => {
                if (indx + 1 > 20) {
                    return el;
                } else {
                    this._buildCard(el);
                    return;
                }
            });

            remainingCards = [...newArr];
            btnShow.textContent = `Показать ещё ${remainingCards.length > 20 ? 20 : remainingCards.length}`;
            checkEnd();

        } else {
            this._response.forEach((el, indx) => {
                if (indx + 1 > 20) {
                    remainingCards.push(el);
                } else {
                    this._buildCard(el);
                }
            });
            checkEnd();
            btnShow.textContent = `Показать ещё ${remainingCards.length > 20 ? 20 : remainingCards.length}`;
        }
    };
};

Card.prototype.sortByPrice = function () {
    const {
        price: {
            ascending,
            descending
        }
    } = sortState;

    if (!ascending && !descending) {
        return;
    }
    const resultsCards = document.querySelector('.results__cards');
    const cards = document.querySelectorAll('.apartment-card');
    const itemsArr = [];

    for (let price in cards) {
        if (cards[price].nodeType === 1) {
            itemsArr.push(cards[price]);
        }
    }

    itemsArr.sort((a, b) => {

        if (descending) {
            return +a.getAttribute('data-price') === +b.getAttribute('data-price') ? 0 :
                +a.getAttribute('data-price') > +b.getAttribute('data-price') ? -1 : 1;
        }

        return +a.getAttribute('data-price') === +b.getAttribute('data-price') ? 0 :
            +a.getAttribute('data-price') > +b.getAttribute('data-price') ? 1 : -1;
    });

    itemsArr.forEach(el => resultsCards.appendChild(el));
};

Card.prototype.sortByRooms = function () {
    const {
        rooms: {
            ascending,
            descending
        }
    } = sortState;
    console.log(sortState);
    if (!ascending && !descending) {
        return;
    }
    const resultsCards = document.querySelector('.results__cards');
    const cards = document.querySelectorAll('.apartment-card');
    const itemsArr = [];

    for (let price in cards) {
        if (cards[price].nodeType === 1) {
            itemsArr.push(cards[price]);
        }
    }

    itemsArr.sort((a, b) => {

        if (descending) {

            return +a.getAttribute('data-rooms') === +b.getAttribute('data-rooms') ? 0 :
                +a.getAttribute('data-rooms') > +b.getAttribute('data-rooms') ? -1 : 1;
        }

        return +a.getAttribute('data-rooms') === +b.getAttribute('data-rooms') ? 0 :
            +a.getAttribute('data-rooms') > +b.getAttribute('data-rooms') ? 1 : -1;
    });

    itemsArr.forEach(el => resultsCards.appendChild(el));
};