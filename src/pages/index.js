import "./index.css";

import {
  config,
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
import PopupForDelete from "../components/PopupForDelete.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2a802ea2-27ed-4bda-9f25-4922d40c7a86",
    "Content-Type": "application/json",
  },
});
let userInfo;
api.getInfoFirst();

api
  .getUserInfo()
  .then((res) => {
    userInfo = new UserInfo(res);
    userInfo.setUserInfo(profileInfo);
  })
  .catch((err) => console.error(err));

let cardSection;

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardSection.addItem(cardElement, "append");
        },
      },
      ".pictures__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

const addFormPopup = new PopupWithForm("#modal-add", handleAddImage);
const editFormPopup = new PopupWithForm("#modal-edit", handleEditProfile);
const deleteVerifyPopup = new PopupForDelete(
  "#modal-delete",
  handleDeleteVerify
);
const imagePopup = new PopupWithImage("#modal-picture");
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
let cardIdForDeletion;
let cardToDelete;

enableValidation(config);

function handleAddClick() {
  addFormPopup.open();
}

function handleEditClick() {
  const presentUserInfo = userInfo.getUserInfo();
  profileFormInfo.name.value = presentUserInfo.name;
  profileFormInfo.about.value = presentUserInfo.about;
  formValidators["edit"].resetValidation();
  editFormPopup.open();
}

function handleImageClick(cardLink, cardCaption) {
  imagePopup.open(cardLink, cardCaption);
}

function handleDeletePopup(cardId, evt) {
  deleteVerifyPopup.open();
  cardIdForDeletion = cardId;
  cardToDelete = evt.target.closest(".card");
}

function likeToServer(cardId, cardElement) {
  if (!cardElement.querySelector(".card__liked_active")) {
    api.removeLikeFromCard(cardId).catch((err) => console.error(err));
  } else {
    api.addLikeToCard(cardId).catch((err) => console.error(err));
  }
}

function createCard(imageInfo) {
  const newCard = new Card(
    imageInfo,
    "#card-template",
    handleImageClick,
    handleDeletePopup,
    likeToServer
  );
  const cardElement = newCard.generateCard();
  return cardElement;
}

function handleAddImage(imageInfo) {
  api
    .addCard(imageInfo)
    .then((res) => {
      let addedCardElement = createCard(res);
      cardSection.addItem(addedCardElement, "prepend");
      addFormPopup.close();
      addFormPopup.clearForm();
      formValidators["add"].disableSubmitButton();
    })
    .catch((err) => console.error(err));
}

function handleEditProfile(newProfileInfo) {
  userInfo.changeUserInfo(newProfileInfo);
  api.editUserInfo(newProfileInfo).catch((err) => console.error(err));
  userInfo.setUserInfo(profileInfo);
  editFormPopup.close();
}

function handleDeleteVerify() {
  api.deleteCard(cardIdForDeletion).catch((err) => console.error(err));
  cardToDelete.remove();
  deleteVerifyPopup.close();
}

addButton.addEventListener("click", handleAddClick);
editButton.addEventListener("click", handleEditClick);
addFormPopup.setEventListeners();
editFormPopup.setEventListeners();
deleteVerifyPopup.setEventListeners();
imagePopup.setEventListeners();
