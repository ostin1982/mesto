class Card {
    constructor(item, selector) {
        this._name = item.name;
        this._link = item.link;
        this._selector = selector;
    }

    _getTemplate() {
    const htmlElement = document
        .querySelector(this._Selector)
        .content
        .querySelector('.element')
        .querySelector('.element__img')
        .querySelector('.element__name')
        .querySelector('.element__basket')
        .cloneNode(true);      
        return htmlElement;       
    }

};

export default Card;