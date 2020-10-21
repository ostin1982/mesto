class FormValidator {
    constructor(enableValidationForm, popupInputForm) {
        this._popupInputForm = popupInputForm;
        this._popupForm = document.querySelector(popupInputForm);
        this._popupAboutForm = enableValidationForm.popupAboutForm;
        this._popupSubmitForm = enableValidationForm.popupSubmitForm;
        this._popupSubmitInactiveForm = enableValidationForm.popupSubmitInactiveForm;
        this._popupAboutErrorForm = enableValidationForm.popupAboutErrorForm;
        this._popupAboutRedLineForm = enableValidationForm.popupAboutRedLineForm;


        this._inputList = Array.from(this._popupForm.querySelectorAll(this._popupAboutForm));
        this._buttonElement = this._popupForm.querySelector(this._popupSubmitForm);
    }


    _showInputError(popupAbout, errorMessage) {
        const popupError = this._popupForm.querySelector(`#${popupAbout.id}-error`);
        popupAbout.classList.add(this._popupAboutRedLineForm);
        popupError.textContent = errorMessage; 
        popupError.classList.add(this._popupAboutErrorForm);    
    }
    
    
    _hideInputError(popupAbout) {
        const popupError = this._popupForm.querySelector(`#${popupAbout.id}-error`);    
        popupAbout.classList.remove(this._popupAboutRedLineForm);
        popupError.classList.remove(this._popupAboutErrorForm);    
        popupError.textContent = "";
    }

    _getErrorMessage(popupAbout){
        return popupAbout.validationMessage;
    };

    
    _checkInputValidity(popupAbout) {
        if (!popupAbout.validity.valid) {
            const errorMessage = this._getErrorMessage(popupAbout);

            this._showInputError(popupAbout, errorMessage);
        } else {
            this._hideInputError(popupAbout);
        }
    }


    _hasInvalidInput() {
        return  this._inputList.some((popupAbout) => {
            return !popupAbout.validity.valid;
        })
    };


    _disableAdd() {
        this._buttonElement.classList.add(this._popupSubmitInactiveForm);
        this._buttonElement.setAttribute("disabled", "true");
    }; 
    
    _disableRemove() {
        this._buttonElement.classList.remove(this._popupSubmitInactiveForm);
        this._buttonElement.removeAttribute("disabled");
    }

    
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableAdd();
        } else {
            this._disableRemove();
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((popupAbout) => {
            popupAbout.addEventListener('input', () => {
                this._checkInputValidity(popupAbout);
                this._toggleButtonState();
            })
        })
    } 


    enableValidation = () => {
        const submitFormHandler = (event) => {
            event.preventDefault();
            this._disableAdd(); 
            this._disableRemove();
        };


        this._popupForm.addEventListener("submit", submitFormHandler);
        this._setEventListeners();
    }
}

export default FormValidator;