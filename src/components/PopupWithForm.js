import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackFunction) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._callbackFunction = callbackFunction;
  }

  _getInputValues() {
    this._inputValues = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    this._data = {};
    this._inputValues.forEach((data) => {
      this._data[data.name] = data.value;
    });
    return this._data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", () =>
      this._callbackFunction(this._getInputValues())
    );
  }
}
