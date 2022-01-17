import {initialCards} from './initialCards.js';
import {lockButton} from './FormValidator.js';
import {config} from './config.js';
import {Card} from './Card.js';
//import {AddCard} from './Card.js';
//import {FormValidator} from './FormValidator.js';
import {enableValidation} from './FormValidator.js';

const addButton = document.querySelector('.profile__add');
const editButton = document.querySelector('.profile__edit');
const formUserProfile = document.querySelector('.form_type_edit');
const formAddCard = document.querySelector('.form_type_add');
const nameformUserProfile = formUserProfile.querySelector('.form__input_type_name');
const professionformUserProfile = formUserProfile.querySelector('.form__input_type_profession');
const nameFormAddCard = formAddCard.querySelector('.form__input_type_name');
const linkFormAddCard = formAddCard.querySelector('.form__input_type_link');
const popupTypeSlide = document.querySelector('.popup_type_slide');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const closeButtonSlide = popupTypeSlide.querySelector('.popup__close');
const closeButtonEdit = popupTypeEdit.querySelector('.popup__close');
const closeButtonAdd = popupTypeAdd.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const cardsContainer = document.querySelector('.elements');
const saveButton = formAddCard.querySelector('.form__save');

// Block change of visibility state
function openPopup(popup) {
  document.addEventListener('keydown', (evt) => keydownEsc(popup, evt));
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  document.removeEventListener('keydown', (evt) => keydownEsc(popup, evt));
  popup.classList.remove('popup_active');
}

// Block initial values of forms
function openUserProfilePopup() {
  nameformUserProfile.value = profileName.textContent;
  professionformUserProfile.value = profileProfession.textContent;
  openPopup(popupTypeEdit);
}

function openAddCardPopup() {
  formAddCard.reset();

  lockButton(saveButton, config.inactiveButtonClass);
  
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
  const card = new Card(newCard);
  const element = card.createCard();
  cardsContainer.prepend(element);
  closePopup(popupTypeAdd);
}

initialCards.forEach(item => {
  const card = new Card(item);
  const element = card.createCard();
  cardsContainer.append(element);
});

enableValidation(config);
//new FormValidator(config).enableValidation();

formUserProfile.addEventListener('submit', saveProfileForm);
formAddCard.addEventListener('submit', saveCardForm);
editButton.addEventListener('click', openUserProfilePopup);
addButton.addEventListener('click', openAddCardPopup);
closeButtonSlide.addEventListener('click', () => closePopup(popupTypeSlide));
closeButtonEdit.addEventListener('click', () => closePopup(popupTypeEdit));
closeButtonAdd.addEventListener('click', () =>closePopup(popupTypeAdd));

// 
document.addEventListener('mousedown', function (evt) {
  if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
  }
});

function keydownEsc(popup, evt) {
  if (evt.key === 'Escape') {
      closePopup(popup);
  }
}