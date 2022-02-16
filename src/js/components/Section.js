export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  render() {
    this._clear();
    this._items.reverse().forEach((item) => {
      this.addItem(item)
    });
  }

  addItem(item) {
    const card = this._renderer(item)
    this._container.prepend(card);
  }
}