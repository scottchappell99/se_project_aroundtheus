import "./index.css";

import {
  initialCards,
  config,
  addPictureForm,
  editProfileForm,
  addButton,
  editButton,
  profileInfo,
  profileFormInfo,
} from "../utils/constants.js";

// Import classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo(profileInfo);
const addFormPopup = new PopupWithForm("#modal-add", handleAddImage);
const editFormPopup = new PopupWithForm("#modal-edit", handleEditProfile);
const imagePopup = new PopupWithImage("#modal-picture");
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement, "append");
    },
  },
  ".pictures__list"
);
const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

cardSection.renderItems();

function handleAddClick() {
  addFormPopup.open();
}

function handleEditClick() {
  const presentUserInfo = userInfo.getUserInfo();
  profileFormInfo.name.value = presentUserInfo.name;
  profileFormInfo.subtitle.value = presentUserInfo.subtitle;
  formValidators["edit"].resetValidation();
  editFormPopup.open();
}

function handleImageClick(cardLink, cardCaption) {
  imagePopup.open(cardLink, cardCaption);
}

function createCard(imageInfo) {
  const newCard = new Card(imageInfo, "#card-template", handleImageClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

function handleAddImage(imageInfo) {
  const addedCardElement = createCard(imageInfo);
  cardSection.addItem(addedCardElement, "prepend");
  addFormPopup.close();
  formValidators["add"].resetValidation();
}

function handleEditProfile(newProfileInfo) {
  userInfo.setUserInfo(newProfileInfo);
  editFormPopup.close();
}

addButton.addEventListener("click", handleAddClick);
editButton.addEventListener("click", handleEditClick);
addFormPopup.setEventListeners();
editFormPopup.setEventListeners();
imagePopup.setEventListeners();
