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
const popupCloseName = popupName.querySelector('.popup__close');
const popupInputName = popupName.querySelector('.popup__input_name');
const popupAboutName = popupName.querySelector('.popup__about_name');
const popupAboutOccupationName = popupName.querySelector('.popup__about_occupation_name');


// popup для ввода фотокарточек (popup_photo-card)
const popupPhotoCard = document.querySelector('.popup_photo-card');
const popupClosePhotoCard = popupPhotoCard.querySelector('.popup__close');
const popupInputPhotoCard = popupPhotoCard.querySelector('.popup__input_photo-card');
const popupAboutPhotoCard = popupPhotoCard.querySelector('.popup__about_photo-card');
const popupAboutOccupationPhotoCard = popupPhotoCard.querySelector('.popup__about_occupation_photo-card');
const popupSubmitPhotoCard = popupPhotoCard.querySelector('.popup__submit_photo-card');



// popup с фотографией
const popupPhoto = document.querySelector('.popup__photo-big-card');
const popupPhotoBig = popupPhoto.querySelector('.popup__photo-big');
const popupPhotoEdit = popupPhoto.querySelector('.popup__photo-edit');
const popupPhotoClose = popupPhoto.querySelector('.popup__close');
const popupPhotoElement = popupPhoto.querySelector('.popup__photo-element');



// Профайл
const popupOpenButton = document.querySelector('.profile__edit-button');
const nickName = document.querySelector('.profile__name');
const occupation = document.querySelector('.profile__occupation');
const profileAddButton = document.querySelector('.profile__add-button');



// Элемент
const elements = document.querySelector('.elements');
const element = document.querySelector('.element').content;




// открытие-закрытие popup
function popupToggle(popup) {
    popup.classList.toggle('popup_is-open');
};


// добавление, сохранение и перенос имени в popup_name
function redactName(event) {
    event.preventDefault();

    nickName.textContent = popupAboutName.value;
    occupation.textContent = popupAboutOccupationName.value;

    popupToggle(popupName);
}

popupOpenButton.addEventListener('click', () => {
    popupAboutName.value = nickName.textContent;
    popupAboutOccupationName.value = occupation.textContent;
    
    popupToggle(popupName);
})


// открытие popup_photo-card
profileAddButton.addEventListener('click', () => {
    popupAboutPhotoCard.value = "";
    popupAboutOccupationPhotoCard.value = "";

    popupToggle(popupPhotoCard);
})



// закрытие по ESC
function popupCloseByEsc(event) {
    const popupOpen = document.querySelector('.popup_is-open')
    if (event.key === 'Escape') {
        popupToggle(popupOpen);
    }
}


// закрытие по крестику и мимо popup
popupAll.forEach((popup) => {
    const popupClose = popup.querySelector('.popup__close')
    popup.addEventListener('click', (evt) => {
        if ((evt.target !== evt.currentTarget) && (evt.target !== popupClose)) {
            return
        }
        popupToggle(popup)
    })
})


// Обработчики событий
popupSubmitPhotoCard.addEventListener('click', () => {
    popupToggle(popupPhotoCard);
})


popupName.addEventListener('submit', redactName);
popupInputPhotoCard.addEventListener('submit', photoNew);
popupClosePhotoCard.addEventListener('click', popupToggle);
document.addEventListener('keydown', popupCloseByEsc);




// создание карточки
function renderElement(card) {
    const htmlElement = element.cloneNode(true);
    const elementImg = htmlElement.querySelector('.element__img');
    const elementName = htmlElement.querySelector('.element__name');
    const elememtBasket = htmlElement.querySelector('.element__basket');

    elementName.innerText = card.name;
    elementImg.src = card.link;
    elementImg.alt = card.name;
    

    // Лайк карточки
    htmlElement.querySelector('.element__like').addEventListener('click', function(event) {
        event.target.classList.toggle('element__like_active');   
    });    
    
    // удаление элемента
    elememtBasket.addEventListener('click', function(event) {        
        const elementDelete = elememtBasket.closest('.element__card');
        elementDelete.remove(event.target);
    }); 
    

    // большой popup
    elementImg.addEventListener('click', () => {
        popupPhotoBig.src = card.link;
        popupPhotoEdit.innerText = card.name;
        popupPhotoBig.value = card.name; 
        
    
        popupToggle(popupPhoto);      
    });
    
    return htmlElement;
}


// добавление новой фотографии с подписью
function photoNew(event){
    event.preventDefault();

    const newElement = renderElement({name: popupAboutPhotoCard.value, link: popupAboutOccupationPhotoCard.value});
    renderCards(newElement, elements);
    
    popupToggle();
}


function renderCards(newElement, element){
    element.prepend(newElement);
}

initialCards.forEach(function (item){
    elements.appendChild(renderElement(item));
});