class Section {
    constructor({items, renderer}, selector) {
        this._renderer = renderer;
        this._items = items;
        this._selector = document.querySelector(selector);
    }

    renderItems(elements) {
        elements.forEach((element) => {
            this._renderer(element)
            });
        };

    addItem(card, items) { 
        items ? 
        this._selector.prepend(card):
        this._selector.append(card);
    } 
}


export default Section;