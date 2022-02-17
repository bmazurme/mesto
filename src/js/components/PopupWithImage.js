import { Popup } from './Popup.js';
import { settings } from '../config.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(settings.slideImage);
    this._imageCaption = this._popup.querySelector(settings.slideName);
  }

  open({name, link}) {
    super.open();
    this._imageCaption.textContent = name;
    this._image.src = link;
    this._image.alt = name;
  }
}