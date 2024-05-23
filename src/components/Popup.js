export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close = () => {
    this._popupElement.classList.remove("modal_opened");
    this._closeButton.removeEventListener("click", this.close);
    this._popupElement.removeEventListener("click", (evt) =>
      this._handleClickClose(evt)
    );
    document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClickClose = (evt) => {
    this._openedModal = document.querySelector(".modal_opened");
    if (evt.target.contains(this._openedModal)) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close);
    this._popupElement.addEventListener("click", (evt) =>
      this._handleClickClose(evt)
    );
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
  }
}
