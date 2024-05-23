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
const addFormValidator = new FormValidator(config, addPictureForm);
const editFormValidator = new FormValidator(config, editProfileForm);
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement, "append");
    },
  },
  ".pictures__list"
);

cardSection.renderItems();
addFormValidator.enableValidation();
editFormValidator.enableValidation();

function handleAddClick() {
  const addFormPopup = new PopupWithForm("#modal-add", handleAddImage);
  addFormPopup.open();
}

function handleEditClick() {
  const editFormPopup = new PopupWithForm("#modal-edit", handleEditProfile);
  const presentUserInfo = userInfo.getUserInfo();
  profileFormInfo.name.value = presentUserInfo.name;
  profileFormInfo.occupation.value = presentUserInfo.occupation;
  editFormPopup.open();
}

function handleImageClick(cardLink, cardCaption) {
  const imagePopup = new PopupWithImage("#modal-picture");
  imagePopup.open(cardLink, cardCaption);
}

function handleAddImage() {
  const imageInfo = {
    name: document.querySelector(".modal__place_type_name").value,
    link: document.querySelector(".modal__place_type_image").value,
  };
  const newCard = new Card(imageInfo, "#card-template", handleImageClick);
  const addedCardElement = newCard.generateCard();
  cardSection.addItem(addedCardElement, "prepend");
  addFormValidator.resetValidation();
}

function handleEditProfile() {
  const newProfileInfo = {
    name: profileFormInfo.name.value,
    occupation: profileFormInfo.occupation.value,
  };
  userInfo.setUserInfo(newProfileInfo);
}

addButton.addEventListener("click", handleAddClick);
editButton.addEventListener("click", handleEditClick);
