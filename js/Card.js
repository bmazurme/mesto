import { settings } from './config.js';

export class Card {
  constructor(item, cardTemplate) {
    this._name = item.name;
    this._link = item.link;
    this._cardTemplate = cardTemplate;
    this._typeSlide = settings.typeSlide;
    this._slideName = settings.slideName;
    this._slideImage = settings.slideImage;
    this._closeButton = settings.closeButton;
    this._cardLike = settings.cardLike;
    this._element = settings.element;
  }

  _getPopupSlide(typeSlide) {
    return document.querySelector(typeSlide);
  }

  _likeToggle( event) {
    event.target.classList.toggle(this._cardLike);
  }

  _deleteCard(evn) {
    evn.target.closest(this._element).remove();
  }

  _getCloseButton(popup, popupClose) {
    return popup.querySelector(popupClose);
  }

  _keydownEsc(popup, evt) {
    if (evt.key === 'Escape') {
      this._closePopup(popup);
    }
  }
  
  _openPopup(popup) {
    document.addEventListener('keydown', 
      (evt) => this._keydownEsc(popup, evt));
    popup.classList.add('popup_active');
  }
  
  _closePopup(popup) {
    document.removeEventListener('keydown', 
      (evt) => this._skeydownEsc(popup, evt));
    popup.classList.remove('popup_active');
  }

  _openImagePopup() {
    const currentSlide = this._getPopupSlide(this._typeSlide);
    currentSlide.querySelector(this._slideName).textContent = this._name;
    const slideImage = currentSlide.querySelector(this._slideImage);
    slideImage.src = this._link;
    slideImage.alt = this._name;
    this._getCloseButton(currentSlide, this._closeButton).addEventListener('click', 
       () => this._closePopup(currentSlide));
    this._openPopup(currentSlide);
  }
  
  createCard() {
    const cardElement = document.querySelector(this._cardTemplate)
      .content.querySelector(settings.element).cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const deleteButton = cardElement.querySelector('.element__remove');
    const likeButton = cardElement.querySelector('.element__like');

    cardElement.querySelector(settings.cardName).textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardImage.addEventListener("click", () => this._openImagePopup(cardElement));
    deleteButton.addEventListener("click", (evt) => this._deleteCard(evt));
    likeButton.addEventListener("click", (evt) => this._likeToggle( evt));
    return cardElement;
  }
}