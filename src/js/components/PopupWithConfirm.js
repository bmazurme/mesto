import { Popup } from './Popup.js';
import { settings } from '../config.js';

export class PopupWithConfirm extends Popup {
  constructor({submit, popupSelector}) {
    super(popupSelector);
    this._submit = (evt) => {submit(evt, this._element, this._card)};
    this._form = this._popup.querySelector(settings.form);
  }

  renderLoading(isLoading, buttonText='Да') {
    this._button = this._form.querySelector(settings.buttonSave);
    isLoading ? this._button.textContent ='Удаление...' : this._button.textContent = buttonText;
  }

  setCurrentCard(card, element) {
    this._card = card;
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submit);
  }
  close() {
    super.close();
    this._popup.removeEventListener('submit', this._submit);
  }
}