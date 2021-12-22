import {initialCards} from './initialCards.js';
import {lockButton} from './validate.js';
import {config} from './config.js';

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
const cardTemplate = document.querySelector('#card-template').content;
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

function openImagePopup(item) {
  const slideImage = popupTypeSlide.querySelector('.slide__image');
  slideImage.src = item.link;
  slideImage.alt = item.name;
  openPopup(popupTypeSlide);
}

// Block 
function saveProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameformUserProfile.value;
  profileProfession.textContent = professionformUserProfile.value;
  closePopup(popupTypeEdit);
}

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const deleteButton = cardElement.querySelector('.element__remove');
  const likeButton = cardElement.querySelector('.element__like');
  cardImage.addEventListener("click", () => openImagePopup(item));
  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeToggle);
  cardElement.querySelector('.element__name').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  return cardElement;
}

function likeToggle(event) {
  event.target.classList.toggle('element__like_checked');
}

function deleteCard(evn) {
  evn.target.closest('.element').remove();
}

function saveCardForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: nameFormAddCard.value,
    link: linkFormAddCard.value
  };
  const element = createCard(newCard);
  cardsContainer.prepend(element);
  closePopup(popupTypeAdd);
}

// Block 
initialCards.forEach(item => {
  const element = createCard(item);
  cardsContainer.append(element);
});

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