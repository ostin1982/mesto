class Card {
    constructor(item, cardSelector, handleCardClick) {
        this._name = item.name;
        this._link = item.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
    _handleLikeClick() {
        this._htmlElement.querySelector('.element__like').classList.toggle('element__like_active'); 
    }

    //Удаление карточки
    _handleDeleteClick() {
        const elementDelete = this._htmlElement.querySelector('.element__basket').closest('.element__card');
        elementDelete.remove();
    }


    //Обработчик событий
    _setEventListeners() {
        this._htmlElement.querySelector('.element__like').addEventListener('click', () => this._handleLikeClick());
        this._htmlElement.querySelector('.element__basket').addEventListener('click', () => this._handleDeleteClick());
        this._htmlElement.addEventListener('click', () => this._handleCardClick((this._name, this._link)));
    }
    

    //Сбор карточки
    generateCard() {
        this._htmlElement = this._getTemplate();
        this._elImg = this._htmlElement.querySelector('.element__img');
        this._elName = this._htmlElement.querySelector('.element__name');
        this._setEventListeners();

        this._elImg.src = this._link;
        this._elName.innerText = this._name;
        this._elImg.alt = this._name;
        
        return this._htmlElement;
    }
}

export default Card;