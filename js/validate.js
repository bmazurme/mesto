// import {config} from './config.js';

// const showInputError = (config, formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// };

// const hideInputError = (config, formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// };

// const checkInputValidity = (config, formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(config, formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(config, formElement, inputElement);
//   }
// };

// const setEventListeners = (config, formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);
//   toggleButtonState(config, inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(config, formElement, inputElement);
//       toggleButtonState(config, inputList, buttonElement);
//     });
//   });
// };

// function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector)); 
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(config, formElement);
//   }); 
// }

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   }); 
// }

// function toggleButtonState(config, inputList, buttonElement) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// }

// enableValidation(config); 

// export function lockButton(currentButton, valueFromObjConfig) {
//   currentButton.classList.add(valueFromObjConfig);
//   currentButton.disabled = true;
// }