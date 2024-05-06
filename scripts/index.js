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
const modalClose = modalEdit.querySelector(".modal__close");
const modalName = modalEdit.querySelector(".modal__name");
const modalSubtitle = modalEdit.querySelector(".modal__subtitle");
const modalForm = modalEdit.querySelector(".modal__form");
const picturesList = document.querySelector(".pictures__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Opening the modal and pulling the name and job from the page
function handleOpenModal() {
  modalName.value = profileName.textContent;
  modalSubtitle.value = profileSubtitle.textContent;
  modalEdit.classList.add("modal_opened");
}

// Closing the modal
function handleCloseModal() {
  modalEdit.classList.remove("modal_opened");
}

// Saving the profile's edits
function handleSaveProfile(event) {
  event.preventDefault();
  profileName.textContent = modalName.value;
  profileSubtitle.textContent = modalSubtitle.value;
  handleCloseModal();
}

//Creating a card
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardCaption = cardElement.querySelector(".card__caption");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardCaption.textContent = data.name;

  return cardElement;
}

//Listen for Events
editButton.addEventListener("click", handleOpenModal);
modalClose.addEventListener("click", handleCloseModal);
modalForm.addEventListener("submit", handleSaveProfile);

//Rendering cards
initialCards.forEach((data) => {
  picturesList.append(getCardElement(data));
});
