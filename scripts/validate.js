//Валидация popup
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
    const buttonElement = document.querySelector('.popup__submit');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((popupAbout) => {
        popupAbout.addEventListener('input', () => {
            checkInputValidity(popupInput, popupAbout);
            toggleButtonState(inputList, buttonElement);
        })
    })
}

const enableValidationPopup = () => {
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

/** не очень понимаю, что необходимо. Что необходимо почитать, что бы лучше понять?
enableValidation({
    popupInput: '.popup__input',
    popuAbout: '.popu__about',
    popupSubmit: '.popup__submit',
    popupSubmitInactive: 'popup__submit_inactive',
    popupAboutErrorActive: 'popup__about-error_active',
}); 
*/

enableValidationPopup();


//Валидация foto
const showFotoInputError = (fotoInput, fotoAbout, errorMessage) => {
    const fotoError = fotoInput.querySelector(`#${fotoAbout.id}-error`);
    fotoError.textContent = errorMessage;
    fotoError.classList.add('foto__about-error_active');
}

const hideFotoInputError = (fotoInput, fotoAbout) => {
    const fotoError = fotoInput.querySelector(`#${fotoAbout.id}-error`);
    fotoError.textContent = "";
    fotoError.classList.remove('foto__about-error_active');
}

const checkFotoInputValidity = (fotoInput, fotoAbout) => {
    if (!fotoAbout.validity.valid) {
        showFotoInputError(fotoInput, fotoAbout, fotoAbout.validationMessage);
    } else {
        hideFotoInputError(fotoInput, fotoAbout);
    }
}


const setEventListenersFoto = (fotoInput) => {
    const inputListFoto = Array.from(fotoInput.querySelectorAll('.foto__about'));
    const buttonElementFoto = document.querySelector('.foto__submit');
    toggleFotoButtonState(inputListFoto, buttonElementFoto);
    inputListFoto.forEach((fotoAbout) => {
        fotoAbout.addEventListener('input', () => {
            checkFotoInputValidity(fotoInput, fotoAbout);
            toggleFotoButtonState(inputListFoto, buttonElementFoto);
        })
    })
}


const enableValidationFoto = () => {
    const formListFoto = Array.from(document.querySelectorAll('.foto__input'));
    formListFoto.forEach((fotoInput) => {
        fotoInput.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        setEventListenersFoto(fotoInput);
    })
}

const hasFotoInvalidInput = (inputListFoto) => {
    return inputListFoto.some((fotoAbout) => {
        return !fotoAbout.validity.valid;
    })
};

const toggleFotoButtonState = (inputListFoto, buttonElementFoto) => {
    if (hasFotoInvalidInput(inputListFoto)) {
        buttonElementFoto.classList.add('foto__submit_inactive');
    } else {
        buttonElementFoto.classList.remove('foto__submit_inactive');
    }
}


enableValidationFoto();