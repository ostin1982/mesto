import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhotoBig = this._element.querySelector('.popup__photo-big');
        this._popupPhotoEdit = this._element.querySelector('.popup__photo-edit');
    }


    open(name, link) {
        this._popupPhotoBig.src = link;
        this._popupPhotoBig.alt = name;
        this._popupPhotoEdit.textContent = name;  
        
        
        super.open();
    }

}

export default PopupWithImage;
