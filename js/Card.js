import {lockButton} from './FormValidator.js';
import {config} from './config.js';

export class BaseCard {
  constructor() {
    //this._class = conf;
  }

  keydownEsc(popup, evt) {
    if (evt.key === 'Escape') {
      this.closePopup(popup);
      //console.log('===');
    }
  }

  openPopup(popup) {
    document.addEventListener('keydown', 
      (evt) => baseCard.keydownEsc(popup, evt));
    popup.classList.add('popup_active');
  }
  
  closePopup(popup) {
    document.removeEventListener('keydown', 
      (evt) => baseCard.keydownEsc(popup, evt));
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
    this._item = item;
    this._name = item.name;
    this._link = item.link;
  }

  _getCurrentSlide() {
    return document.querySelector('.popup_type_slide');
  }

  _getTemplate() {
    return document.querySelector('#card-template').content;
  }

  _likeToggle(event) {
    event.target.classList.toggle('element__like_checked');
  }

  _deleteCard(evn) {
    evn.target.closest('.element').remove();
  }

  _openImagePopup() {
    const currentSlide = this._getCurrentSlide();
    currentSlide.querySelector('.slide__name').textContent = this._name;
    const slideImage = currentSlide.querySelector('.slide__image');
    slideImage.src = this._link;
    slideImage.alt = this._name;

    super.getCloseButton(currentSlide, '.popup__close').addEventListener('click', 
      () => super.closePopup(currentSlide));
      super.openPopup(this._getCurrentSlide());
  }
  
  createCard() {
    const cardElement = this._getTemplate().querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const deleteButton = cardElement.querySelector('.element__remove');
    const likeButton = cardElement.querySelector('.element__like');
    cardImage.addEventListener("click", () => this._openImagePopup(cardElement));
    cardElement.querySelector('.element__name').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    deleteButton.addEventListener("click", this._deleteCard);
    likeButton.addEventListener("click", this._likeToggle);

    return cardElement;
  }
}

export class UserCard extends BaseCard {
  constructor() {
    super();
  }

  openUserProfilePopup() {
    const formUserProfile = document.querySelector('.form_type_edit');
    const popupTypeEdit = document.querySelector('.popup_type_edit');
    const nameformUserProfile = formUserProfile.querySelector('.form__input_type_name');
    const professionformUserProfile = formUserProfile.querySelector('.form__input_type_profession');
    const profileName = document.querySelector('.profile__name');
    const profileProfession = document.querySelector('.profile__profession');
    nameformUserProfile.value = profileName.textContent;
    professionformUserProfile.value = profileProfession.textContent;

    super.getCloseButton(popupTypeEdit, '.popup__close')
      .addEventListener('click', () => super.closePopup(popupTypeEdit));
      formUserProfile.addEventListener('submit', new UserCard().saveProfileForm);
    super.openPopup(popupTypeEdit);
  }

  saveProfileForm(evt) {
    evt.preventDefault();
    const formUserProfile = document.querySelector('.form_type_edit');
    const popupTypeEdit = document.querySelector('.popup_type_edit');
    const nameformUserProfile = formUserProfile.querySelector('.form__input_type_name');
    const professionformUserProfile = formUserProfile.querySelector('.form__input_type_profession');
    const profileName = document.querySelector('.profile__name');
    const profileProfession = document.querySelector('.profile__profession');
    profileName.textContent = nameformUserProfile.value;
    profileProfession.textContent = professionformUserProfile.value;
    super.closePopup(popupTypeEdit);
  }
}

export class SlideCard extends BaseCard {
  constructor(formAddName, formAddLink) {
    super();
  }

  openAddCardPopup() {
    const formAddCard = document.querySelector('.form_type_add');
    formAddCard.reset();

    const popupTypeAdd = document.querySelector('.popup_type_add');
    const formAddName = formAddCard.querySelector('.form__input_type_name');
    const formAddLink = formAddCard.querySelector('.form__input_type_link');

    lockButton(super.getSaveButton(formAddCard, '.form__save'), config.inactiveButtonClass);
    
    super.getCloseButton(popupTypeAdd, '.popup__close').addEventListener('click', 
      () => super.closePopup(popupTypeAdd));
    const slideCard = new SlideCard(formAddName, formAddLink);
    formAddCard.addEventListener('submit', slideCard.saveCardForm);
    super.openPopup(popupTypeAdd); 
  }

  saveCardForm(evt) {
    evt.preventDefault();
    const formAddCard = document.querySelector('.form_type_add');
    const formAddName = formAddCard.querySelector('.form__input_type_name');
    const formAddLink = formAddCard.querySelector('.form__input_type_link');

    const newCard = {
      name: formAddName.value,
      link: formAddLink.value
    };

    const card = new Card(newCard);
    const element = card.createCard();
    const cardsContainer = document.querySelector('.elements');
    cardsContainer.prepend(element);
    const popupTypeAdd = document.querySelector('.popup_type_add');
    super.closePopup(popupTypeAdd);
  }
}

const baseCard = new BaseCard();

document.addEventListener('mousedown', function (evt) {
  if (evt.target.classList.contains('popup')) {
    new BaseCard('popup_active').closePopup(evt.target);
  }
});
