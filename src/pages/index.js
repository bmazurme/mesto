import './index.css';
import { Api } from '../js/components/Api.js';
import { config, settings } from '../js/config.js';
import { Card } from '../js/components/Card.js';
import { FormValidator } from '../js/components/FormValidator.js';
import { Section } from '../js/components/Section.js';
import { PopupWithForm } from '../js/components/PopupWithForm.js';
import { PopupWithImage } from '../js/components/PopupWithImage.js';
import { UserInfo } from '../js/components/UserInfo.js';

const editAvatarForm = document.querySelector('.form_type_edit-avatar');
const editForm = document.querySelector(settings.editForm);
const editAvatar = document.querySelector('.profile__image');
const addForm = document.querySelector(settings.addForm);
const addButton = document.querySelector(settings.buttonAdd);
const editButton = document.querySelector(settings.buttonEdit);
const inputName = editForm.querySelector(settings.inputName);
const inputProfession = editForm.querySelector(settings.inputProfession);
const cardListSelector = settings.elements;
let defaultCardList = null;
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
const userInfo = new UserInfo({name: settings.profileName, about: settings.profileProfession, avatar: settings.avatar});

avatarFormValidator.enableValidation();
userFormValidator.enableValidation();
cardFormValidator.enableValidation();

const handleCardClick = (item) => {
  new PopupWithImage(item, settings.slideType).open();
};

const handleLikeToggle = (evt, cardLike, cardId, counter ) => {
  if (evt.target.classList.contains(cardLike)) {
    api.deleteLike(cardId)
      .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .then(data => counter.textContent = data.likes.length)//setCounter(data.likes.length))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  } else {
    api.putLike(cardId)
      .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .then(data => counter.textContent = data.likes.length)//setCounter(data.likes.length))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  evt.target.classList.toggle(cardLike);
}

function renderLoading(isLoading, form) {
  const button = form.querySelector(settings.buttonSave);
  isLoading ? button.innerHTML ='Сохранение...' : button.innerHTML ='Сохранить';
} 

const saveUser = (evt, val) => {
  evt.preventDefault();
  renderLoading(true, editForm);
  const {name, profession} = val;
  const obj = {name: name.value, about: profession.value};
  api.patchUser({
    name: obj.name,
    about: obj.about
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .then(data => userInfo.setUserInfo(data))
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(renderLoading(false, editForm));
}

const saveCard = (evt, val) => {
  evt.preventDefault();
  renderLoading(true, addForm);
  const {name, link} = val;
  const obj = {name: name.value, link: link.value};

  api.postCard(obj)
    .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .then((data) => {
      const card = new Card({item: data, cardTemplate: settings.cardTemplate,
        handleCardClick: handleCardClick, handleLikeToggle:handleLikeToggle, api: api, userId });
      const cardElement = card.createCard();
      defaultCardList.addItem(cardElement);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(renderLoading(false, addForm));
}

function saveAvatar(evt, val) {
  evt.preventDefault();
  renderLoading(true, editAvatarForm);
  const {avatar} = val;
  api.patchAvatar({avatar: avatar.value})
    .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
    .then((data) => userInfo.setUserAvatar(data))
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(renderLoading(false, editAvatarForm));
}

const cardPopupWithForm = new PopupWithForm({submit: saveCard, popupSelector: settings.popupTypeAdd});
const userPopupWithForm = new PopupWithForm({submit: saveUser, popupSelector: settings.popupTypeEdit});
const avatarPopupWithForm = new  PopupWithForm({submit: saveAvatar, popupSelector: '.popup_type_edit-avatar'});

function openEditAvatarPopup() {
  avatarFormValidator.resetValidation();
  avatarPopupWithForm.open();
}

function openEditCardPopup() {
  userFormValidator.resetValidation();
  api.getUser()
  .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
  .then((data) => {
    inputName.value = data.name;
    inputProfession.value = data.about;
    userPopupWithForm.open();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}

function openAddCardPopup() {
  cardFormValidator.resetValidation();
  cardPopupWithForm.open();
}
api.getUser()
  .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
  .then((data) => {
    userId = data._id;
    userInfo.setUserInfo({name: data.name, about: data.about, avatar: data.avatar});
    userInfo.setUserAvatar({name: data.name, about: data.about, avatar: data.avatar});
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

api.getInitialCards()
  .then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
  .then((initialCards) => {
    defaultCardList = new Section({
      items: initialCards,
      renderer: (item) => {
          const card = new Card({item: item, cardTemplate: settings.cardTemplate,
            handleCardClick: handleCardClick, handleLikeToggle:handleLikeToggle, api: api, userId });
          const cardElement = card.createCard();
          defaultCardList.addItem(cardElement);
        }
      },
      cardListSelector
    );
    defaultCardList.render();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

editButton.addEventListener('click', openEditCardPopup);
addButton.addEventListener('click', openAddCardPopup);
editAvatar.addEventListener('click', openEditAvatarPopup);