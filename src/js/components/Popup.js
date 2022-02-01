export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleButtonClose = (evt) => {
    if (evt.target.classList.contains('popup_active') || 
        evt.target.classList.contains('popup__close')) {
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
    this._popup.classList.add('popup_active');
  }

  close() {
    this._popup.classList.remove('popup_active');
    this._popup.removeEventListener('mousedown', this._handleButtonClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}