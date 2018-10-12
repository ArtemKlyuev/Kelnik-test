export const sortState = {
    price: {
        ascending: false,
        descending: false,

        toggle(priceCounter) {
            if (priceCounter % 2) {
                this.descending = true;
                this.ascending = false;
            } else {
                this.descending = false;
                this.ascending = true;
            }
        },

        disable() {
            this.ascending = false;
            this.descending = false;
        }
    },
    rooms: {
        ascending: false,
        descending: false,

        toggle(roomCounter) {
            if (roomCounter % 2) {
                this.descending = true;
                this.ascending = false;
            } else {
                this.descending = false;
                this.ascending = true;
            }
        },

        disable() {
            this.ascending = false;
            this.descending = false;
        }
    }
};

export default function sortingCards() {
    const priceSwitcher = document.querySelectorAll('.results__switcher')[0];
    const roomsSwitcher = document.querySelectorAll('.results__switcher')[1];

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

        sortState.rooms.toggle(roomCounter);
        sortState.price.disable();

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

        priceSwitcher.classList.remove('js-selected');
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

        sortState.price.toggle(priceCounter);
        sortState.rooms.disable();

        itemsArr.sort((a, b) => {

            if (priceCounter % 2) {

                return +a.getAttribute('data-price') === +b.getAttribute('data-price') ? 0 :
                    +a.getAttribute('data-price') > +b.getAttribute('data-price') ? -1 : 1;
            }

            return +a.getAttribute('data-price') === +b.getAttribute('data-price') ? 0 :
                +a.getAttribute('data-price') > +b.getAttribute('data-price') ? 1 : -1;
        });

        itemsArr.forEach(el => resultsCards.appendChild(el));

        this.classList.toggle('results__switcher_descending');
        this.classList.contains('js-selected') ? null : this.classList.add('js-selected');

        roomsSwitcher.classList.remove('js-selected');
    };

    priceSwitcher.addEventListener('click', sortByPrice);
    roomsSwitcher.addEventListener('click', sortByRooms);
};