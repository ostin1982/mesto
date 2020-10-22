import { popupPhoto, popupPhotoBig, popupPhotoEdit, popupAdd } from './index.js';


class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const renderElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element__card')
        .cloneNode(true); 

        return renderElement;
    }

    //добавление Like
    _handleLikeClick(event) {
        event.target.classList.toggle('element__like_active'); 
    }

    //Удаление карточки
    _handleDeleteClick(event) {
        const elementDelete = this._htmlElement.querySelector('.element__basket').closest('.element__card');
        elementDelete.remove(event.target);
    }

    //Увеличение карточки
    _openBigPhoto() {        
        popupPhotoBig.src = this._link;
        popupPhotoBig.alt = this._name;
        popupPhotoEdit.innerText = this._name;
        popupAdd(popupPhoto);
    }


    //Обработчик событий
    _setEventListeners() {
        this._htmlElement.querySelector('.element__like').addEventListener('click', (event) => {
            this._handleLikeClick(event) 
        });
        this._htmlElement.querySelector('.element__basket').addEventListener('click', (event) => {
            this._handleDeleteClick(event) 
        });
        this._htmlElement.querySelector('.element__img').addEventListener('click', () => {
            this._openBigPhoto(); 
        });
    }
    

    //Сбор карточки
    generateCard() {
        this._htmlElement = this._getTemplate();
        this._elImg = this._htmlElement.querySelector('.element__img');
        this._elName = this._htmlElement.querySelector('.element__name');

        this._elImg.src = this._link;
        this._elName.innerText = this._name;
        this._elImg.alt = this._name;

        this._setEventListeners();
        return this._htmlElement;
    }
}

export default Card;