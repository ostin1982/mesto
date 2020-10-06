// заработало только через const, без нее выдавало ошибку

const enableValidationForm = {
    popupInputForm: '.popup__input',
    popupAboutForm: '.popup__about',
    popupSubmitForm: '.popup__submit',
    popupSubmitInactiveForm: 'popup__submit_inactive',
    popupAboutErrorForm: 'popup__about-error',
    popupAboutRedLineForm: 'popup__about_red-line',
};



const showInputError = (popupInput, popupAbout, errorMessage, enableValidationForm) => {
    const popupError = popupInput.querySelector(`#${popupAbout.id}-error`);
    popupAbout.classList.add(enableValidationForm.popupAboutRedLineForm);
    popupError.textContent = errorMessage; 
    popupError.classList.add(enableValidationForm.popupAboutErrorForm);    
}


const hideInputError = (popupInput, popupAbout, enableValidationForm) => {
    const popupError = popupInput.querySelector(`#${popupAbout.id}-error`);    
    popupAbout.classList.remove(enableValidationForm.popupAboutRedLineForm);
    popupError.classList.remove(enableValidationForm.popupAboutErrorForm);    
    popupError.textContent = "";
}


const checkInputValidity = (popupInput, popupAbout, enableValidationForm) => {
    if (!popupAbout.validity.valid) {
        showInputError(popupInput, popupAbout, popupAbout.validationMessage, enableValidationForm);
    } else {
        hideInputError(popupInput, popupAbout, enableValidationForm);
    }
}


const setEventListeners = (popupInput, enableValidationForm) => {
    const inputList = Array.from(popupInput.querySelectorAll(enableValidationForm.popupAboutForm));
    const buttonElement = popupInput.querySelector(enableValidationForm.popupSubmitForm);
    toggleButtonState(inputList, buttonElement, enableValidationForm);
    inputList.forEach((popupAbout) => {
        popupAbout.addEventListener('input', () => {
            checkInputValidity(popupInput, popupAbout, enableValidationForm);
            toggleButtonState(inputList, buttonElement, enableValidationForm);
        })
    })
}

const enableValidation = (enableValidationForm) => {
    const formList = Array.from(document.querySelectorAll(enableValidationForm.popupInputForm));
    formList.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        setEventListeners(form, enableValidationForm);
    })
}

const hasInvalidInput = (inputList) => {
    return inputList.some((popupAbout) => {
        return !popupAbout.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, enableValidationForm) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(enableValidationForm.popupSubmitInactiveForm);
    } else {
        buttonElement.classList.remove(enableValidationForm.popupSubmitInactiveForm);
    }
}


enableValidation(enableValidationForm);