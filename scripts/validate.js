const showInputError = (popupInput, popupAbout, errorMessage) => {
    const popupError = popupInput.querySelector(`#${popupAbout.id}-error`);
    popupError.textContent = errorMessage;
    popupError.classList.add('popup__about-error_active');
}


const hideInputError = (popupInput, popupAbout) => {
    const popupError = popupInput.querySelector(`#${popupAbout.id}-error`);
    popupError.textContent = "";
    popupError.classList.remove('popup__about-error_active');
}


const checkInputValidity = (popupInput, popupAbout) => {
    if (!popupAbout.validity.valid) {
        showInputError(popupInput, popupAbout, popupAbout.validationMessage);
    } else {
        hideInputError(popupInput, popupAbout);
    }
}


const setEventListeners = (popupInput) => {
    const inputList = Array.from(popupInput.querySelectorAll('.popup__about'));
    const buttonElement = popupInput.querySelector('.popup__submit');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((popupAbout) => {
        popupAbout.addEventListener('input', () => {
            checkInputValidity(popupInput, popupAbout);
            toggleButtonState(inputList, buttonElement);
        })
    })
}

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__input'));
    formList.forEach((popupInput) => {
        popupInput.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        setEventListeners(popupInput);
    })
}

const hasInvalidInput = (inputList) => {
    return inputList.some((popupAbout) => {
        return !popupAbout.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit_inactive');
    } else {
        buttonElement.classList.remove('popup__submit_inactive');
    }
}



enableValidation({
    popupInput: '.popup__input',
    popuAbout: '.popu__about',
    popupSubmit: '.popup__submit',
    popupSubmitInactive: 'popup__submit_inactive',
    popupAboutErrorActive: 'popup__about-error_active',
});