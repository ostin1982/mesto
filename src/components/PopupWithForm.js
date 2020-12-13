import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(modalWindow, formSubmitHandler) {
        super(modalWindow);
        this._formSubmitHandler = formSubmitHandler;   
        this._formForPopup = this._modalWindow.querySelector('.popup__input');    
    }

    _getInputValues() {
        this._popupAbout =  this._formForPopup.querySelectorAll('.popup__about'); 
        this._popupForm = {};  
        this._popupAbout.forEach(input => this._popupForm[input.name] = input.value);

        return this._popupForm;
    }

    setEventListeners() { 
        this._modalWindow.addEventListener('submit', (event) => {
            event.preventDefault();

            this._formSubmitHandler(this._getInputValues());
        });
        super.setEventListeners();
    }

    
    close() {
        super.close();
        this._formForPopup.reset(); 
    }
}


export default PopupWithForm;