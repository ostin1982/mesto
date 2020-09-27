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

const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
const nickName = document.querySelector('.profile__name');
const occupation = document.querySelector('.profile__occupation');
const popupNickName = popup.querySelector('.popup__about_name');
const popupOccupation = popup.querySelector('.popup__about_occupation');
const popupInput = popup.querySelector('.popup__input');
const popupSubmit = popup.querySelector('.popup__submit');
const popupEdit = popup.querySelector('.popup__edit');
const elements = document.querySelector('.elements');
const element = document.querySelector('.element').content;
const profileAddButton = document.querySelector('.profile__add-button');
const foto = document.querySelector('.foto');
const fotoCloseButton = document.querySelector('.foto__close');
const fotoNickName = document.querySelector('.foto__about_name');
const fotoOccupation = document.querySelector('.foto__about_occupation');
const fotoInput = document.querySelector('.foto__input');
const fotoSubmit = document.querySelector('.foto__submit');
const fotoEdit = document.querySelector('.foto__edit');
const popupFoto = document.querySelector('.popup-foto');
const popupFotoBig = document.querySelector('.popup-foto__big');
const popupFotoEdit = document.querySelector('.popup-foto__edit');
const popupFotoClose = document.querySelector('.popup-foto__close');
const popupFotoElement = document.querySelector('.popup-foto__element');




function popupToggle() {
    popup.classList.toggle('popup_is-open');
};

function newName(event) {
    event.preventDefault();

    nickName.textContent = popupNickName.value;
    occupation.textContent = popupOccupation.value;

    popupToggle();
};


function about() {
    popupNickName.value = nickName.textContent;
    popupOccupation.value = occupation.textContent;

    popupToggle();
}
/** 6 спринт
document.addEventListener('keydown', function (event) {
    if(event.keyCode == 27) {
        popup.classList.remove('popup_is-open');
        }
    })

function popupCloseByClickOnOverlay(event) {
    if (event.target !== event.currentTarget) {
        return
    }

    popupToggle(event)
}
*/

popupOpenButton.addEventListener('click', about);
popupCloseButton.addEventListener('click', popupToggle);
popupInput.addEventListener('submit', newName);
//popup.addEventListener('click', popupCloseByClickOnOverlay);


function fotoToggle() {
    foto.classList.toggle('foto_is-open');
};


function newNameFoto(event) {
    event.preventDefault();
    
    fotoNickName.value = "Название";
    fotoOccupation.value = "Ссылка на картинку";

    fotoToggle();
};

/** 6 спринт
    document.addEventListener('keydown', function (event) {
    if(event.keyCode == 27) {
        foto.classList.remove('foto_is-open');
        }
    })


function fotoCloseByClickOnOverlay(event) {
    if (event.target !== event.currentTarget) {
        return
    }

    fotoToggle(event);
}    
*/
profileAddButton.addEventListener('click', newNameFoto);
fotoCloseButton.addEventListener('click', fotoToggle);
fotoInput.addEventListener('submit', fotoNew);
fotoSubmit.addEventListener('click', fotoToggle);
//foto.addEventListener('click', fotoCloseByClickOnOverlay);


function popupFotoToggle () {
    popupFoto.classList.toggle('popup-foto_is-open');
};

/** 6 спринт
document.addEventListener('keydown', function (event) {
    if(event.keyCode == 27) {
        popupFoto.classList.remove('popup-foto_is-open');
        }
    })

function popupFotoCloseByClickOnOverlay(event) {
    if (event.target !== event.currentTarget) {
        return
    }
    popupFotoToggle(event);
    }    
*/
popupFotoClose.addEventListener('click', popupFotoToggle);
//popupFoto.addEventListener('click', popupFotoCloseByClickOnOverlay);


function renderElement(card) {
    const htmlElement = element.cloneNode(true);
    const elementImg = htmlElement.querySelector('.element__img');
    const elementName = htmlElement.querySelector('.element__name');
    const elememtBasket = htmlElement.querySelector('.elememt__basket');

    elementName.innerText = card.name;
    elementImg.src = card.link;
    elementImg.alt = card.name;
    

    htmlElement.querySelector('.element__like').addEventListener('click', function(event) {
        event.target.classList.toggle('element__like_active');
        /** 
         * event.stopPropagation('.popup-foto_is-open');
         *   */     
    });    
    
    elememtBasket.addEventListener('click', function(event) {        
        const elementDelete = elememtBasket.closest('.element__card');
        elementDelete.remove(event.target);
        /**
         * event.stopPropagation('.popup-foto_is-open');
         *   */
    }); 

    elementImg.addEventListener('click', () => {
        popupFotoBig.src = card.link;
        popupFotoEdit.innerText = card.name;
        popupFotoBig.value = card.name; 
        //Меня смущает, что срабатывает только до момента, пока не кликнул по карточке, после и 'лайк' и 'удалить' открывают popup с фото. event.stopPropagation показалась лучшей идеей.
        elements.addEventListener('click', popupFotoToggle);      
    });

elements.appendChild(htmlElement);
}

function fotoNew(event) {
    event.preventDefault();

    initialCards.prepend(renderElement({name: fotoNickName.value, link: fotoOccupation.value}));
}


elements.innerHTML = "";
initialCards.forEach(renderElement);