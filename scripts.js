const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    for(let item of items.querySelectorAll('.item')){
      const checkbox = item.querySelector('.item__checkbox');
      checkbox.addEventListener('click', finish);

      const text = item.querySelector('.item__text');
      text.addEventListener('click', edit);

      const button = item.querySelector('.item__button');
      button.addEventListener('click', deleteItem);
    }
    console.log(_items);
  }

    // TODO láta hluti í _items virka
  function formHandler(e) {
    e.preventDefault();

    //console.log('halló heimur');
    const input = e.target.querySelector('.form__input');

    if (input.value.trim().length > 0) {
      add(input.value);
      input.value = "";
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const {target} = e;
    const {textContent, parentNode} = target;

    parentNode.removeChild(target);

    const input = el('input', 'item__edit'); 
    input.setAttribute('type', 'text'); 
    input.value = textContent;
    console.log(input.value);
    input.addEventListener('keyup',commit); 

    const button = parentNode.querySelector('.item__button');

    parentNode.insertBefore(input, button);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if(event.keyCode === 13){
      console.log(e.target);

      const newText = e.target.value;
      const parentNode = e.target.parentNode;
      parentNode.removeChild(e.target);
      
      newTextEl = el('span', 'item__text', edit);
      newTextEl.appendChild(document.createTextNode(newText));
      
      const button = parentNode.querySelector('.item__button');

      parentNode.insertBefore(newTextEl, button);
      
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {

    const newItem = el('li', 'item');

    const newCheckbox = el('input', 'item__checkbox', finish);
    newCheckbox.setAttribute('type', 'checkbox'); 

    const newText = el('span', 'item__text', edit);
    newText.appendChild(document.createTextNode(value));

    const newButton = el('button', 'item__button', deleteItem);
    newButton.appendChild(document.createTextNode('Eyða'));

    items.appendChild(newItem);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newText);
    newItem.appendChild(newButton);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const {target} = e;
    const {textContent, parentNode} = target;

    parentNode.remove(target);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    var newElement = document.createElement(type); 
    if(className) {
      newElement.classList.add(className); 
    }
    if(clickHandler) {  
      newElement.addEventListener('click', clickHandler);
    }
    return newElement;  
  }

  return {
    init: init
  }
})();