import './index.css';
import { initialCards } from '../js/initialCards.js';
import { config, settings } from '../js/config.js';
import { Card } from '../js/components/Card.js';
import { FormValidator } from '../js/components/FormValidator.js';
import { Section } from '../js/components/Section.js';
import { PopupWithForm } from '../js/components/PopupWithForm.js';
import { PopupWithImage } from '../js/components/PopupWithImage.js';
import { UserInfo } from '../js/components/UserInfo.js';

const editForm = document.querySelector(settings.editForm);
const addForm = document.querySelector(settings.addForm);
const addButton = document.querySelector(settings.buttonAdd);
const editButton = document.querySelector(settings.buttonEdit);
const inputName = editForm.querySelector(settings.inputName);
const inputProfession = editForm.querySelector(settings.inputProfession);
const cardListSelector = settings.elements;
const userFormValidator = new FormValidator(config, editForm);
const cardFormValidator = new FormValidator(config, addForm);
const userInfo = new UserInfo({name: settings.profileName, profession: settings.profileProfession});

userFormValidator.enableValidation();
cardFormValidator.enableValidation();

const handleCardClick = (item) => {
  new PopupWithImage(item, settings.slideType).open();
};

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
  const card = new Card({item: obj, cardTemplate: settings.cardTemplate,
    handleCardClick: handleCardClick});
  const item = card.createCard();
  defaultCardList.addItem(item);
}

const cardPopupWithForm = new PopupWithForm({submit: saveCard, popupSelector: settings.popupTypeAdd});
const userPopupWithForm = new PopupWithForm({submit: saveUser, popupSelector: settings.popupTypeEdit});

function openEditCardPopup() {
  userFormValidator.resetValidation();
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputProfession.value = data.profession;
  userPopupWithForm.open();
}

function openAddCardPopup() {
  cardFormValidator.resetValidation();
  cardPopupWithForm.open();
}

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = new Card({item: item, cardTemplate: settings.cardTemplate,
        handleCardClick: handleCardClick});
      const cardElement = card.createCard();
      defaultCardList.addItem(cardElement);
    }
  },
  cardListSelector
);

defaultCardList.render();
editButton.addEventListener('click', openEditCardPopup);
addButton.addEventListener('click', openAddCardPopup);