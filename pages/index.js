let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let saveButton = document.querySelector('.form__save');
let form = document.querySelector('.form');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let formName = form.querySelector('.form__input_type_name');
let formProfession = form.querySelector('.form__input_type_profession');

function openForm() {
  formName.value = profileName.textContent;
  formProfession.value = profileProfession.textContent;
  popup.classList.add('popup_active');
}

function closeForm() {
  popup.classList.remove('popup_active');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileProfession.textContent = formProfession.value;
  popup.classList.remove('popup_active');
}

form.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);

//let cover = document.querySelector('.popup__container');
//popup.addEventListener('keyup', (event)=>{if (event.keyCode === 13) {saveForm()}});
//popup.addEventListener('click', overlayClick);
// function overlayClick(e) {
//   if(!cover.contains(e.target)) {
//     closeForm();
//   }
// }
// let likeButtons = document.getElementsByClassName('element__like');
// for(var i = 0; i < likeButtons.length; i++) {
//   likeButtons[i].addEventListener("click", likeChange);
// }
// function likeChange(event) {
//   if (event.target.classList.contains('element__like_checked')) {
//     event.target.classList.remove('element__like_checked');
//   } else {
//     event.target.classList.add('element__like_checked');
//   }
// }