import './index.css'; // добавьте импорт главного файла стилей 
import { initialCards } from '../js/initialCards.js';
import { config } from '../js/config.js';
import { Card } from '../js/components/Card.js';
import { FormValidator } from '../js/components/FormValidator.js';
import { Section } from '../js/components/Section.js';
import { PopupWithForm } from '../js/components/PopupWithForm.js';
import { PopupWithImage } from '../js/components/PopupWithImage.js';
import { UserInfo } from '../js/components/UserInfo.js';

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

const handleCardClick = (item) => {
  new PopupWithImage(item, '.popup_type_slide').open();
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
  const card = new Card({item: obj, cardTemplate: '#card-template', handleCardClick: handleCardClick});
  const item = card.createCard();
  defaultCardList.addItem(item);
}

const cardPopupWithForm = new PopupWithForm({submit: saveCard, popupSelector: '.popup_type_add'} );
const userPopupWithForm = new PopupWithForm({submit: saveUser, popupSelector: '.popup_type_edit'});

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
      const card = new Card({item: item, cardTemplate: '#card-template', handleCardClick: handleCardClick});
      const cardElement = card.createCard();
      defaultCardList.addItem(cardElement);
    }
  },
  cardListSelector
);

defaultCardList.render();
editButton.addEventListener('click', openEditCardPopup);
addButton.addEventListener('click', openAddCardPopup);