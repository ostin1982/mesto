class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = document.querySelector(selector);
    }

    renderItems() {
        this._items.forEach(item => this._renderer(item));
            };

    addItem(element, items) { 
        if (items) { 
            this._selector.append(element); 
        } else { 
            this._selector.prepend(element); 
        } 
    } 
}


export default Section;