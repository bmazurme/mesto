(()=>{"use strict";var e={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit",inactiveButtonClass:"form__save_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},t="#card-template",n=".element";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t){var r=t.item,o=t.cardTemplate,i=t.handleCardClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._item=r,this._cardTemplate=o,this._cardLike="element__like_checked",this._element=n,this._elementLike=".element__like",this._elementRemove=".element__remove",this._elementImage=".element__image",this._handleCardClick=i}var t,o;return t=e,(o=[{key:"_likeToggle",value:function(e){e.target.classList.toggle(this._cardLike)}},{key:"_deleteCard",value:function(e){e.target.closest(this._element).remove(),this._element=null}},{key:"_setEventListener",value:function(e,t){var n=this,r=e.querySelector(this._elementRemove),o=e.querySelector(this._elementLike);r.addEventListener("click",(function(e){return n._deleteCard(e)})),o.addEventListener("click",(function(e){return n._likeToggle(e)})),t.addEventListener("click",(function(){return n._handleCardClick(n._item)}))}},{key:"_getTemplateCard",value:function(){return document.querySelector(this._cardTemplate).content.querySelector(n).cloneNode(!0)}},{key:"createCard",value:function(){var e=this._getTemplateCard();e.querySelector(".element__name").textContent=this._item.name;var t=e.querySelector(this._elementImage);return t.src=this._item.link,t.alt=this._item.name,this._setEventListener(e,t),e}}])&&r(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._config=t,this._formElement=n}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners(this._formElement)}},{key:"resetValidation",value:function(){var e=this;this._formElement.reset();var t=Array.from(this._formElement.querySelectorAll(".".concat(this._config.errorClass))),n=Array.from(this._formElement.querySelectorAll(this._config.inputSelector)),r=this._formElement.querySelector(this._config.submitButtonSelector);this._toggleButtonState(n,r),t.forEach((function(t){e._hideError(t)}))}},{key:"_hideError",value:function(e){e.textContent=""}},{key:"_setEventListeners",value:function(e){var t=this,n=Array.from(e.querySelectorAll(this._config.inputSelector)),r=e.querySelector(this._config.submitButtonSelector);this._toggleButtonState(n,r),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,n){t._checkInputValidity(e,n)}(e,o),function(e,n){t._toggleButtonState(e,n)}(n,r)}))}))}},{key:"_toggleButtonState",value:function(e,t){this._hasInvalidInput(e)?(t.classList.add(this._config.inactiveButtonClass),t.disabled=!0):(t.classList.remove(this._config.inactiveButtonClass),t.disabled=!1)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_showInputError",value:function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(this._config.inputErrorClass),r.textContent=n,r.classList.add(this._config.errorClass)}},{key:"_hideInputError",value:function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._config.inputErrorClass),n.classList.remove(this._config.errorClass),n.textContent=""}},{key:"_checkInputValidity",value:function(e,t){t.validity.valid?this._hideInputError(e,t):this._showInputError(e,t,t.validationMessage)}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"_clear",value:function(){this._container.innerHTML=""}},{key:"render",value:function(){var e=this;this._clear(),this._items.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){var n,r,o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){(e.target.classList.contains(o._openPopup)||e.target.classList.contains(o._closePopup))&&o.close(o._popup)},(n="_handleButtonClose")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this),this._openPopup="popup_active",this._closePopup="popup__close"}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){document.addEventListener("keydown",this._handleEscClose),this._popup.addEventListener("mousedown",this._handleButtonClose)}},{key:"open",value:function(){this.setEventListeners(),this._popup.classList.add(this._openPopup)}},{key:"close",value:function(){this._popup.classList.remove(this._openPopup),this._popup.removeEventListener("mousedown",this._handleButtonClose),document.removeEventListener("keydown",this._handleEscClose)}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},d.apply(this,arguments)}function y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}function _(e,t){return _=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},_(e,t)}function h(e,t){if(t&&("object"===p(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}var v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=m(r);if(o){var n=m(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e){var t,n=e.submit,r=e.popupSelector;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,r))._popupSelector=r,t._popup=document.querySelector(t._popupSelector),t._submit=function(e,r){n(e,t._getInputValues()),t.close()},t._popup=document.querySelector(t._popupSelector),t._form=t._popup.querySelector(".form"),t}return t=a,(n=[{key:"close",value:function(){d(m(a.prototype),"close",this).call(this),this._form.reset(),this._popup.removeEventListener("submit",this._submit)}},{key:"_getInputValues",value:function(){return this._form.elements}},{key:"setEventListeners",value:function(){d(m(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",this._submit)}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function k(){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=w(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},k.apply(this,arguments)}function w(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=C(e)););return e}function E(e,t){return E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},E(e,t)}function S(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function C(e){return C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},C(e)}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&E(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=C(r);if(o){var n=C(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t))._card=e,n._popup=document.querySelector(t),n._slideImage=".slide__image",n._slideName=".slide__name",n}return t=a,(n=[{key:"open",value:function(){k(C(a.prototype),"open",this).call(this),this._image=this._popup.querySelector(this._slideImage),this._popup.querySelector(this._slideName).textContent=this._card.name,this._image.src=this._card.link,this._image.alt=this._card.name}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var P=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileName=document.querySelector(t.name),this._profileProfession=document.querySelector(t.profession)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._profileName.textContent,profession:this._profileProfession.textContent}}},{key:"setUserInfo",value:function(e){this._profileName.textContent=e.name,this._profileProfession.textContent=e.profession}}])&&j(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),L=document.querySelector(".form_type_edit"),q=document.querySelector(".form_type_add"),I=document.querySelector(".profile__add"),T=document.querySelector(".profile__edit"),R=L.querySelector(".form__input_type_name"),x=L.querySelector(".form__input_type_profession"),B=new a(e,L),V=new a(e,q),D=new P({name:".profile__name",profession:".profile__profession"});B.enableValidation(),V.enableValidation();var A=function(e){new O(e,".popup_type_slide").open()},N=new v({submit:function(e,n){e.preventDefault();var r=n.name,i=n.link,a={name:r.value,link:i.value},c=new o({item:a,cardTemplate:t,handleCardClick:A}).createCard();M.addItem(c)},popupSelector:".popup_type_add"}),U=new v({submit:function(e,t){e.preventDefault();var n=t.name,r=t.profession,o={name:n.value,profession:r.value};D.setUserInfo(o)},popupSelector:".popup_type_edit"}),M=new s({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){var n=new o({item:e,cardTemplate:t,handleCardClick:A}).createCard();M.addItem(n)}},".elements");M.render(),T.addEventListener("click",(function(){B.resetValidation();var e=D.getUserInfo();R.value=e.name,x.value=e.profession,U.open()})),I.addEventListener("click",(function(){V.resetValidation(),N.open()}))})();