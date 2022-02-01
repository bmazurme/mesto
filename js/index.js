import { initialCards } from './initialCards.js';
import { config } from './config.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';

const addButton = document.querySelector('.profile__add');
const editButton = document.querySelector('.profile__edit');
const formUserProfile = document.querySelector('.form_type_edit');
const formAddCard = document.querySelector('.form_type_add');
const saveButton = formAddCard.querySelector('.form__save');
const nameformUserProfile = formUserProfile.querySelector('.form__input_type_name');
const professionformUserProfile = formUserProfile.querySelector('.form__input_type_profession');
const cardListSelector = '.elements';
const userFormValidator = new FormValidator(config, formUserProfile);
const cardFormValidator = new FormValidator(config, formAddCard);
const userInfo = new UserInfo({name: '.profile__name', profession: '.profile__profession'});

userFormValidator.enableValidation();
cardFormValidator.enableValidation();

const saveUser = (evt, val) => {
  evt.preventDefault();
  const {name, profession} = val;
  const obj = {name: name.value, profession: profession.value};
  userInfo.setUserInfo(obj);
}

const saveCard = (evt, val) => {
  evt.preventDefault();
  const {name, link} = val;
  const obj = {name: name.value, link: link.value};
  const card = new Card(obj, '#card-template');
  const item = card.createCard();
  defaultCardList.addItem(item);
}

const cardPopupWithForm = new PopupWithForm(saveCard, '.popup_type_add');
const userPopupWithForm = new PopupWithForm(saveUser, '.popup_type_edit');

function openEditCardPopup() {
  userFormValidator.resetValidation();
  const data = userInfo.getUserInfo();
  nameformUserProfile.value = data.name;
  professionformUserProfile.value = data.profession;
  userPopupWithForm.open();
}

function openAddCardPopup() {
  cardFormValidator.resetValidation();
  saveButton.classList.add('form__save_inactive');
  cardPopupWithForm.open();
}

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = new Card(item, '#card-template');
      const cardElement = card.createCard();
      defaultCardList.addItem(cardElement);
    }
  },
  cardListSelector
);

defaultCardList.render();
editButton.addEventListener('click', openEditCardPopup);
addButton.addEventListener('click', openAddCardPopup);