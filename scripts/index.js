let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close');
let name = document.querySelector('.profile__name');
let occupation = document.querySelector('.profile__occupation');
let popupName = popup.querySelector('.popup__about_name');
let popupOccupation = popup.querySelector('.popup__about_occupation');
let popupInput = popup.querySelector('.popup__input');


function popupToggle () {
    popup.classList.toggle('popup_is-open');
};


function newName (evt) {
    evt.preventDefault();

    name.textContent = popupName.value;
    occupation.textContent = popupOccupation.value;

    popupToggle();
};


function about () {

    name.value = popupName.textContent;
    occupation.value = popupOccupation.textContent;

    popupToggle();
};


popupOpenButton.addEventListener('click', about);
popupCloseButton.addEventListener('click', popupToggle);
popupInput.addEventListener('submit', newName);