export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_active');
      this.close(openedPopup);
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_active')) {
        this.close(this._popup);
      }
    });
    //document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    // const popups = document.querySelectorAll('.popup');
    // popups.forEach((popup) => {
    //     popup.addEventListener('click', (evt) => {
    //         if (evt.target.classList.contains('popup_active')) {
    //           closePopup(popup);
    //         }
    //         if (evt.target.classList.contains('popup__close')) {
    //           closePopup(popup);
    //         }
    //     })
    // });
  }

  open() {
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popup.classList.add('popup_active');
  }

  close() {
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popup.classList.remove('popup_active');
  }
}