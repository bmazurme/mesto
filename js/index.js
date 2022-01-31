import { initialCards } from './initialCards.js';
import { config } from './config.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './components/Section.js';
import Popup from './components/Popup.js';

const addButton = document.querySelector('.profile__add');
const editButton = document.querySelector('.profile__edit');
const formUserProfile = document.querySelector('.form_type_edit');
const formAddCard = document.querySelector('.form_type_add');
const nameformUserProfile = formUserProfile.querySelector('.form__input_type_name');
const professionformUserProfile = formUserProfile.querySelector('.form__input_type_profession');
const nameFormAddCard = formAddCard.querySelector('.form__input_type_name');
const linkFormAddCard = formAddCard.querySelector('.form__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const saveButton = formAddCard.querySelector('.form__save');


const userFormValidator = new FormValidator(config, formUserProfile);
const cardFormValidator = new FormValidator(config, formAddCard);
userFormValidator.enableValidation();
cardFormValidator.enableValidation();

const openPopup = (popup) => {
  document.addEventListener('keydown', closeByEscape);
  popup.classList.add('popup_active');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  }
}

const userPopup = new Popup('.popup_type_edit');
const addPopup  = new Popup('.popup_type_add');
userPopup.setEventListeners();
addPopup.setEventListeners();

function openUserProfilePopup() {
  userFormValidator.resetValidation();
  nameformUserProfile.value = profileName.textContent;
  professionformUserProfile.value = profileProfession.textContent;
  userPopup.open();
}

function openAddCardPopup() {
  formAddCard.reset();
  cardFormValidator.resetValidation();
  saveButton.classList.add('form__save_inactive');
  addPopup.open();
}

function saveProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameformUserProfile.value;
  profileProfession.textContent = professionformUserProfile.value;
  userPopup.close();
}

formUserProfile.addEventListener('submit', saveProfileForm);
formAddCard.addEventListener('submit', saveCardForm);
editButton.addEventListener('click', openUserProfilePopup);
addButton.addEventListener('click', openAddCardPopup);

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

const cardListSelector = '.elements'; 
const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = new Card(item, '#card-template', openPopup, closePopup);
      const cardElement = card.createCard();
      defaultCardList.addItem(cardElement);
    }
  },
  cardListSelector
);

function saveCardForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: nameFormAddCard.value,
    link: linkFormAddCard.value
  };
  const card = new Card(newCard, '#card-template', openPopup, closePopup);
  const cardElement = card.createCard();
  defaultCardList.addItem(cardElement);
  addPopup.close();
}

defaultCardList.render();