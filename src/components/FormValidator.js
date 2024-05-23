export default class FormValidator {
  constructor(config, formToValidate) {
    this._config = config;
    this._formElement = formToValidate;
  }

  _showInputError(inputElement) {
    this._errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._config.inputErrorClass);
    this._errorMessageElement.textContent = inputElement.validationMessage;
    this._errorMessageElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    this._errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorMessageElement.textContent = "";
    this._errorMessageElement.classList.remove(this._config.errorClass);
  }

  resetValidation() {
    this._inputElements.forEach((inputElement) =>
      this._hideInputError(inputElement)
    );
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _checkFormValidity = () =>
    this._inputElements.every((inputElement) => inputElement.validity.valid);

  disableSubmitButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableSubmitButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    this._isFormValid = this._checkFormValidity(this._inputElements);

    if (!this._isFormValid) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  _setEventListeners() {
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._config.inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
