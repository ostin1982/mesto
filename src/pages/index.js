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

export const elementConfig = {
    element: document.querySelector('.element'),
    elements: document.querySelector('.elements'),
    popupPhotoBig: document.querySelector('.popup__photo-big'),
    popupPhotoEdit: document.querySelector('.popup__photo-edit'),
    elementImg: '.element__img',
    elementName: '.element__name',
    elementBasket: '.element__basket',
    elementLike: '.element__like',
    elementLikeActive: '.element__like_active'
}


//Открытие карточки
const popupWithImage = new PopupWithImage('.popup__photo-big-card');
popupWithImage.setEventListeners();


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
section.renderItems();


//Валидация 
const formValidatorNew = new FormValidator(enableValidationForm, enableValidationForm.popupInputName);
formValidatorNew.enableValidation();

const formValidatorCard = new FormValidator(enableValidationForm, enableValidationForm.popupInputPhotoCard);
formValidatorCard.enableValidation();



//Информация о профиле
const userInfo = new UserInfo({
    name: '.profile__name',
    occupation: '.profile__occupation',
});


//popup для добавлением новой карточки
const profileAddButton = document.querySelector('.profile__add-button');
const popupAboutPhotoCard = document.querySelector('.popup__about_photo-card');
const popupAboutOccupationPhotoCard = document.querySelector('.popup__about_occupation_photo-card');


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

popupWithForm.setEventListeners();


//popup с редактированием имени и рода занятий
const profileEditButton = document.querySelector('.profile__edit-button');


const popupWithFormName = new PopupWithForm({
    popupSelector: '.popup_name',
    form: (items) => {
        userInfo.setUserInfo(items);
        userInfo.renderUserInfo();
        popupWithFormName.close();
    },
});

popupWithFormName.setEventListeners();



//редактирование имени и рода занятий
const popupAboutName = document.querySelector('.popup__about_name');
const popupAboutOccupationName = document.querySelector('.popup__about_occupation_name');


profileEditButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    popupAboutOccupationName.value = userData.occupation;
    popupAboutName.value = userData.name;
    popupWithFormName.open();
});