import Popup from "./Popup.js";

export default class PopupForDelete extends Popup {
  constructor(popupSelector, callbackFunction) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._callbackFunction = callbackFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      this._callbackFunction();
    });
  }
}
