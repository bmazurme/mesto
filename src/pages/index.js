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

const editAvatarForm = document.querySelector(settings.formEditAvatar);
const editForm = document.querySelector(settings.editForm);
const editAvatar = document.querySelector(settings.profileImage);
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

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};
enableValidation(config);

const popupWithImage = new PopupWithImage(settings.slideType);
const userInfo = new UserInfo({
  name: settings.profileName,
  about: settings.profileProfession,
  avatar: settings.avatar
});

const handleCardClick = (item) => {
  popupWithImage.open(item);
};

const handleLikeToggle = (evt, card) => {
  if (evt.target.classList.contains(card._cardLike)) {
    api.changeLike(card._item._id, false)
      .then(data => {
        evt.target.classList.toggle(card._cardLike);
        card._counter.textContent = data.likes.length
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  } else {
    api.changeLike(card._item._id, true)//(cardId)
      .then(data => {
        evt.target.classList.toggle(card._cardLike);
        card._counter.textContent = data.likes.length
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
  api.patchUser({ name: obj.name, about: obj.about })
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
      cardList.addItem(data);
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
  .then(() => {
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
const avatarPopupWithForm = new PopupWithForm({submit: saveAvatar, popupSelector: settings.popupEditAvatar});
const popupWithConfirm = new PopupWithConfirm({submit: deleteCardCallback, popupSelector: settings.popupModal});

function openEditAvatarPopup() {
  formValidators[ editAvatarForm.getAttribute('name') ].resetValidation()
  avatarPopupWithForm.open();
}

function openEditCardPopup() {
  formValidators[ editForm.getAttribute('name') ].resetValidation()
  const {name, about} = userInfo.getUserInfo();
  inputName.value = name;
  inputProfession.value = about;
  userPopupWithForm.open();
}

function openAddCardPopup() {
  formValidators[ addForm.getAttribute('name') ].resetValidation()
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