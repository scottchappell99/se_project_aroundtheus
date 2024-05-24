export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close = () => {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClickClose = (evt) => {
    if (evt.target === this._popupElement) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close);
    this._popupElement.addEventListener("click", (evt) =>
      this._handleClickClose(evt)
    );
  }
}
