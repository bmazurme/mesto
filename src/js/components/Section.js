import { Card } from "./Card";
import { settings } from "../config";

export class Section {
  constructor({items, renderer}, containerSelector, handleCardClick, handleLikeToggle, handleCardDelete, userId) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    this._handleCardClick = handleCardClick,
    this._handleLikeToggle = handleLikeToggle,
    this._popupWithConfirm = handleCardDelete,
    this._userId = userId
  }

  _clear() {
    this._container.innerHTML = '';
  }

  render() {
    this._clear();
    this._items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    //const card = this._renderer(item)
    this._container.prepend(item);
  }
}