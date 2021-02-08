import './styles/menu.css'
import './cards.js'
import {cards} from  './cards.js'
import './Category_cards.js'
import { categoryCardsContainer } from './Category_cards.js'
import './Item_cards.js'
import { setOfCards } from './Item_cards.js';

export const menu = {
    elements: {
        menu : null,
        menuBtn  : null,
        ticker : null,
        list : null,
        span1 : null,
        span2 : null,
        span3 : null,
    },

    init () {
        
        let listItemArray = ['Main page'];
        cards[0].forEach(element => {
            listItemArray.push(element.word);
        });
  
         // создаем элементы
         this.elements.menu = document.createElement('div');
         this.elements.ticker = document.createElement('input');
         this.elements.menuBtn = document.createElement('label');
         this.elements.span1 = document.createElement('span');
         this.elements.span2 = document.createElement('span');
         this.elements.span3 = document.createElement('span');
         this.elements.list = document.createElement('ul');

         //добавляем классы и атрибуты
        
        this.elements.menu.classList.add('menu');
        this.elements.ticker.classList.add('hidden-menu-ticker');
        this.elements.ticker.setAttribute('type', 'checkbox');
        this.elements.ticker.setAttribute('id', 'hmt');
        this.elements.menuBtn.classList.add('btn-menu');
        this.elements.menuBtn.setAttribute('for', 'hmt');
        this.elements.span1.classList.add('first');
        this.elements.span2.classList.add('second');
        this.elements.span3.classList.add('third');
        this.elements.list.classList.add('hidden-menu');
        
        // добавляем элементы в DOM
        const navigation = document.querySelector('.menu');

        navigation.appendChild(this.elements.menu);
        this.elements.menu.appendChild(this.elements.ticker);
        this.elements.menu.appendChild(this.elements.menuBtn);
        this.elements.menuBtn.appendChild(this.elements.span1);
        this.elements.menuBtn.appendChild(this.elements.span2);
        this.elements.menuBtn.appendChild(this.elements.span3);
        this.elements.menu.appendChild(this.elements.list);
        this.elements.list.appendChild(this._createReferenes(listItemArray));

        let checker = document.querySelector('.hidden-menu-ticker');
        
       document.addEventListener('click', (e) => {
           let menuBar = document.querySelector('.hidden-menu');
           let target = e.clientX;
           if (target > menuBar.clientWidth) {
                checker.checked = true;
                if (checker.checked) {
                    console.log("disappeared");
                    checker.checked = false;
                }
           }
       })
        
    },
    _createReferenes(array) {
        const fragment = document.createDocumentFragment();

        array.forEach(element => {
            const reference = document.createElement('li');
            reference.classList.add('reference');
            reference.textContent = element;

            fragment.appendChild(reference);

            let checker = document.querySelector('.hidden-menu-ticker');
            switch (element) {
                case 'Main page':
                    reference.addEventListener('click', () => {
                        let arr = document.querySelectorAll('.activated');
                        arr.forEach(element => {
                            element.classList.remove('activated');
                        });
                        reference.classList.add('activated');
                        categoryCardsContainer.remove();
                        categoryCardsContainer.init(); 
                        
                        checker.checked = true;
                        if (checker.checked) {
                            console.log("disappeared");
                            checker.checked = false;
                        }
                    });
                    break;
                default :
                    reference.addEventListener('click', () => {
                        let arr = document.querySelectorAll('.activated');
                        arr.forEach(element => {
                            element.classList.remove('activated');
                        });
                        reference.classList.add('activated');
                        categoryCardsContainer.remove();
                        setOfCards.init(element);

                        checker.checked = true;
                        if (checker.checked) {
                            console.log("disappeared");
                            checker.checked = false;
            }
                    });
                    break;
            }

        });
        return fragment;
    }
}