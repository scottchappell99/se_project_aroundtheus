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

const modalEdit = document.querySelector("#modal-edit");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const editButton = profile.querySelector(".profile__edit-button");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const editModalClose = modalEdit.querySelector(".modal__close");
const editModalForm = document.forms["profile-edit"];
const editModalName = modalEdit.querySelector(".modal__name");
const editModalSubtitle = modalEdit.querySelector(".modal__subtitle");
const picturesList = document.querySelector(".pictures__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const modalAdd = document.querySelector("#modal-add");
const addButton = profile.querySelector(".profile__add-button");
const addModalClose = modalAdd.querySelector(".modal__close");
const addModalForm = document.forms["picture-add"];
const addModalImageName = modalAdd.querySelector(".modal__place_type_name");
const addModalImageLink = modalAdd.querySelector(".modal__place_type_image");
const bigPopup = document.querySelector("#modal-picture");
const bigPopupContainer = bigPopup.querySelector(".modal__image-container");
const bigPopupClose = bigPopupContainer.querySelector(".modal__close");
const bigPopupImage = bigPopupContainer.querySelector(".modal__image");
const bigPopupCaption = bigPopupContainer.querySelector(".modal__text");
const closeButtons = document.querySelectorAll(".modal__close");

// Opening a modal
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// Closing a modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Saving the profile's edits
function handleSaveProfile(event) {
  event.preventDefault();
  profileName.textContent = editModalName.value;
  profileSubtitle.textContent = editModalSubtitle.value;
  closeModal(modalEdit);
  event.target.reset();
}

// Rendering cards
function renderCard(data, list, where) {
  const cardElement = getCardElement(data);
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
}

// Creating a card
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardCaption = cardElement.querySelector(".card__caption");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardCaption.textContent = data.name;

  // Adding a like button listener to the card
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__liked_active");
  });

  // Adding a delete button listener to the card

  deleteButton.addEventListener("click", (event) => {
    const cardToDelete = event.target.closest(".card");
    cardToDelete.remove();
  });

  // Adding a big popup listener to the card

  cardImage.addEventListener("click", () => {
    bigPopupImage.src = cardImage.src;
    bigPopupImage.alt = cardImage.alt;
    bigPopupCaption.textContent = cardCaption.textContent;
    openModal(bigPopup);
  });

  return cardElement;
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
