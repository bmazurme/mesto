import { settings } from './config.js';
import { PopupWithImage } from './components/PopupWithImage.js';

export class Card {
  constructor(item, cardTemplate) {
    this._item = item;
    this._cardTemplate = cardTemplate;
    this._cardLike = settings.cardLike;
    this._element = settings.element;
    this._elementLike = settings.elementLike;
    this._elementRemove = settings.elementRemove;
    this._elementImage = settings.elementImage;
    this.handleCardClick = () => {
      new PopupWithImage(this._item, '.popup_type_slide').open()
    }
  }

  _likeToggle(event) {
    event.target.classList.toggle(this._cardLike);
  }

  _deleteCard(evn) {
    evn.target.closest(this._element).remove();
  }

  createCard() {
    const cardElement = document.querySelector(this._cardTemplate)
      .content.querySelector(settings.element).cloneNode(true);
    const cardImage = cardElement.querySelector(this._elementImage);
    const deleteButton = cardElement.querySelector(this._elementRemove);
    const likeButton = cardElement.querySelector(this._elementLike);
    cardElement.querySelector(settings.cardName).textContent = this._item.name;
    cardImage.src = this._item.link;
    cardImage.alt = this._item.name;
    cardImage.addEventListener("click", this.handleCardClick);
    deleteButton.addEventListener("click", (evt) => this._deleteCard(evt));
    likeButton.addEventListener("click", (evt) => this._likeToggle( evt));
    return cardElement;
  }
}