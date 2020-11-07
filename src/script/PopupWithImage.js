import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhotoBig = this._element.querySelector('.popup__photo-big');
        this._popupPhotoEdit = this._element.querySelector('.popup__photo-edit');
    }


    open(name, link) {
        this._popupPhotoEdit.textContent = name;
        this._popupPhotoBig.alt = name;
        this._popupPhotoBig.src = link;
        
        super.open();
    }

}

export default PopupWithImage;