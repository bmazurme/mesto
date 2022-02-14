import { Popup } from './Popup.js';
import { settings } from '../config.js';

export class PopupWithImage extends Popup {
  constructor (card, popupSelector) {
    super(popupSelector);
    this._card = card;
    this._popup = document.querySelector(popupSelector);
    this._slideImage = settings.slideImage;
    this._slideName = settings.slideName;
  }

  open() {
    super.open();
    this._image = this._popup.querySelector(this._slideImage);
    this._popup.querySelector(this._slideName).textContent = this._card.name;
    this._image.src = this._card.link;
    this._image.alt = this._card.name;
  }
}