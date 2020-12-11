import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;   
        this._popupInput = this._popupSelector.querySelector('.popup__input');   
        this._defaultSubmitButtonText = this._popupInput.value; 
    }

    _getInputValues() {
        this._popupAbout =  this._popupInput.querySelectorAll('.popup__about'); 
        this._popupForm = {};  
        this._popupAbout.forEach(input => this._popupForm[input.name] = input.value);

        return this._popupForm;
    }

    setEventListeners() { 
        this._popupSelector.addEventListener('click', () => {
        });

        this._popupSelector.addEventListener('submit', (event) => {
            event.preventDefault();

            this._formSubmitHandler(this._getInputValues());
        });
        super.setEventListeners();
    }

    resetWaitSubmitButton() {
        this._popupInput.value = this._defaultSubmitButtonText;
    }

    
    close() {
        this._popupInput.removeEventListener('submit', this._submitCallback);
        super.close();
    }
}


export default PopupWithForm;