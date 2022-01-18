class FormValidator {
  constructor() {
  }

  enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector)); 
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(config, formElement);
    }); 
  }

  _setEventListeners(config, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    this._toggleButtonState(config, inputList, buttonElement)
    const checkInputValidity = (config, formElement, inputElemen) => this._checkInputValidity(config, formElement, inputElemen);
    const toggleButtonState = (config, inputList, buttonElement) => this._toggleButtonState(config, inputList, buttonElement)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(config, formElement, inputElement);
        toggleButtonState(config, inputList, buttonElement);
      });
    });
  };

  _toggleButtonState(config, inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }

  _showInputError (config, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };
  
  _hideInputError (config, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };
  
  _checkInputValidity (config, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(config, formElement, inputElement);
    }
  };
}
export const formValidator = new FormValidator();

export function lockButton(currentButton, valueFromObjConfig) {
  currentButton.classList.add(valueFromObjConfig);
  currentButton.disabled = true;
}