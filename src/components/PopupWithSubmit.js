import Popup from './Popup.js';

class PopupWithSubmit extends Popup {
constructor(modalWindow, formSubmitHandler) {
    super(modalWindow);
    this._formSubmitHandler = formSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._modalWindow.querySelector('.popup__submit').addEventListener('click', (event) => {
            event.preventDefault(); 

            this._formSubmitHandler();
        });        
    }

    setFormSubmitHandler(handle) {
        this._formSubmitHandler = handle;
    }
}

export default PopupWithSubmit;