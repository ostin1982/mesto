import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.querySelector('.popup__submit').addEventListener('click', (event) => {
            event.preventDefault(); 

            this._formSubmitHandler();
        });        
    }
}

export default PopupWithSubmit;