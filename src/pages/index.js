import './index.css';
import { Api } from '../js/components/Api.js';
import { config, settings } from '../js/config.js';
import { Card } from '../js/components/Card.js';
import { FormValidator } from '../js/components/FormValidator.js';
import { Section } from '../js/components/Section.js';
import { PopupWithForm } from '../js/components/PopupWithForm.js';
import { PopupWithImage } from '../js/components/PopupWithImage.js';
import { UserInfo } from '../js/components/UserInfo.js';
import { PopupWithConfirm } from '../js/components/PopupWithConfirm';

const editAvatarForm = document.querySelector('.form_type_edit-avatar');
const editForm = document.querySelector(settings.editForm);
const editAvatar = document.querySelector('.profile__image');
const addForm = document.querySelector(settings.addForm);
const addButton = document.querySelector(settings.buttonAdd);
const editButton = document.querySelector(settings.buttonEdit);
const inputName = editForm.querySelector(settings.inputName);
const inputProfession = editForm.querySelector(settings.inputProfession);
const cardListSelector = settings.elements;
let cardList = null;
let userId = null;

const api = new Api({
  baseUrl: settings.baseUrl,
  headers: {
    authorization: settings.clientToken,
    'Content-Type': 'application/json'
  }
}); 

const avatarFormValidator = new FormValidator(config, editAvatarForm);
const userFormValidator = new FormValidator(config, editForm);
const cardFormValidator = new FormValidator(config, addForm);
const popupWithImage = new PopupWithImage(settings.slideType);
const userInfo = new UserInfo({name: settings.profileName, about: settings.profileProfession, avatar: settings.avatar});

avatarFormValidator.enableValidation();
userFormValidator.enableValidation();
cardFormValidator.enableValidation();

const handleCardClick = (item) => {
  popupWithImage.open(item);
};

const handleLikeToggle = (evt, cardLike, cardId, counter ) => {
  if (evt.target.classList.contains(cardLike)) {
    api.changeLike(cardId, false)
      .then(data => {
        evt.target.classList.toggle(cardLike);
         counter.textContent = data.likes.length
        })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  } else {
    api.changeLike(cardId, true)//(cardId)
      .then(data => {
        evt.target.classList.toggle(cardLike);
        counter.textContent = data.likes.length
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
}

const saveUser = (evt, val) => {
  evt.preventDefault();
  userPopupWithForm.renderLoading(true, 'Сохранение...')  
  const {name, profession} = val;
  const obj = {name: name, about: profession};
  api.patchUser({
    name: obj.name,
    about: obj.about
  })
    .then(data => {
      userInfo.setUserInfo(data);
      userPopupWithForm.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => userPopupWithForm.renderLoading(false, 'Сохранить') );
}

const saveAvatar = (evt, val) => {
  evt.preventDefault();
  avatarPopupWithForm.renderLoading(true, 'Сохранение...') 
  const {avatar} = val;
  api.patchAvatar({avatar: avatar})
    .then(
      (data) => {
        userInfo.setUserInfo(data);
        avatarPopupWithForm.close();
      })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => avatarPopupWithForm.renderLoading(false, 'Сохранить') );
}

const saveCard = (evt, val) => {
  evt.preventDefault();
  cardPopupWithForm.renderLoading(true, 'Сохранение...') 
  const {name, link} = val;
  const obj = {name: name, link: link};
  api.postCard(obj)
    .then((data) => {
      renderer(data);
      cardPopupWithForm.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => cardPopupWithForm.renderLoading(false, 'Сохранить')  );
}

const deleteCardCallback = (evt, element, card) => {
  evt.preventDefault();
  popupWithConfirm.renderLoading(false, 'Удаление...')
  api.deleteCard(card._item._id)
  .then((data) => {
    element.remove();
    popupWithConfirm.close();
   })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() => popupWithConfirm.renderLoading(false, 'Да'));
};

const cardPopupWithForm = new PopupWithForm({submit: saveCard, popupSelector: settings.popupTypeAdd});
const userPopupWithForm = new PopupWithForm({submit: saveUser, popupSelector: settings.popupTypeEdit});
const avatarPopupWithForm = new PopupWithForm({submit: saveAvatar, popupSelector: '.popup_type_edit-avatar'});
const popupWithConfirm = new PopupWithConfirm({ submit: deleteCardCallback, popupSelector: settings.popupModal});

function openEditAvatarPopup() {
  avatarFormValidator.resetValidation();
  avatarPopupWithForm.open();
}

function openEditCardPopup() {
  userFormValidator.resetValidation();
  const {name, about} = userInfo.getUserInfo();
  inputName.value = name;
  inputProfession.value = about;
  userPopupWithForm.open();
}

function openAddCardPopup() {
  cardFormValidator.resetValidation();
  cardPopupWithForm.open();
}

Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
      cardList = new Section({
      items: cards,
        renderer: renderer
      },
      cardListSelector
    );
    cardList.render();
  })
  .catch(err => {
    console.log(err); // выведем ошибку в консоль
  });

function renderer(item) {
  const cardElement = createCard(item);
  cardList.addItem(cardElement);
}

function createCard(item) {
  const card = new Card({
    item: item,
    cardTemplate: settings.cardTemplate,
    handleCardClick,
    handleLikeToggle,
    handleCardDelete:popupWithConfirm,
    userId
  });
  return card.createCard();
}

editButton.addEventListener('click', openEditCardPopup);
addButton.addEventListener('click', openAddCardPopup);
editAvatar.addEventListener('click', openEditAvatarPopup);