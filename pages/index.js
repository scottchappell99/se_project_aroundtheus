import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const modalEdit = document.querySelector("#modal-edit");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const editButton = profile.querySelector(".profile__edit-button");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const editModalForm = document.forms["profile-edit"];
const editModalName = modalEdit.querySelector(".modal__name");
const editModalSubtitle = modalEdit.querySelector(".modal__subtitle");
const picturesList = document.querySelector(".pictures__list");
const modalAdd = document.querySelector("#modal-add");
const addButton = profile.querySelector(".profile__add-button");
const addModalForm = document.forms["picture-add"];
const addModalImageName = modalAdd.querySelector(".modal__place_type_name");
const addModalImageLink = modalAdd.querySelector(".modal__place_type_image");
const bigPopup = document.querySelector("#modal-picture");
const bigPopupContainer = bigPopup.querySelector(".modal__image-container");
const bigPopupImage = bigPopupContainer.querySelector(".modal__image");
const bigPopupCaption = bigPopupContainer.querySelector(".modal__text");
const closeButtons = document.querySelectorAll(".modal__close");
const formElements = [...document.querySelectorAll(".modal__form")];

//Closing a modal by clicking off
function closeModalClick(evt) {
  const openedModal = document.querySelector(".modal_opened");
  if (evt.target.contains(openedModal)) {
    closeModal(openedModal);
  }
}

//Closing a modal with escape
function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

// Opening a modal
function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", closeModalClick);
  document.addEventListener("keydown", closeModalEscape);
}

// Closing a modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", closeModalClick);
  document.removeEventListener("keydown", closeModalEscape);
}

//Disabling the submit button
function submitButtonDisable(submitButton) {
  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.disabled = true;
}

// Saving the profile's edits
function handleSaveProfile(event) {
  event.preventDefault();
  profileName.textContent = editModalName.value;
  profileSubtitle.textContent = editModalSubtitle.value;
  closeModal(modalEdit);
  event.target.reset();
  submitButtonDisable(event.target.querySelector(config.submitButtonSelector));
}

// Rendering cards
function renderCard(data, list, where) {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  if (where === "before") {
    list.prepend(cardElement);
  } else if (where === "after") {
    list.append(cardElement);
  }
}

// Saving the added images
function handleSaveImage(event) {
  event.preventDefault();
  const addImage = {
    name: addModalImageName.value,
    link: addModalImageLink.value,
  };
  closeModal(modalAdd);
  event.target.reset();
  renderCard(addImage, picturesList, "before");
  submitButtonDisable(event.target.querySelector(config.submitButtonSelector));
}

// Opening the big popup
function handleImageClick(cardClass) {
  bigPopupImage.src = cardClass.cardImage.src;
  bigPopupImage.alt = cardClass.cardImage.alt;
  bigPopupCaption.textContent = cardClass.cardCaption.textContent;
  openModal(bigPopup);
}

// Listen for Events
editButton.addEventListener("click", () => {
  openModal(modalEdit);
  editModalName.value = profileName.textContent;
  editModalSubtitle.value = profileSubtitle.textContent;
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

editModalForm.addEventListener("submit", handleSaveProfile);
addButton.addEventListener("click", () => openModal(modalAdd));
addModalForm.addEventListener("submit", handleSaveImage);

// Initial rendering of cards
initialCards.forEach((data) => renderCard(data, picturesList, "after"));

// Adding validators to all forms
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
});
