import forEachPolyfill from './functions/Nodelist.forEach.polyfill';
import scrollToTop from './functions/scrollToTop';
import addToFav from './functions/addToFav';
import sortingCards from './functions/sort';
import mobileMenu from './functions/mobileMenu';
import formValidation from './functions/formValidation';
import Card from './classes/Card';

forEachPolyfill();

scrollToTop();

addToFav();

sortingCards();

mobileMenu();

formValidation();

const card = new Card();

card.url = 'data/data.json';

card.fetchData();

const showMore = card.showMore().bind(card);

const btnShow = document.querySelector('.results__btn-show');
btnShow.addEventListener('click', showMore);
btnShow.addEventListener('click', card.sortByPrice);
btnShow.addEventListener('click', card.sortByRooms);
btnShow.addEventListener('click', addToFav);