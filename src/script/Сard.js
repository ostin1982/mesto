class Card {
    constructor(userId, values, cardSelector) {
        this._name = values.data.name;
        this._link = values.data.link;    
        this._cardLikes = values.data.likes; 
        this._ownerId = values.data.owner; 
        this._handleCardClick = values.handleCardClick;
        this._handleLikeClick = values.handleLikeClick;
        this._handleDislikeCard = values.handleDislikeCard;
        this._handleDeleteClick = values.handleDeleteClick;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._liked = values.data.likes.some((user) => user._id === this._userId);
    }

    _getTemplate() {
        const renderElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element__card')
        .cloneNode(true); 

        return renderElement;
    }


    //Сбор карточки
    generateCard() {
        this._htmlElement = this._getTemplate();
        this._elImg = this._htmlElement.querySelector('.element__img');
        this._elName = this._htmlElement.querySelector('.element__name');
        this._elLike = this._htmlElement.querySelector('.element__like');
        this._elBasket = this._htmlElement.querySelector('.element__basket');
        this._elLikeNumber = this._htmlElement.querySelector('.element__like-number');
    
        this._elImg.src = this._link;
        this._elName.innerText = this._name;
        this._elImg.alt = this._name;
    
        this._setEventListeners();
    
        this._checkId();

        if (!this._yourCard) {
            this._elBasket.remove();
        }

        this._elLikeNumber.innerText = this._cardLikes.length;

        return this._htmlElement;
    }
    
    _checkId() {
        this._userId === this._ownerId._id
        ? this._yourCard = true
        : this._yourCard = false;
    }

    setLikes(likes) {
        this._htmlElement.querySelector('.element__like-number').innerText = likes;
    }

    _renderLikeButton(liked) {
        if (liked) {
            this._htmlElement.querySelector('.element__like').classList.add("element__like_active");
        } else {
            this._htmlElement.querySelector('.element__like').classList.remove("element__like_active");
        }
    }

    getLikes(card) {
        this._liked = !this._liked;
        this.setLikes(card.likes.length);
        this._renderLikeButton(this._liked);
    }

    _handleLike() {
        if (!this._liked) {
        this._handleLikeClick();
        } else {
        this._handleDislikeCard();
        }
    }

    removeCard() {
        this._htmlElement.remove();
        this._htmlElement = null;
    }

    //Обработчик событий
    _setEventListeners() {
        this._htmlElement.querySelector('.element__like').addEventListener('click', this._handleLike.bind(this));
        this._htmlElement.querySelector('.element__basket').addEventListener('click', () => {this._handleDeleteClick()});
        this._htmlElement.querySelector('.element__img').addEventListener('click', () => {this._handleCardClick({name: this._name, link: this._link})});
    }
}

export default Card;