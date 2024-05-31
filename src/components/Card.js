export default class Card {
  constructor(
    data,
    cardSelector,
    clickFunction,
    deleteFunction,
    removeLikeFromServer,
    likeToServer
  ) {
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._clickFunction = clickFunction;
    this._deleteFunction = deleteFunction;
    this._removeLikeFromServer = removeLikeFromServer;
    this._likeToServer = likeToServer;
    this._cardTemplate = document.querySelector(
      this._cardSelector
    ).content.firstElementChild;
  }

  _handleLikeClick() {
    if (this.cardElement.querySelector(".card__liked_active")) {
      this._removeLikeFromServer(this.id, this._likeButton);
    } else {
      this._likeToServer(this.id, this._likeButton);
    }
  }

  _handleDeleteClick(evt) {
    this._deleteFunction(this.id, evt);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick());
    this._deleteButton.addEventListener("click", (evt) =>
      this._handleDeleteClick(evt)
    );
    this.cardImage.addEventListener("click", () =>
      this._clickFunction(this._link, this._name)
    );
  }

  generateCard() {
    this.cardElement = this._cardTemplate.cloneNode(true);
    this.cardCaption = this.cardElement.querySelector(".card__caption");
    this.cardImage = this.cardElement.querySelector(".card__image");
    this._likeButton = this.cardElement.querySelector(".card__like");
    this._deleteButton = this.cardElement.querySelector(".card__delete-button");

    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    this.cardImage.id = this.id;
    this.cardCaption.textContent = this._name;
    if (this._isLiked) {
      this._likeButton.classList.add("card__liked_active");
    }

    this._setEventListeners();

    return this.cardElement;
  }
}
