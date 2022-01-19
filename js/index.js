import { initialCards } from './initialCards.js';
import { config } from './config.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const addButton = document.querySelector('.profile__add');
const editButton = document.querySelector('.profile__edit');
const formUserProfile = document.querySelector('.form_type_edit');
const formAddCard = document.querySelector('.form_type_add');
const nameformUserProfile = formUserProfile.querySelector('.form__input_type_name');
const professionformUserProfile = formUserProfile.querySelector('.form__input_type_profession');
const nameFormAddCard = formAddCard.querySelector('.form__input_type_name');
const linkFormAddCard = formAddCard.querySelector('.form__input_type_link');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const cardsContainer = document.querySelector('.elements');
const saveButton = formAddCard.querySelector('.form__save');
const popups = document.querySelectorAll('.popup');

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

function openUserProfilePopup() {
  userFormValidator.resetValidation();
  nameformUserProfile.value = profileName.textContent;
  professionformUserProfile.value = profileProfession.textContent;
  openPopup(popupTypeEdit);
}

function openAddCardPopup() {
  formAddCard.reset();
  cardFormValidator.resetValidation();
  saveButton.classList.add('form__save_inactive');
  openPopup(popupTypeAdd); 
}

function saveProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameformUserProfile.value;
  profileProfession.textContent = professionformUserProfile.value;
  closePopup(popupTypeEdit);
}

function saveCardForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: nameFormAddCard.value,
    link: linkFormAddCard.value
  };
  const element = generateCard(newCard);
  cardsContainer.prepend(element);
  closePopup(popupTypeAdd);
}

function generateCard(item) {
  const card = new Card(item, '#card-template', openPopup, closePopup);
  const cardElement = card.createCard();
  return cardElement
}

formUserProfile.addEventListener('submit', saveProfileForm);
formAddCard.addEventListener('submit', saveCardForm);
editButton.addEventListener('click', openUserProfilePopup);
addButton.addEventListener('click', openAddCardPopup);

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_active')) {
          closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup);
        }
    })
});

initialCards.forEach(item => {
  const element = generateCard(item);
  cardsContainer.append(element);
});