import { settings } from '../config.js';

export class Card {
  constructor({item, cardTemplate, handleCardClick}) {
    this._item = item;
    this._cardTemplate = cardTemplate;
    this._cardLike = settings.cardLike;
    this._element = settings.element;
    this._elementLike = settings.elementLike;
    this._elementRemove = settings.elementRemove;
    this._elementImage = settings.elementImage;
    this._handleCardClick = handleCardClick;
  }

  _likeToggle(event) {
    event.target.classList.toggle(this._cardLike);
  }

  _deleteCard(evn) {
    evn.target.closest(this._element).remove();
    this._element = null;
  }

  _setEventListener(cardElement, cardImage) {
    const deleteButton = cardElement.querySelector(this._elementRemove);
    const likeButton = cardElement.querySelector(this._elementLike);
    deleteButton.addEventListener("click", (evt) => this._deleteCard(evt));
    likeButton.addEventListener("click", (evt) => this._likeToggle( evt));
    cardImage.addEventListener("click", () => this._handleCardClick(this._item));
  }

  _getTemplateCard() {
    return document.querySelector(this._cardTemplate)
      .content.querySelector(settings.element).cloneNode(true);
  }

  createCard() {
    const cardElement = this._getTemplateCard();
    cardElement.querySelector(settings.cardName).textContent = this._item.name;
    const cardImage = cardElement.querySelector(this._elementImage);
    cardImage.src = this._item.link;
    cardImage.alt = this._item.name;
    this._setEventListener(cardElement, cardImage);
    return cardElement;
  }
}