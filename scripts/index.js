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

const modal = document.querySelector(".modal");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const editButton = profile.querySelector(".profile__edit-button");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const modalClose = modal.querySelector(".modal__close");
const modalName = modal.querySelector(".modal__name");
const modalSubtitle = modal.querySelector(".modal__subtitle");
const modalSave = modal.querySelector(".modal__button");
const picturesList = document.querySelector(".pictures__list");
const cardTemplate = document.querySelector("#card-template").content;

// Opening the modal and pulling the name and job from the page
function openModal() {
  modalName.value = profileName.textContent;
  modalSubtitle.value = profileSubtitle.textContent;
  modal.classList.add("modal_opened");
}

// Closing the modal
function closeModal() {
  modal.classList.remove("modal_opened");
}

// Saving the profile's edits
function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = modalName.value;
  profileSubtitle.textContent = modalSubtitle.value;
  closeModal();
}

//Creating a card
function createCard(cardNumber) {
  cardContent = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardContent.querySelector(".card__image");
  const cardCaption = cardContent.querySelector(".card__caption");
  cardImage.src = cardNumber.link;
  cardImage.alt = cardNumber.name;
  cardCaption.textContent = cardNumber.name;
  picturesList.append(cardContent);
}

editButton.addEventListener("click", openModal);

modalClose.addEventListener("click", closeModal);

modalSave.addEventListener("submit", saveProfile);

for (let i = 0; i < initialCards.length; i++) {
  const cardContent = createCard(initialCards[i]);
}
