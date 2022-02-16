import { Popup } from './Popup.js';
import { settings } from '../config.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(settings.slideImage);
  }

  open({name, link}) {
    super.open();
    this._popup.querySelector(settings.slideName).textContent = name;
    this._image.src = link;
    this._image.alt = name;
  }
}