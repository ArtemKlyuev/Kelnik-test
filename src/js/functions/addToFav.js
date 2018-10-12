export default function addToFav() {
    const stars = document.querySelectorAll('.apartment-card__star');

    const addToFave = function () {
        this.classList.toggle('apartment-card__star_favorite');
    }

    stars.forEach(el => el.addEventListener('click', addToFave));
};