class FormValidator {
    constructor(enableValidationForm, popupForm) {
        this._popupForm = popupForm;
        this._popupAboutForm = enableValidationForm.popupAboutForm;
        this._popupSubmitForm = enableValidationForm.popupSubmitForm;
        this._popupSubmitInactiveForm = enableValidationForm.popupSubmitInactiveForm;
        this._popupAboutErrorForm = enableValidationForm.popupAboutErrorForm;
        this._popupAboutRedLineForm = enableValidationForm.popupAboutRedLineForm;
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


    _hasInvalidInput(inputList) {
        return inputList.some((popupAbout) => {
            return !popupAbout.validity.valid;
        })
    };
    
    
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._popupSubmitInactiveForm);
        } else {
            buttonElement.classList.remove(this._popupSubmitInactiveForm);
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._popupForm.querySelectorAll(this._popupAboutForm))
        const buttonElement = this._popupForm.querySelector(this._popupSubmitForm);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((popupAbout) => {
            popupAbout.addEventListener('input', () => {
                this._checkInputValidity(popupAbout);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    } 


    enableValidation = () => {
        const submitFormHandler = (event) => {
            event.preventDefault();
        };

        this._popupForm.addEventListener("submit", submitFormHandler);

        this._setEventListeners();
    }
}

export default FormValidator;