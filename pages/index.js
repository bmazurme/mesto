
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const addButton = document.querySelector('.profile__add');
const editButton = document.querySelector('.profile__edit');
const formEdit = document.querySelector('.form_type_edit');
const formAdd = document.querySelector('.form_type_add');
const slide = document.querySelector('.slide');
const nameFormEdit = formEdit.querySelector('.form__input_type_name');
const professionFormEdit = formEdit.querySelector('.form__input_type_profession');
const nameFormAdd = formAdd.querySelector('.form__input_type_name');
const linkFormAdd = formAdd.querySelector('.form__input_type_link');
const popupTypeSlide = document.querySelector('.popup_type_slide');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const closeButtonSlide = popupTypeSlide.querySelector('.popup__close');
const closeButtonEdit = popupTypeEdit.querySelector('.popup__close');
const closeButtonAdd = popupTypeAdd.querySelector('.popup__close');
const popupContainer = document.querySelector('.popup__container');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.elements');

function cardToSubscribe() {
  Array.from(getLikeButtons()).forEach(item => {return item.addEventListener("click", likeToggle);});
  Array.from(getRemoveButtons()).forEach(item => {return item.addEventListener("click", deleteCard);});
  Array.from(getImages()).forEach(item => {return item.addEventListener("click", openImage);});
}
// block form
function closeForm(evt) {
  const currentElement = evt.target.parentElement.parentElement;
  currentElement.classList.remove('popup_active', 'popup_image');
  slide.classList.remove('slide_active');
}
function editForm() {
  nameFormEdit.value = profileName.textContent;
  professionFormEdit.value = profileProfession.textContent;
  formEdit.addEventListener('submit', saveProfileForm);
  popupTypeEdit.classList.add('popup_active');
  formEdit.classList.add('form_active');
}
function addForm() {
  formAdd.addEventListener('submit', saveCardForm);
  nameFormAdd.value = '';
  linkFormAdd.value = '';
  popupTypeAdd.classList.add('popup_active');
  formAdd.classList.add('form_active');
}
function openImage(evt) {
  const currentElement = evt.target.parentElement;
  const currentGroup = currentElement.querySelector('.element__group');
  const currentImage = currentElement.querySelector('.element__image');
  const name = currentGroup.querySelector('.element__name');
  formName = slide.querySelector('.slide__name');
  const slideImage = slide.querySelector('.slide__image');
  slideImage.src= currentImage.src ;
  slideImage.alt = name.textContent;
  formName.textContent = name.textContent;
  popupTypeSlide.classList.add('popup_image', 'popup_active');
  slide.classList.add('slide_active');
}
function saveProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameFormEdit.value;
  profileProfession.textContent = professionFormEdit.value;
  popupTypeEdit.classList.remove('popup_active');
}
// block buttons
function getImages() {
  return document.getElementsByClassName('element__image');
}
function getLikeButtons() {
  return document.getElementsByClassName('element__like');
}
function getRemoveButtons() {
  return document.getElementsByClassName('element__remove');
}
function likeToggle(event) {
  const val = event.target.classList;
  val.contains('element__like_checked') ? val.remove('element__like_checked') : val.add('element__like_checked');
}
// block cards
function createCard(item) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = item.link;
  cardElement.querySelector('.element__name').textContent = item.name;
  cardElement.querySelector('.element__image').alt = item.name;
  return cardElement;
}
function deleteCard(evn) {
  evn.target.closest('.element').remove();
  context = Array.from(document.getElementsByClassName('element'));
}
function addCard(card) {
  context = [createCard(card)].concat(context);
  context.forEach(element => { return cardsContainer.append(element); });
  cardToSubscribe();
}
function saveCardForm(evt) {
  evt.preventDefault();
  let newCard = {
    name: nameFormAdd.value,
    link: linkFormAdd.value};
  addCard(newCard);
  popupTypeAdd.classList.remove('popup_active');
  formEdit.classList.remove('form_active');
  formAdd.classList.remove('form_active');
}
// generate content
let context = initialCards.map(item => { return createCard(item);});
context.forEach(element => { return cardsContainer.append(element);});
cardToSubscribe();
editButton.addEventListener('click', editForm);
addButton.addEventListener('click', addForm);
closeButtonSlide.addEventListener('click', closeForm);
closeButtonEdit.addEventListener('click', closeForm);
closeButtonAdd.addEventListener('click', closeForm);

// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];
// let formElement;
// let saveButton;
// let formName;
// let formValue;
// const addButton = document.querySelector('.profile__add');
// const editButton = document.querySelector('.profile__edit');
// const closeButton = document.querySelector('.popup__close');
// const popup = document.querySelector('.popup');
// const popupContainer = document.querySelector('.popup__container');
// const profileName = document.querySelector('.profile__name');
// const profileProfession = document.querySelector('.profile__profession');
// const formTemplate = document.querySelector('#form-template').content;
// const cardTemplate = document.querySelector('#card-template').content;
// const slideTemplate = document.querySelector('#slide-template').content;
// const cardsContainer = document.querySelector('.elements');

