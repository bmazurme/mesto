import {config} from './config.js';

const showInputError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formElement, inputElement);
  }
};

const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(config, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); 
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);
  }); 
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}

function toggleButtonState(config, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

enableValidation(config); 

// Для блокировки кнопок не нужно обращаться к функции toggleButtonState. 
// Задача текущей функции, просто повесить стиль и атрибут disabled на 
// кнопку переданной в параметр формы.  Без лишних проверок, поисков полей 
// ввода. Это простой инструмент блокировки без какой-либо логики. Вешать 
// слушатели события чтобы эта функция срабатывала на клик тоже не стоит.
// Функцию нужно будет вызвать в index.js  в теле функции openAddPopup.        ---  index.js - openAddCardPopup - lockButton(saveButton, config.inactiveButtonClass)
                                                                                    // import {lockButton} from './validate.js';

// Обращаться к кнопкам в validate.js не нужно. Относитесь к файлу 
// validate как к сторонней библиотеке. В нее можно передать только 
// объект настроек при вызове enableValidation() и обратиться к функции        --- lockButton
// блокировки кнопок отправки.  Файл validate должен быть как бы независимым 
// модулем и не должен зависить от внешнего контекста, т.е. от того какие 
// кнопки есть в приложении и так далее. Должна быть возможность взять этот 
// файл и внедрить в другой проект изменив только классы в объекте настроек.

// Нужно создать отдельную функцию блокировки кнопки в validate.js,            ---  lockButton
// которая будет вызываться при открытии модального окна добавления карточки.  
// Функция должна принимать на вход кнопку формы и класс заблокированной       ---  currentButton valueFromObjConfig
// кнопки из объекта конфигурации для валидации. Функция навешивает класс      ---  currentButton.classList.add(valueFromObjConfig)
// блокировки и атрибут disabled на кнопку.                                    ---  currentButton.disabled = true

export function lockButton(currentButton, valueFromObjConfig) {
  currentButton.classList.add(valueFromObjConfig);
  currentButton.disabled = true;
}