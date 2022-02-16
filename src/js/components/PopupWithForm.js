import { Popup } from './Popup.js'; 

import { settings } from '../config.js';
export class PopupWithForm extends Popup {
  constructor({submit, popupSelector}) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._submit = (evt, val) => { submit(evt, this._getInputValues()); this.close() };
    this._popup = document.querySelector(this._popupSelector);
    this._form = this._popup.querySelector(settings.form);
  }

  close() {
    super.close();
    this._form .reset();
    this._popup.removeEventListener('submit', this._submit);
  }

  _getInputValues() {
    const { elements } = {elements: this._form .elements};
    return elements;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submit);
  }
}