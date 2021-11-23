let editButton = document.querySelector('.profile-info__edit');
let closeButton = document.querySelector('.form__close');
let saveButton = document.querySelector('.form__save');
let likeButtons = document.getElementsByClassName('element__like');
let form = document.querySelector('.form');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile-info__name');
let profileProfession = document.querySelector('.profile-info__profession');
let formName = form.querySelector('.form__name');
let formProfession = form.querySelector('.form__profession');

editButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
saveButton.addEventListener('click', saveForm);
popup.addEventListener('keyup', (event)=>{if (event.keyCode === 13) {saveForm()}});

for(var i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", likeChange);
}

function likeChange(event) {
  if (event.target.classList.contains('element__like_checked')) {
    event.target.classList.remove('element__like_checked');
  } else {
    event.target.classList.add('element__like_checked');
  }
}

function openForm() {
  formName.value = profileName.innerHTML;
  formProfession.value = profileProfession.innerHTML;
  popup.classList.add('popup_active');
}

function saveForm() {
  profileName.innerHTML = formName.value;
  profileProfession.innerHTML = formProfession.value;
  popup.classList.remove('popup_active');
}

function closeForm() {
  popup.classList.remove('popup_active');
}