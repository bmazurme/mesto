import {initialCards} from './initialCards.js';
import {config} from './config.js';
import {formValidator} from './FormValidator.js';
import {Card, SlideCard, UserCard} from './Card.js';

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

const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');

initialCards.forEach(item => {
  const card = new Card(item);
  const element = card.createCard();
  cardsContainer.append(element);
});

const slideCard = new SlideCard();
const userCard =  new UserCard();

formValidator.enableValidation(config);
addButton.addEventListener('click', () => slideCard.openAddCardPopup());
editButton.addEventListener('click', () => userCard.openUserProfilePopup());