// const cardToSubscribe = () => {
//   Array.from(getLikeButtons()).forEach(item => {return item.addEventListener("click", likeToggle);});
//   Array.from(getRemoveButtons()).forEach(item => {return item.addEventListener("click", deleteCard);});
//   Array.from(getImages()).forEach(item => {return item.addEventListener("click", openImage);});
// }
// // block form
// const closeForm = () => popup.classList.remove('popup_active', 'popup_image');
// const editForm = () => {
//   if (formElement != null) {formElement.remove()};
//   formElement = formTemplate.querySelector('.form').cloneNode(true);
//   formElement.querySelector('.form__title').textContent = 'Редактировать профиль';
//   formName = formElement.querySelector('.form__input_type_name');
//   formValue = formElement.querySelector('.form__input_type_value');
//   formName.value = profileName.textContent;
//   formValue.value = profileProfession.textContent;
//   formName.placeholder = 'Имя';
//   formValue .placeholder = 'Профессия';
//   formValue .name = 'profession';
//   formElement.name = 'edit-form';
//   saveButton = formElement.querySelector('.form__save');
//   formElement.addEventListener('submit', saveProfileForm);
//   popupContainer.append(formElement);
//   popup.classList.add('popup_active');
// }
// const addForm = () => {
//   if (formElement != null) {formElement.remove()};
//   formElement = formTemplate.querySelector('.form').cloneNode(true);
//   formElement.querySelector('.form__title').textContent = 'Новое место';
//   formName = formElement.querySelector('.form__input_type_name');
//   formProfession = formElement.querySelector('.form__input_type_value');
//   formName.value = '';
//   formProfession.value = '';
//   formName.placeholder = 'Название';
//   formProfession .placeholder = 'Ссылка на картинку';
//   formProfession.name = 'link';
//   formElement.name = 'add-form';
//   saveButton = formElement.querySelector('.form__save');
//   formElement.addEventListener('submit', saveCardForm);
//   popupContainer.append(formElement);
//   popup.classList.add('popup_active');
// }
// const openImage = (evt) => {
//   if (formElement != null) {formElement.remove()};
//   const currentElement = evt.target.parentElement;
//   const currentGroup = currentElement.querySelector('.element__group');
//   const currentImage = currentElement.querySelector('.element__image');
//   const name = currentGroup.querySelector('.element__name');
//   formElement = slideTemplate.querySelector('.slide').cloneNode(true);
//   formName = formElement.querySelector('.slide__name');
//   let slideImage = formElement.querySelector('.slide__image');
//   slideImage.src= currentImage.src ;
//   slideImage.alt = name.textContent;
//   formName.textContent = name.textContent;
//   popupContainer.append(formElement);
//   popup.classList.add('popup_image', 'popup_active');
// }
// const saveProfileForm = (evt) => {
//   evt.preventDefault();
//   profileName.textContent = formName.value;
//   profileProfession.textContent = formValue.value;
//   popup.classList.remove('popup_active');
// }
// // block buttons
// const getImages = () => document.getElementsByClassName('element__image');
// const getLikeButtons = () => document.getElementsByClassName('element__like');
// const getRemoveButtons = () => document.getElementsByClassName('element__remove');
// const likeToggle = (event) => {
//   const val = event.target.classList;
//   val.contains('element__like_checked') ? val.remove('element__like_checked') : val.add('element__like_checked');
// }
// // block cards
// const createCard = (item) => {
//   const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
//   cardElement.querySelector('.element__image').src = item.link;
//   cardElement.querySelector('.element__name').textContent = item.name;
//   cardElement.querySelector('.element__image').alt = item.name;
//   return cardElement;
// }
// const deleteCard = (evn) => {
//   evn.target.closest('.element').remove();
//   context = Array.from(document.getElementsByClassName('element'));
// }
// const addCard = (card) => {
//   context = [createCard(card)].concat(context);
//   context.forEach(element => { return cardsContainer.append(element); });
//   cardToSubscribe();
// }
// const saveCardForm = (evt) => {
//   evt.preventDefault();
//   let newCard = {
//     name: formElement.querySelector('.form__input_type_name').value,
//     link: formElement.querySelector('.form__input_type_value').value};
//   addCard(newCard);
//   popup.classList.remove('popup_active');
// }
// // generate content
// let context = initialCards.map(item => { return createCard(item);});
// context.forEach(element => { return cardsContainer.append(element);});
// cardToSubscribe();
// editButton.addEventListener('click', editForm);
// addButton.addEventListener('click', addForm);
// closeButton.addEventListener('click', closeForm);