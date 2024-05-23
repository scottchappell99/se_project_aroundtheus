import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackFunction) {
    super(popupSelector);
    this._callbackFunction = callbackFunction;
    this._getInputValues = this._getInputValues.bind(this);
  }

  _getInputValues(evt) {
    evt.preventDefault;
    this._popupElement.removeEventListener("submit", this._getInputValues);
    this._callbackFunction();
    this.close();
    evt.target.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._getInputValues);
  }
}
