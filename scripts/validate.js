const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(formElement, inputElement, config) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );

  inputElement.classList.add(config.inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );

  inputElement.classList.remove(config.inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(config.errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

const checkFormValidity = (inputElements) =>
  inputElements.every((inputElement) => inputElement.validity.valid);

function toggleButtonState(inputElements, submitButton, config) {
  const isFormValid = checkFormValidity(inputElements);

  if (!isFormValid) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputElements = [...formElement.querySelectorAll(config.inputSelector)];
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputElements, submitButton, config);
    });
  });
}

function enableValidation(config) {
  const formElements = [...document.querySelectorAll(config.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
}

enableValidation(config);
