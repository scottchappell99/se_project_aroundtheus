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

const modalEdit = document.querySelector(".modal__edit");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const editButton = profile.querySelector(".profile__edit-button");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const editModalClose = modalEdit.querySelector(".modal__close");
const editModalForm = modalEdit.querySelector(".modal__form");
const editModalName = modalEdit.querySelector(".modal__name");
const editModalSubtitle = modalEdit.querySelector(".modal__subtitle");
const picturesList = document.querySelector(".pictures__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const modalAdd = document.querySelector(".modal__add");
const addButton = profile.querySelector(".profile__add-button");
const addModalClose = modalAdd.querySelector(".modal__close");
const addModalForm = modalAdd.querySelector(".modal__form");
const addModalImageName = modalAdd.querySelector(".modal__place_type_name");
const addModalImageLink = modalAdd.querySelector(".modal__place_type_image");

// Opening the modal
function handleOpenModal(modal) {
  editModalName.value = profileName.textContent;
  editModalSubtitle.value = profileSubtitle.textContent;
  modal.classList.add("modal_opened");
}

// Closing the modal
function handleCloseModal(modal) {
  modal.classList.remove("modal_opened");
  addModalImageName.value = "";
  addModalImageLink.value = "";
}

// Saving the profile's edits
function handleSaveProfile(event) {
  event.preventDefault();
  profileName.textContent = editModalName.value;
  profileSubtitle.textContent = editModalSubtitle.value;
  handleCloseModal(modalEdit);
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
  if (addModalImageName.value !== "" || addModalImageLink.value !== "") {
    const addImage = {
      name: addModalImageName.value,
      link: addModalImageLink.value,
    };
    handleCloseModal(modalAdd);
    renderCard(addImage, picturesList, "before");
  } else {
    handleCloseModal(modalAdd);
  }
}

//Creating a card
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardCaption = cardElement.querySelector(".card__caption");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButtons = cardElement.querySelectorAll(".card__like");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardCaption.textContent = data.name;

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__liked_active");
    });
  });

  return cardElement;
}

//Listen for Events
editButton.addEventListener("click", () => handleOpenModal(modalEdit));
editModalClose.addEventListener("click", () => handleCloseModal(modalEdit));
editModalForm.addEventListener("submit", handleSaveProfile);
addButton.addEventListener("click", () => handleOpenModal(modalAdd));
addModalClose.addEventListener("click", () => handleCloseModal(modalAdd));
addModalForm.addEventListener("submit", handleSaveImage);

//Rendering cards
initialCards.forEach((data) => renderCard(data, picturesList, "after"));
