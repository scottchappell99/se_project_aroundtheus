let initialCards = [
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
let profileName = profile.querySelector(".profile__name");
const editButton = profile.querySelector(".profile__edit-button");
let profileSubtitle = profile.querySelector(".profile__subtitle");
const modalClose = modal.querySelector(".modal__close");
let modalName = modal.querySelector(".modal__name");
let modalSubtitle = modal.querySelector(".modal__subtitle");
const modalSave = modal.querySelector(".modal__button");

//Saving the profile's edits
function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = modalName.value;
  profileSubtitle.textContent = modalSubtitle.value;
  modal.classList.remove("modal_opened");
}

editButton.addEventListener("click", function (openModal) {
  modalName.value = profileName.textContent;
  modalSubtitle.value = profileSubtitle.textContent;
  modal.classList.add("modal_opened");
});

modalClose.addEventListener("click", function (closeModal) {
  modal.classList.remove("modal_opened");
});

modalSave.addEventListener("click", saveProfile);
