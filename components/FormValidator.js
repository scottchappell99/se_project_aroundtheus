export default class FormValidator {
  constructor(config, formToValidate) {
    this._config = config;
    this._formElement = formToValidate;
  }

  _showInputError(formElement, inputElement, config) {
    this._errorMessageElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(config.inputErrorClass);
    this._errorMessageElement.textContent = inputElement.validationMessage;
    this._errorMessageElement.classList.add(config.errorClass);
  }

  _hideInputError(formElement, inputElement, config) {
    this._errorMessageElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(config.inputErrorClass);
    this._errorMessageElement.textContent = "";
    this._errorMessageElement.classList.remove(config.errorClass);
  }

  _checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, config);
    } else {
      this._hideInputError(formElement, inputElement, config);
    }
  }

  _checkFormValidity = (inputElements) =>
    inputElements.every((inputElement) => inputElement.validity.valid);

  submitButtonDisable(submitButton, config) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  }

  submitButtonEnable(submitButton, config) {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }

  _toggleButtonState(inputElements, submitButton, config) {
    this._isFormValid = this._checkFormValidity(inputElements);

    if (!this._isFormValid) {
      this.submitButtonDisable(submitButton, config);
    } else {
      this.submitButtonEnable(submitButton, config);
    }
  }

  _setEventListeners(formElement, config) {
    this._inputElements = [
      ...formElement.querySelectorAll(config.inputSelector),
    ];
    this._submitButton = formElement.querySelector(config.submitButtonSelector);

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement, config);
        this._toggleButtonState(
          this._inputElements,
          this._submitButton,
          config
        );
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.submitButtonDisable(this._submitButton, this._config);
    });

    this._setEventListeners(this._formElement, this._config);
  }
}
