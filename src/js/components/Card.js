import { settings } from '../config.js';
import { Modal } from './PopupModal.js';

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

  _openModal(evt) {
    const deleteCard = (evn) => {
      this._handleCardDelete(this._item._id);
      evt.target.closest(this._element).remove();
      this._element = null;
    };
    new Modal(deleteCard, settings.popupModal).open();
  }

  _setCounter() {
    if (Array.isArray(this._item.likes)) {
      this._counter.textContent = this._item.likes.length;
      const even = (element) => element._id === this._item.owner._id;
      if (this._item.likes.some(even)) {
        this._likeButton.classList.toggle(this._cardLike);
      }
    }
  }

  _setEventListener(cardElement, cardImage) {
    this._likeButton = cardElement.querySelector(this._elementLike);
    this._deleteButton = cardElement.querySelector(this._elementRemove);
    this._counter = cardElement.querySelector(settings.elementCounter);
    this._counter.textContent = 0;
    this._setCounter();
    this._deleteButton.addEventListener("click", (evt) => this._openModal(evt));
    this._likeButton.addEventListener("click", (evt) => this._handleLikeToggle(evt, this._cardLike, this._item._id, this._counter ));
    cardImage.addEventListener("click", () => this._handleCardClick(this._item));
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
    const cardElement = this._getTemplateCard();
    cardElement.querySelector(settings.cardName).textContent = this._item.name;
    const cardImage = cardElement.querySelector(this._elementImage);
    cardImage.src = this._item.link;
    cardImage.alt = this._item.name;
    this._setEventListener(cardElement, cardImage);
    return cardElement;
  }
}