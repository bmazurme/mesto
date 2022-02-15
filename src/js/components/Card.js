import { settings } from '../config.js';
import { Modal } from './PopupModal.js';

export class Card {
  constructor({item, cardTemplate, handleCardClick, api}) {
    this._item = item;
    this._cardTemplate = cardTemplate;
    this._cardLike = settings.cardLike;
    this._element = settings.element;
    this._elementLike = settings.elementLike;
    this._elementRemove = settings.elementRemove;
    this._elementImage = settings.elementImage;
    this._handleCardClick = handleCardClick;
    this._api = api;
  }

  _setCounter(count) {
    this._counter.textContent = count;
  }

  _likeToggle(event) {
    if (event.target.classList.contains(this._cardLike)) {
      this._api.deleteLike(this._item._id)
        .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
        .then(data => this._setCounter(data.likes.length))
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      this._api.putLike(this._item._id)
        .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
        .then(data => this._setCounter(data.likes.length))
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
    event.target.classList.toggle(this._cardLike);
  }

  _openModal(evt) {
    const deleteCard = (evn) => {
      this._api.deleteCard(this._item._id)
        .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      evt.target.closest(this._element).remove();
      this._element = null;
    };
    new Modal(deleteCard, settings.popupModal).open();
  }

  _setEventListener(cardElement, cardImage) {
    const likeButton = cardElement.querySelector(this._elementLike);
    const deleteButton = cardElement.querySelector(this._elementRemove);
    this._counter = cardElement.querySelector(settings.elementCounter);
    this._counter.textContent = 0;

    if (Array.isArray(this._item.likes)) {
      this._setCounter(this._item.likes.length)
      const even = (element) => element._id === this._item.owner._id;
      if (this._item.likes.some(even)) {
        likeButton.classList.toggle(this._cardLike);
      }
    }
    deleteButton.addEventListener("click", (evt) => this._openModal(evt));
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