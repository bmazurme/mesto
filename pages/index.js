import {initialCards} from './initialCards.js';

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

function closePopup(evt) {
  evt.target.parentElement.parentElement.classList.remove('popup_active');
}

function openUserProfilePopup() {
  nameformUserProfile.value = profileName.textContent;
  professionformUserProfile.value = profileProfession.textContent;
  popupTypeEdit.classList.add('popup_active');
  formUserProfile.classList.add('form_active');
}

function openAddCardPopup() {
  nameFormAddCard.value = '';
  linkFormAddCard.value = '';
  popupTypeAdd.classList.add('popup_active');
  formAddCard.classList.add('form_active');
}

function openImagePopup(evt) {
  const currentElement = evt.target.parentElement;
  const currentGroup = currentElement.querySelector('.element__group');
  const currentImage = currentElement.querySelector('.element__image');
  const name = currentGroup.querySelector('.element__name');
  const slideImage = popupTypeSlide.querySelector('.slide__image');
  slideImage.src= currentImage.src ;
  slideImage.alt = name.textContent;
  popupTypeSlide.classList.add('popup_active');
}

function saveProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameformUserProfile.value;
  profileProfession.textContent = professionformUserProfile.value;
  popupTypeEdit.classList.remove('popup_active');
}

function likeToggle(event) {
  event.target.classList.toggle('element__like_checked');
}

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const deleteButton = cardElement.querySelector('.element__remove');
  const likeButton = cardElement.querySelector('.element__like');
  cardImage.addEventListener("click", openImagePopup);
  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeToggle);
  cardElement.querySelector('.element__name').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  return cardElement;
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
  popupTypeAdd.classList.remove('popup_active');
  formUserProfile.classList.remove('form_active');
  formAddCard.classList.remove('form_active');
}

initialCards.forEach(item => {
  const element = createCard(item);
  return cardsContainer.append(element);
});

formUserProfile.addEventListener('submit', saveProfileForm);
formAddCard.addEventListener('submit', saveCardForm);
editButton.addEventListener('click', openUserProfilePopup);
addButton.addEventListener('click', openAddCardPopup);
closeButtonSlide.addEventListener('click', closePopup);
closeButtonEdit.addEventListener('click', closePopup);
closeButtonAdd.addEventListener('click', closePopup);