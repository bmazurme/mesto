import { settings } from "../config";
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._openPopup = settings.openPopup;
    this._closePopup = settings.closePopup;
  }

  _handleButtonClose = (evt) => {
    if (evt.target.classList.contains(this._openPopup) || 
        evt.target.classList.contains(this._closePopup)) {
      this.close(this._popup);
    }
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleButtonClose);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add(this._openPopup);
  }

  close() {
    this._popup.classList.remove(this._openPopup);
    this._popup.removeEventListener('mousedown', this._handleButtonClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}