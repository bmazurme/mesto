import { settings } from '../config.js';

export class Card {
  constructor({item, cardTemplate, handleCardClick, handleLikeToggle, handleCardDelete, userId}) {
    this._item = item;
    this._cardTemplate = cardTemplate;
    this._cardLike = settings.cardLike;
    this._element = settings.element;
    this._elementLike = settings.elementLike;
    this._elementRemove = settings.elementRemove;
    this._elementImage = settings.elementImage;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeToggle = handleLikeToggle;
    this._handleCardDelete = handleCardDelete;
  }

  _openPopupWithConfirm(evt) {
    this._handleCardDelete.setCurrentCard(this, evt.target.closest(this._element));
    this._handleCardDelete.open();
  }

  _setCounter() {
    if (Array.isArray(this._item.likes)) {
      this._counter.textContent = this._item.likes.length;
      const even = (element) => element._id === this._userId;
      if (this._item.likes.some(even)) {
        this._likeButton.classList.toggle(this._cardLike);
      }
    }
  }

  _setEventListener() {
    this._likeButton = this._cardElement.querySelector(this._elementLike);
    this._deleteButton = this._cardElement.querySelector(this._elementRemove);
    this._counter = this._cardElement.querySelector(settings.elementCounter);
    this._counter.textContent = 0;
    this._setCounter();
    this._deleteButton.addEventListener("click", (evt) => this._openPopupWithConfirm(evt));
    this._likeButton.addEventListener("click", (evt) => this._handleLikeToggle(evt, this));
    this._cardImage.addEventListener("click", () => this._handleCardClick(this._item));
    this._deleteNotOwner()
  }

  _deleteNotOwner() {
    if (this._userId !== this._item.owner._id) {this._deleteButton.remove();}
  }

  _getTemplateCard() {
    return document.querySelector(this._cardTemplate)
      .content.querySelector(settings.element).cloneNode(true);
  }

  createCard() {
    this._cardElement = this._getTemplateCard();
    this._cardElement.querySelector(settings.cardName).textContent = this._item.name;
    this._cardImage = this._cardElement.querySelector(this._elementImage);
    this._cardImage.src = this._item.link;
    this._cardImage.alt = this._item.name;
    this._setEventListener();
    return this._cardElement;
  }
}