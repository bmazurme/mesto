import { Popup } from './Popup.js'; 

import { settings } from '../config.js';
export class PopupWithForm extends Popup {
  constructor({submit, popupSelector}) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._submit = (evt, val) => { submit(evt, this._getInputValues())};
    this._form = this._popup.querySelector(settings.form);
  }

  renderLoading(isLoading, buttonText='Сохранить') {
    this._button = this._form.querySelector(settings.buttonSave);
    isLoading ? this._button.textContent ='Сохранение...' : this._button.textContent = buttonText;
  }

  close() {
    super.close();
    this._form .reset();
    this._popup.removeEventListener('submit', this._submit);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  } 

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submit);
  }
}