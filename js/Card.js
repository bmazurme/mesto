import {lockButton} from './FormValidator.js';
import {config, settings} from './config.js';
import {cardsContainer, formAddCard, formAddName, formAddLink, popupTypeAdd} from './index.js';
import {formUserProfile as profile, popupTypeEdit, formUserName, 
  formUserProfession, profileName, profileProfession} from './index.js';

class BaseCard {
  constructor() {
    
  }

  _keydownEsc(popup, evt) {
    if (evt.key === 'Escape') {
      this.closePopup(popup);
    }
  }
  
  openPopup(popup) {
    document.addEventListener('keydown', 
      (evt) => this._keydownEsc(popup, evt));
    popup.classList.add('popup_active');
  }
  
  closePopup(popup) {
    document.removeEventListener('keydown', 
      (evt) => this._skeydownEsc(popup, evt));
    popup.classList.remove('popup_active');
  }

  getCloseButton(popup, popupClose) {
    return popup.querySelector(popupClose);
  }

  getSaveButton(form, formSave) {
    return form.querySelector(formSave);
  }
}

export class Card extends BaseCard{
  constructor(item) {
    super();
    this.item = item;
    this._name = item.name;
    this._link = item.link;
    this._typeSlide = settings.typeSlide;
    this._slideName = settings.slideName;
    this._slideImage = settings.slideImage;
    this._closeButton = settings.closeButton;
    this._cardName = settings.cardName; 
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

  _openImagePopup() {
    const currentSlide = this._getPopupSlide(this._typeSlide);
    currentSlide.querySelector(this._slideName).textContent = this._name;
    const slideImage = currentSlide.querySelector(this._slideImage);
    slideImage.src = this._link;
    slideImage.alt = this._name;
    super.getCloseButton(currentSlide, this._closeButton).addEventListener('click', 
      () => super.closePopup(currentSlide));
    super.openPopup(currentSlide);
  }
  
  createCard() {
    const cardElement = document.querySelector('#card-template')
      .content.querySelector(settings.element).cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const deleteButton = cardElement.querySelector('.element__remove');
    const likeButton = cardElement.querySelector('.element__like');
    cardImage.addEventListener("click", () => this._openImagePopup(cardElement));
    cardElement.querySelector(settings.cardName).textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    deleteButton.addEventListener("click", (evt) => this._deleteCard(evt));
    likeButton.addEventListener("click", (evt) => this._likeToggle( evt));
    return cardElement;
  }
}

export class UserCard extends BaseCard {
  constructor() {
    super();
    this._closeButton = settings.closeButton;
  }

  openUserProfilePopup() {
    formUserName.value = profileName.textContent;
    formUserProfession.value = profileProfession.textContent;
    super.getCloseButton(popupTypeEdit, this._closeButton)
      .addEventListener('click', () => super.closePopup(popupTypeEdit));
      profile.addEventListener('submit', new UserCard().saveProfileForm);
    super.openPopup(popupTypeEdit);
  }

  saveProfileForm(evt) {
    evt.preventDefault()
    profileName.textContent = formUserName.value;
    profileProfession.textContent = formUserProfession.value;
    super.closePopup(popupTypeEdit);
  }
}

export class SlideCard extends BaseCard {
  constructor() {
    super();
    this._formSave = settings.formSave;
    this._closeButton = settings.closeButton;
  }

  openAddCardPopup() {
    formAddCard.reset();
    lockButton(super.getSaveButton(formAddCard, this._formSave), config.inactiveButtonClass);
    super.getCloseButton(popupTypeAdd, this._closeButton).addEventListener('click', 
      () => super.closePopup(popupTypeAdd));
    const slideCard = new SlideCard();
    formAddCard.addEventListener('submit', slideCard.saveCardForm);
    super.openPopup(popupTypeAdd); 
  }

  saveCardForm(evt) {
    evt.preventDefault();
    const newCard = {
      name: formAddName.value,
      link: formAddLink.value
    };
    const card = new Card(newCard);
    const element = card.createCard();
    cardsContainer.prepend(element);
    super.closePopup(popupTypeAdd);
  }
}

document.addEventListener('mousedown', function (evt) {
  if (evt.target.classList.contains('popup')) {
    new BaseCard().closePopup(evt.target);
  }
});