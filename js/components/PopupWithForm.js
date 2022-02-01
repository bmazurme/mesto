import { Popup } from './Popup.js'; 

export class PopupWithForm extends Popup {
  constructor(submit, popupSelector) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._submit = (evt, val) => submit(evt, this._getInputValues());
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
    this._closer = (evt) => {
      if (evt.target.classList.contains('popup_active')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    }

    this.close =() => {
      this._popup.querySelector('.form').reset();
      document.removeEventListener('keydown', this._handleEscClose);
      this._popup.removeEventListener('submit', this._submit);
      this._popup.removeEventListener('mousedown', this._closer);
      this._popup.removeEventListener('submit', this.close);
      this._popup.classList.remove('popup_active');
    }
  }

  _getInputValues() {
    const { elements } = {elements: this._form .elements};
    return elements;
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('submit', this._submit);
    this._popup.addEventListener('submit', this.close);
    this._popup.addEventListener('mousedown', this._closer);
  }
}