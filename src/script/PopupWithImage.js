import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhotoBig = this._popupSelector.querySelector('.popup__photo-big');
        this._popupPhotoEdit = this._popupSelector.querySelector('.popup__photo-edit');
    }

    open(data) {
        this._popupPhotoBig.src = data.link;
        this._popupPhotoBig.alt = data.item;
        this._popupPhotoEdit.innerText = data.item;
        
        super.open();
    }
}

export default PopupWithImage;