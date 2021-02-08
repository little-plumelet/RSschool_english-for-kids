import './styles/card.css'
import './cards.js'
import {cards} from  './cards.js'
import './card_category_class.js'
import { CardCategory } from './card_category_class.js';
import './Item_cards.js'
import { setOfCards } from './Item_cards.js';

export const categoryCardsContainer = {
    elements : {
        wrapperContainer : null,
        container: null,
        catCardsArray : [],
    },
    
    init() {
        let categoryCardsArray = [];
        cards[0].forEach(element => {
        categoryCardsArray.push(new CardCategory(element.word, element.img))
    });

        categoryCardsArray.forEach(element => {
            this.elements.catCardsArray.push(element);
        });

     // создаем элементы
    this.elements.wrapperContainer = document.createElement('div');
    this.elements.container = document.createElement('div');

    //добавляем классы и атрибуты
    this.elements.wrapperContainer.classList.add('wrapper');
    this.elements.wrapperContainer.classList.add('main-wrapper');
    this.elements.container.classList.add('container');

    // добавляем элементы в DOM
    const main = document.querySelector('main');

    main.appendChild(this.elements.wrapperContainer);
    this.elements.wrapperContainer.appendChild(this.elements.container);
    this.elements.container.appendChild(this._createCards(categoryCardsArray));

     // добавляем выбор Игры
     const gameOption = document.querySelector('.game-checkbox');
     gameOption.addEventListener('click', () => {
 
       
        if (gameOption.checked == true) {
            document.querySelector('.slider').textContent = 'PLAY';
            document.querySelectorAll('.card-category').forEach(element => {
               element.classList.add('card-game');
            }); 
        
        }
        else {
            document.querySelector('.slider').textContent = 'TRAIN';
            document.querySelectorAll('.card-category').forEach(element => {
                element.classList.remove('card-game');
            }); 
        }
    });

    },

    remove() {
        let removed = document.querySelectorAll(".card");
        removed.forEach(element => {
            element.remove();
        });
        
    },

    _createCards(categoryCardsArray) {
        const fragment = document.createDocumentFragment();

        categoryCardsArray.forEach(element => {
           
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.classList.add('card-category');

            const cardbody = document.createElement('div');
            cardbody.classList.add('category');
            const cardBodyText = document.createElement('p');
            const cardBodyImg = document.createElement('img');
            cardBodyImg.classList.add('body-img');
            
            cardbody.appendChild(cardBodyImg);
            cardbody.appendChild(cardBodyText);
            cardElement.appendChild(cardbody);

            cardBodyText.textContent = element.state;
            const imageSource = element.image;
            cardBodyImg.setAttribute('src', `${imageSource}`);


            

            fragment.appendChild(cardElement);

            cardElement.addEventListener('click', () => {
                    let arr = document.querySelectorAll('.activated');
                            arr.forEach(element => {
                                element.classList.remove('activated');
                            });
                    let refArr = document.querySelectorAll('.reference');
                    refArr.forEach(element => {
                        if (element.textContent == cardElement.textContent) {
                            element.classList.add('activated');
                        }
                    })
                            
                    this.remove();
                    setOfCards.init(element.state);
               
            })

        })

        return fragment;
    },
}