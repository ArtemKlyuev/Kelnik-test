export default class Data {
    constructor() {
        this._url = null;
        this._response = null;
    }
    get response() {
        return this._response;
    }

    get url() {
        return this._url;
    }

    set url(newUrl) {
        this._url = newUrl;
    }

    /**
     * Проверка на ошибки сервера
     * @param {Object} response 
     */
    _checkServerStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }

    _showError(error) {
        console.error(error);
    }

    _customHandler() {}

    fetchData() {
        fetch(this._url)
            .then(this._checkServerStatus)
            .then(response => response.json())
            .then(jsonResponse => {
                const {
                    cards
                } = jsonResponse;

                this._response = cards;

                this._customHandler();
            })
            .catch(error => this._showError(error));
    }
};