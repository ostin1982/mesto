class Popup {
    constructor(popupSelector) {
        this._element = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._element.classList.add('popup_is-open');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._element.classList.remove('popup_is-open'); 
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners() {
        this._element.addEventListener('click', (event) => {
            if (event.target.classList.contains("popup__container") || event.target.classList.contains("popup__close") || event.target === event.currentTarget) {
                this.close();
            }
        });
    }
}

export default Popup;