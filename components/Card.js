export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardTemplate = document.querySelector(
      this._cardSelector
    ).content.firstElementChild;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("card__liked_active");
  }

  _handleDeleteClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick()
    );
    this.cardImage.addEventListener("click", () =>
      this._handleImageClick(this)
    );
  }

  generateCard() {
    this._cardElement = this._cardTemplate.cloneNode(true);
    this.cardCaption = this._cardElement.querySelector(".card__caption");
    this.cardImage = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    this.cardCaption.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
