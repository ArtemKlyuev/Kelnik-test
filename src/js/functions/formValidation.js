export default function formValidation() {

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