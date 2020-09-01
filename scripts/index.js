//вызвать popup

let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.js-popup__open');
let popupCloseButton = popup.querySelector('.js-popup__close');

let popupToggle = function() {
    popup.classList.toggle('popup_is-open')
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

//Поменять Имя и Род интересов

let name = document.querySelector('.profile__name');
let occupation = document.querySelector('.profile__occupation');
let popupName = document.querySelector('.popup__name');
let popupOccupation = document.querySelector('.popup__occupation');
let popupSubmitButton = document.querySelector('.popup__submit');

function newName (evt) {
    evt.preventDefault();

    name.textContent = popupName.value;
}


popupSubmitButton.addEventListener('submit', newName);
popupSubmitButton.addEventListener('click', newName);
popupSubmitButton.addEventListener('click', popupToggle);



function newOccupation (evt) {
    evt.preventDefault();

    occupation.innerText = popupOccupation.value;
}


popupSubmitButton.addEventListener('submit', newOccupation);
popupSubmitButton.addEventListener('click', newOccupation);
popupSubmitButton.addEventListener('click', popupToggle);

