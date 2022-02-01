import { Popup } from './Popup.js'; 

export class PopupWithImage extends Popup {
  constructor (card, popupSelector) {
    super(popupSelector);
    this._card = card;
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    super.open();
    this._image = this._popup.querySelector('.slide__image');
    this._popup.querySelector('.slide__name').textContent = this._card.name;
    this._image.src = this._card.link;
    this._image.alt = this._card.name;
  }
}