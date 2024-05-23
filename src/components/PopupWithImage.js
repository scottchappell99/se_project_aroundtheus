import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._popupCaption = this._popupElement.querySelector(".modal__text");
  }

  open(cardLink, cardCaption) {
    this._popupImage.src = cardLink;
    this._popupImage.alt = cardCaption;
    this._popupCaption.textContent = cardCaption;
    super.open();
  }
}
