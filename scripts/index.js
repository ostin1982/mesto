const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// найдем все popup
const popupAll = Array.from(document.querySelectorAll('.popup'));



// popup Имя-Род занятий (popup_name)
const popupName = document.querySelector('.popup_name');
const popupAboutName = popupName.querySelector('.popup__about_name');
const popupAboutOccupationName = popupName.querySelector('.popup__about_occupation_name');


// popup для ввода фотокарточек (popup_photo-card)
const popupPhotoCard = document.querySelector('.popup_photo-card');
const popupInputPhotoCard = popupPhotoCard.querySelector('.popup__input_photo-card');
const popupAboutPhotoCard = popupPhotoCard.querySelector('.popup__about_photo-card');
const popupAboutOccupationPhotoCard = popupPhotoCard.querySelector('.popup__about_occupation_photo-card');
const popupSubmitPhotoCard = popupPhotoCard.querySelector('.popup__submit_photo-card');



// popup с фотографией
export const popupPhoto = document.querySelector('.popup__photo-big-card');
export const popupPhotoBig = popupPhoto.querySelector('.popup__photo-big');
export const popupPhotoEdit = popupPhoto.querySelector('.popup__photo-edit');



// Профайл
const popupOpenButton = document.querySelector('.profile__edit-button');
const nickName = document.querySelector('.profile__name');
const occupation = document.querySelector('.profile__occupation');
const profileAddButton = document.querySelector('.profile__add-button');



// Элемент
const elements = document.querySelector('.elements');



//форма для валидации
const enableValidationForm = {
    popupInputForm: '.popup__input_name',
    popupForm: document.querySelector('.popup__input_name'),
    popupAboutForm: '.popup__about',
    popupSubmitForm: '.popup__submit',
    popupSubmitInactiveForm: 'popup__submit_inactive',
    popupAboutErrorForm: 'popup__about-error',
    popupAboutRedLineForm: 'popup__about_red-line',
};


const enableValidationCard = {
    popupInputForm: '.popup__input_photo-card',
    popupForm: document.querySelector('.popup__input_photo-card'),
    popupAboutForm: '.popup__about',
    popupSubmitForm: '.popup__submit',
    popupSubmitInactiveForm: 'popup__submit_inactive',
    popupAboutErrorForm: 'popup__about-error',
    popupAboutRedLineForm: 'popup__about_red-line',
};



import Card from './Сard.js';
import FormValidator from './FormValidator.js';



//Подклюаем Валидацию
const formValidatorNew = new FormValidator(enableValidationForm, enableValidationForm.popupForm);
formValidatorNew.enableValidation();

const formValidatorCard = new FormValidator(enableValidationCard, enableValidationCard.popupForm);
formValidatorCard.enableValidation();


//Собираем карточку из Card
initialCards.forEach((item) => {
    const card = new Card(item, '.element');
    const cardElement = card.generateCard();
    elements.append(cardElement);
})


// добавление новой фотографии с подписью
function renderCards(item) {
    const card = new Card(item, '.element')
    elements.prepend(card.generateCard());
}

function photoNew(event) {
    event.preventDefault();    

    renderCards({name: popupAboutPhotoCard.value, link: popupAboutOccupationPhotoCard.value});
    popupPhotoCard.querySelector('.popup__input_photo-card').reset();
    popupRemove(popupPhotoCard);
}



/**  открытие-закрытие popup
function popupToggle(popup) {
    popup.classList.toggle('popup_is-open');
};
*/


// открытие карточки
export function popupAdd(popup) {
    document.addEventListener('keydown', popupCloseByEsc);
    popup.classList.add('popup_is-open');
}


// закрытие карточки 
function popupRemove(popup) {
    document.removeEventListener('keydown', popupCloseByEsc);
    popup.classList.remove('popup_is-open');
}



// добавление, сохранение и перенос имени в popup_name
function redactName(event) {
    event.preventDefault();

    nickName.textContent = popupAboutName.value;
    occupation.textContent = popupAboutOccupationName.value;

    popupRemove(popupName);
}

popupOpenButton.addEventListener('click', () => {
    popupAboutName.value = nickName.textContent;
    popupAboutOccupationName.value = occupation.textContent;
    
    popupAdd(popupName);
})


// открытие popup_photo-card
profileAddButton.addEventListener('click', () => {
    popupAboutPhotoCard.value = "";
    popupAboutOccupationPhotoCard.value = "";

    popupAdd(popupPhotoCard);
})



// закрытие по ESC
function popupCloseByEsc(event) {
    const popupOpen = document.querySelector('.popup_is-open')
    if (event.key === 'Escape') {
        popupRemove(popupOpen);
    }
}


// закрытие по крестику и мимо popup
popupAll.forEach((popup) => {
    const popupClose = popup.querySelector('.popup__close')
    popup.addEventListener('click', (event) => {
        if ((event.target !== event.currentTarget) && (event.target !== popupClose)) {
            return
        }
        popupRemove(popup)
    })
})


// Обработчики событий
popupSubmitPhotoCard.addEventListener('click', () => {
    popupRemove(popupPhotoCard);
})


popupName.addEventListener('submit', redactName);
popupInputPhotoCard.addEventListener('submit', photoNew);