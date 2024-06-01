import "./index.css";

import {
  config,
  addButton,
  editButton,
  profileInfo,
  profileFormInfo,
  editAvatarButton,
  addPopup,
  editPopup,
  avatarPopup,
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
let cardSection;
let cardIdForDeletion;
let cardToDelete;
let buttonText;

api
  .getUserInfo()
  .then((res) => {
    userInfo = new UserInfo(res);
    userInfo.setUserInfo(profileInfo);
  })
  .catch((err) => console.error(err));

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
const editAvatarPopup = new PopupWithForm("#modal-avatar", handleChangeAvatar);
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

function handleAvatarClick() {
  editAvatarPopup.open();
}

function handleDeletePopup(cardId, evt) {
  deleteVerifyPopup.open();
  cardIdForDeletion = cardId;
  cardToDelete = evt.target.closest(".card");
}

function removeLikeFromServer(cardId, likeButton) {
  api
    .removeLikeFromCard(cardId)
    .then(likeButton.classList.remove("card__liked_active"))
    .catch((err) => console.error(err));
}

function likeToServer(cardId, likeButton) {
  api
    .addLikeToCard(cardId)
    .then(likeButton.classList.add("card__liked_active"))
    .catch((err) => console.error(err));
}

function createCard(imageInfo) {
  const newCard = new Card(
    imageInfo,
    "#card-template",
    handleImageClick,
    handleDeletePopup,
    removeLikeFromServer,
    likeToServer
  );
  const cardElement = newCard.generateCard();
  return cardElement;
}

function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function handleAddImage(imageInfo) {
  function makeRequest() {
    return api.addCard(imageInfo).then((res) => {
      const addedCardElement = createCard(res);
      cardSection.addItem(addedCardElement, "prepend");
    });
  }
  handleSubmit(makeRequest, addFormPopup);
  addFormPopup.clearForm();
  formValidators["add"].disableSubmitButton();
}

function handleEditProfile(newProfileInfo) {
  function makeRequest() {
    return api
      .editUserInfo(newProfileInfo)
      .then(userInfo.changeUserInfo(newProfileInfo))
      .then(userInfo.setUserInfo(profileInfo));
  }
  handleSubmit(makeRequest, editFormPopup);
}

function handleChangeAvatar(newAvatarImage) {
  function makeRequest() {
    return api
      .changeProfilePicture(newAvatarImage)
      .then(userInfo.changeAvatar(newAvatarImage.avatar))
      .then(userInfo.setUserInfo(profileInfo));
  }
  handleSubmit(makeRequest, editAvatarPopup);
  editAvatarPopup.clearForm();
  formValidators["avatar"].disableSubmitButton();
}

function handleDeleteVerify() {
  api
    .deleteCard(cardIdForDeletion)
    .then(cardToDelete.remove())
    .catch((err) => console.error(err))
    .finally(deleteVerifyPopup.close());
}

addButton.addEventListener("click", handleAddClick);
editButton.addEventListener("click", handleEditClick);
editAvatarButton.addEventListener("click", handleAvatarClick);
addFormPopup.setEventListeners();
editFormPopup.setEventListeners();
editAvatarPopup.setEventListeners();
deleteVerifyPopup.setEventListeners();
imagePopup.setEventListeners();
