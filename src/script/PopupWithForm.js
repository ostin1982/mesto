import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor({popupSelector, form}) {
        super(popupSelector);
        this._form = form;        
    }

    _getInputValues() {
        this._popupAbout =  this._popupInput.querySelectorAll('.popup__about'); 
        this._popupForm = {};  
        this._popupAbout.forEach(input => this._popupForm[input.name] = input.value);

        return this._popupForm;
    }

    setEventListeners() {    
        super.setEventListeners();    
        this._popupInput = this._element.querySelector('.popup__input');
        this._popupInput.addEventListener('submit', (event) => {
            event.preventDefault();

            this._form(this._getInputValues());
            this.close();
        });
        
    }

    
    close() {
        this._popupInput.reset();
        super.close();
    }
}

export default PopupWithForm;