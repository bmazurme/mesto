import {initialCards} from './initialCards.js';
import {config, settings} from './config.js';
import {FormValidator, lockButton} from './FormValidator.js';
import {Card} from './Card.js';
import { BasePopup } from './Popup.js';

export class UserPopup extends BasePopup {
  constructor() {
    super();
    this._closeButton = settings.closeButton;
  }

  openUserProfilePopup() {
    formUserName.value = profileName.textContent;
    formUserProfession.value = profileProfession.textContent;
    super.getCloseButton(popupTypeEdit, this._closeButton)
      .addEventListener('click', () => super.closePopup(popupTypeEdit));
    formUserProfile.addEventListener('submit', new UserPopup().saveProfileForm);
    super.openPopup(popupTypeEdit);
  }

  saveProfileForm(evt) {
    evt.preventDefault()
    profileName.textContent = formUserName.value;
    profileProfession.textContent = formUserProfession.value;
    super.closePopup(popupTypeEdit);
  }
}

export class SlidePopup extends BasePopup {
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
    const slidePopup = new SlidePopup();
    formAddCard.addEventListener('submit', slidePopup.saveCardForm);
    super.openPopup(popupTypeAdd); 
  }

  saveCardForm(evt) {
    evt.preventDefault();
    const newCard = {
      name: formAddName.value,
      link: formAddLink.value
    };
    const card = new Card(newCard, '#card-template');
    const element = card.createCard();
    cardsContainer.prepend(element);
    super.closePopup(popupTypeAdd);
  }
}

export const cardsContainer = document.querySelector('.elements');
export const formAddCard = document.querySelector('.form_type_add');
export const formAddName = formAddCard.querySelector('.form__input_type_name');
export const formAddLink = formAddCard.querySelector('.form__input_type_link');
export const popupTypeAdd = document.querySelector('.popup_type_add');
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const formUserProfile = document.querySelector('.form_type_edit');
export const formUserName = formUserProfile.querySelector('.form__input_type_name');
export const formUserProfession = formUserProfile.querySelector('.form__input_type_profession');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');

const formList = Array.from(document.querySelectorAll(config.formSelector));
const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');

initialCards.forEach(item => {
  const card = new Card(item, '#card-template');
  const element = card.createCard();
  cardsContainer.append(element);
});

formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
}); 

const userPopup = new UserPopup();
editButton.addEventListener('click', () => userPopup.openUserProfilePopup());
addButton.addEventListener('click', () => new SlidePopup().openAddCardPopup());

document.addEventListener('mousedown', function (evt) {
  if (evt.target.classList.contains('popup')) {
    new BasePopup().closePopup(evt.target);
  }
});
