export class Card {
  constructor(item) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
  }

  _getCurrentSlide() {
    const popupTypeSlide = document.querySelector('.popup_type_slide');
    return popupTypeSlide;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector('#card-template').content;
    return cardTemplate;
  }

  // Block change of visibility state
  _openPopup(popup) {
    document.addEventListener('keydown', (evt) => this._keydownEsc(popup, evt));
    popup.classList.add('popup_active');
  } 

  _closePopup(popup) {
    document.removeEventListener('keydown', (evt) => this._keydownEsc(popup, evt));
    popup.classList.remove('popup_active');
  }

  _likeToggle(event) {
    event.target.classList.toggle('element__like_checked');
  }

  _deleteCard(evn) {
    evn.target.closest('.element').remove();
  }
  
  createCard() {
    const cardElement = this._getTemplate().querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const deleteButton = cardElement.querySelector('.element__remove');
    const likeButton = cardElement.querySelector('.element__like');
    cardImage.addEventListener("click", () => this._openImagePopup(cardElement));
    cardElement.querySelector('.element__name').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    deleteButton.addEventListener("click", this._deleteCard);
    likeButton.addEventListener("click", this._likeToggle);

    return cardElement;
  }

// Block initial values of forms
  _openUserProfilePopup() {
    nameformUserProfile.value = profileName.textContent;
    professionformUserProfile.value = profileProfession.textContent;
    openPopup(popupTypeEdit);
  }

  _openAddCardPopup() {
    formAddCard.reset();
    lockButton(saveButton, config.inactiveButtonClass);
    openPopup(popupTypeAdd); 
  }

  _openImagePopup() {
    const currentSlide = this._getCurrentSlide();
    currentSlide.querySelector('.slide__name').textContent = this._name;
    const slideImage = currentSlide.querySelector('.slide__image');
    slideImage.src = this._link;
    slideImage.alt = this._name;
    this._openPopup(this._getCurrentSlide());
  }

// Block 
  saveProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameformUserProfile.value;
    profileProfession.textContent = professionformUserProfile.value;
    closePopup(popupTypeEdit);
  }

  saveCardForm(evt) {
    evt.preventDefault();
    const newCard = {
      name: nameFormAddCard.value,
      link: linkFormAddCard.value
    };
    const element = createCard(newCard);
    cardsContainer.prepend(element);
    closePopup(popupTypeAdd);
  }

  _keydownEsc(popup, evt) {
    if (evt.key === 'Escape') {
      this._closePopup(popup);
    }
  }
}