import {initialCards} from './initialCards.js';
import {config} from './config.js';
import {enableValidation} from './FormValidator.js';
import {Card, SlideCard, UserCard } from './Card.js';

const cardsContainer = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add');
const editButton = document.querySelector('.profile__edit');

initialCards.forEach(item => {
  const card = new Card(item);
  const element = card.createCard();
  cardsContainer.append(element);
});

enableValidation(config);

const formAddCard = document.querySelector('.form_type_add');
const formAddName = formAddCard.querySelector('.form__input_type_name');
const formAddLink = formAddCard.querySelector('.form__input_type_link');

addButton.addEventListener('click', new SlideCard(formAddName, formAddLink).openAddCardPopup);
editButton.addEventListener('click',  new UserCard().openUserProfilePopup);