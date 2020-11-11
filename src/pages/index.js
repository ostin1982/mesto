import './index.css';

import Card from '../script/Сard.js';
import FormValidator from '../script/FormValidator.js';
import Section from '../script/Section.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithForm from '../script/PopupWithForm.js';
import UserInfo from '../script/UserInfo.js';




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


//Объявляем переменные
const profileAddButton = document.querySelector('.profile__add-button');
const popupAboutPhotoCard = document.querySelector('.popup__about_photo-card');
const popupAboutOccupationPhotoCard = document.querySelector('.popup__about_occupation_photo-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupAboutName = document.querySelector('.popup__about_name');
const popupAboutOccupationName = document.querySelector('.popup__about_occupation_name');


//форма для валидации
const enableValidationForm = {
    popupInputForm: '.popup__input',
    popupAboutForm: '.popup__about',
    popupSubmitForm: '.popup__submit',
    popupSubmitInactiveForm: 'popup__submit_inactive',
    popupInputName: '.popup__input_name',
    popupInputPhotoCard: '.popup__input_photo-card',
    popupAboutErrorForm: 'popup__about-error',
    popupAboutRedLineForm: 'popup__about_red-line',
};


//Открытие карточки
const popupWithImage = new PopupWithImage('.popup__photo-big-card');



const handleCardClick = (name, link) => {
    popupWithImage.open(name, link);
}


//отрисовка карточек
const renderer = (item) => {
    const card = new Card(item, '.element', handleCardClick);
    const cardElement = card.generateCard();
    section.addItem(cardElement);
};


const section = new Section({ items: initialCards, renderer }, '.elements');


//Валидация 
const formValidatorNew = new FormValidator(enableValidationForm, enableValidationForm.popupInputName);

const formValidatorCard = new FormValidator(enableValidationForm, enableValidationForm.popupInputPhotoCard);



//Информация о профиле
const userInfo = new UserInfo({
    name: '.profile__name',
    occupation: '.profile__occupation',
});


//popup для добавлением новой карточки
const popupWithForm = new PopupWithForm({
    popupSelector: '.popup_photo-card',
    form: () => {
        renderer({
            name: popupAboutPhotoCard.value,
            link: popupAboutOccupationPhotoCard.value
        })
        popupWithForm.close();
    },
});

profileAddButton.addEventListener("click", () => {
    popupWithForm.open();
});


//popup с редактированием имени и рода занятий
const popupWithFormName = new PopupWithForm({
    popupSelector: '.popup_name',
    form: (items) => {
        userInfo.setUserInfo(items);
        userInfo.renderUserInfo();
        popupWithFormName.close();
    },
});


//редактирование имени и рода занятий
profileEditButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    popupAboutOccupationName.value = userData.occupation;
    popupAboutName.value = userData.name;
    popupWithFormName.open();
});


//Обработчики событий
popupWithImage.setEventListeners();
section.renderItems();
formValidatorNew.enableValidation();
formValidatorCard.enableValidation();
popupWithForm.setEventListeners();
popupWithFormName.setEventListeners();