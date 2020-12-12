import '../pages/index.css';

import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';


const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
        authorization: '8332b55f-19df-4a02-8ae6-2a849ecc3e1d',
        'Content-Type': 'application/json'
    }
});


//форма для валидации
const enableValidationForm = {
    popupInputForm: '.popup__input',
    popupAboutForm: '.popup__about',
    popupSubmitForm: '.popup__submit',
    popupSubmitInactiveForm: 'popup__submit_inactive',
    popupInputName: '.popup__input_name',
    popupInputPhotoCard: '.popup__input_photo-card',
    popupInputNewAvatar: '.popup__input_new-avatar',
    popupAboutErrorForm: 'popup__about-error',
    popupAboutRedLineForm: 'popup__about_red-line',
};


const popupPhotoBigCard = document.querySelector('.popup__photo-big-card');
const popupPhotoDelete = document.querySelector('.popup__photo-delete');
const popupPhotoDeleteContainer = document.querySelector('.popup__photo-delete_container');
const popupPhotoCard = document.querySelector('.popup_photo-card');
const popupInputName = '.popup__input_name';
const popupSubmitPhotoCard = document.querySelector('.popup__submit_photo-card');
const popupName = document.querySelector('.popup_name');
const popupSubmitName = document.querySelector('.popup__submit_name');
const popupAboutName = document.querySelector('.popup__about_name');
const popupAboutOccupationName = document.querySelector('.popup__about_occupation_name');
const popupNewAvatar = document.querySelector('.popup__new-avatar');
const popupSubmitNewAvatar = document.querySelector('.popup__submit_new-avatar');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAvatar = document.querySelector('.profile__avatar');



let userId;

Promise.all([api.getInitialCards(), api.getUserInfoAbout()])
    .then(([card, userData, imgSrc]) => { 
        userId = userData._id;       
        userInfo.setUserInfo(userData, imgSrc);
        section.renderItems(card);
        
    })
    .catch((error) => {
        console.log(`Ошибка при попытке загрузить данные пользователя и карточки: ${error}`);
    });


const userElements = {
    name: document.querySelector('.profile__name'), 
    about: document.querySelector('.profile__occupation'), 
    avatar: document.querySelector('.profile__avatar-img')
}

const userInfo = new UserInfo(userElements);

const section = new Section({
    element: [],
    renderer: (card) => {
        const cardElement = createCardCopy(card).generateCard();
        section.addItem(cardElement);
    }}, '.elements'
)

//Блок работа с карточкой
//Создание карточки
/** добавил в PopupWithSubmit.js setFormSubmitHandler */
const popupWithSubmit = new PopupWithSubmit(popupPhotoDelete);

const createCardCopy = (card) => {
    const cardCopy = new Card (userId, {        
        data: card, 
        handleCardClick: (popupPhotoBigCard) => { 
            popupWithImageBox.open(popupPhotoBigCard); 
        },

        handleLikeClick: () => {
            api.addLikeCard(card)
            .then((response) => {
                cardCopy.getLikes(response);
            })
            .catch(error => console.log(`Ошибка при добавлении лайка: ${error}`));
        },

        handleDislikeCard: () => {
            api.deleteLikeCard(card)
            .then((response) => {
                cardCopy.getLikes(response);
            })
            .catch(error => console.log(`Ошибка при удалении лайка: ${error}`));
        },

        handleDeleteClick: () => {
            /** вызываю таким образом. Надеюсь правильно понял. */
            popupWithSubmit.setFormSubmitHandler(() => {
                popupPhotoDeleteContainer.innerText = "Удаление...";
                api.deleteCard(card)                
                .then(() => {
                    popupWithSubmit.close();
                    popupPhotoDeleteContainer.innerText = "Да";
                    cardCopy.removeCard();
                    })             
                .catch(error => console.log(`Ошибка при удалении карточки: ${error}`))
                })
            
            popupWithSubmit.setEventListeners();
            popupWithSubmit.open()
        },
    }, '.element');
        return cardCopy;
}


const popupWithImage = new PopupWithImage(popupPhotoBigCard);
popupWithImage.setEventListeners();


// Добавление карточки
const popupWithFormCard = new PopupWithForm(    
    popupPhotoCard, (card) => {
        popupSubmitPhotoCard.innerText = 'Сохранение...';
        popupInputName;
        api.addNewCard({
            name: card.name,
            link: card.about,
            })
        .then((cardObject) => {
        const cardElement = createCardCopy(cardObject).generateCard();
        popupSubmitPhotoCard.innerText = 'Сохранить';
        popupWithFormCard.close();
        section.addItem(cardElement);
        })
    .catch((error) => console.log(`Ошибка при добавлении карточки: ${error}`));
});

popupWithFormCard.setEventListeners();

profileAddButton.addEventListener('click', () => {
    popupWithFormCard.open(); 
});


const popupWithImageBox = new PopupWithImage(popupPhotoBigCard);
popupWithImageBox.setEventListeners();


//Блок работы с информацией
//Редактировать имя и род занятий
const popupWithForm = new PopupWithForm(
    popupName, (card) => { 
        popupInputName;
        popupSubmitName.innerText = 'Сохранение...';
        api.changeInfo(card)
        .then(result => {
            userInfo.setUserInfo({name: result.name, about: result.about}); 
            popupSubmitPhotoCard.innerText = 'Сохранить';
            popupWithForm.close()
        })
        .catch(error => console.log(`Ошибка при изменении данных профиля: ${error}`))
    });

popupWithForm.setEventListeners();

profileEditButton.addEventListener('click', () => {
    const {name, occupation} = userInfo.getUserInfo();
    popupAboutName.value = name;
    popupAboutOccupationName.value = occupation;
    popupWithForm.open();
});


//Поменять аватар
const popupWithFormAvatar = new PopupWithForm (
    popupNewAvatar, (card) => { 
        popupInputName;  
        popupSubmitNewAvatar.innerText = 'Сохранение...';
        api.changeUserAvatar(card)
        .then((result) => {
            userInfo.setUserInfo({avatar: result.avatar});
            popupSubmitNewAvatar.innerText = 'Сохранить';
            popupWithFormAvatar.close()
        })        
        .catch(error => console.log(`Ошибка при изменении аватара: ${error}`))
    }
)

popupWithFormAvatar.setEventListeners();

profileAvatar.addEventListener('click', () => {
    popupWithFormAvatar.open();
    }
)


//Валидация 
const formValidatorNew = new FormValidator(enableValidationForm, enableValidationForm.popupInputName);
const formValidatorCard = new FormValidator(enableValidationForm, enableValidationForm.popupInputPhotoCard);
const formValidatorAvatar = new FormValidator(enableValidationForm, enableValidationForm.popupInputNewAvatar);

formValidatorNew.enableValidation();
formValidatorCard.enableValidation();
formValidatorAvatar.enableValidation();