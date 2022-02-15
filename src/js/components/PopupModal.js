import { Popup } from './Popup.js';
import { settings } from '../config.js';

export class Modal extends Popup {
  constructor(deleteCard, popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._yes = this._popup.querySelector(settings.formDelete);
    this._deleteCard = (evt) => {evt.preventDefault(); deleteCard(); this.close()};
  }

  close() {
    super.close();
    this._yes.removeEventListener('click', this._deleteCard);
  }

  setEventListeners() {
    super.setEventListeners();
    this._yes.addEventListener('click', this._deleteCard);
  }
}