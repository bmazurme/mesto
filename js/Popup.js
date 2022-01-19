// export class BasePopup {
//   constructor() {
    
//   }

//   _keydownEsc(popup, evt) {
//     if (evt.key === 'Escape') {
//       this.closePopup(popup);
//     }
//   }
  
//   openPopup(popup) {
//     document.addEventListener('keydown', 
//       (evt) => this._keydownEsc(popup, evt));
//     popup.classList.add('popup_active');
//   }
  
//   closePopup(popup) {
//     document.removeEventListener('keydown', 
//       (evt) => this._skeydownEsc(popup, evt));
//     popup.classList.remove('popup_active');
//   }

//   getCloseButton(popup, popupClose) {
//     return popup.querySelector(popupClose);
//   }

//   getSaveButton(form, formSave) {
//     return form.querySelector(formSave);
//   }
// }