let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close');
let name = document.querySelector('.profile__name');
let occupation = document.querySelector('.profile__occupation');
let popupName = document.querySelector('.popup__about_name');
let popupOccupation = document.querySelector('.popup__about_occupation');
let popupSubmitButton = document.querySelector('.popup__submit');
let popupInput = document.querySelector('.popup__input');


//вызвать popup
function popupToggle () {
    popup.classList.toggle('popup_is-open');
};


//поменять Имя и Род интересов
function newName (evt) {
    evt.preventDefault();

    name.textContent = popupName.value;
    occupation.innerText = popupOccupation.value;
};


//новое имя в графу popup
function about (evt) {
    evt.preventDefault();

    popupName.innerText = name.value;
    popupOccupation.innerText = occupation.value;
};


popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupInput.addEventListener('submit', newName);
popupSubmitButton.addEventListener('click', newName);
popupSubmitButton.addEventListener('click', popupToggle);