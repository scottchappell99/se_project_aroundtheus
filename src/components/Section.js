export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._elementContainer = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element, placement) {
    if (placement === "append") {
      this._elementContainer.append(element);
    } else if (placement === "prepend") {
      this._elementContainer.prepend(element);
    }
  }
}
