import './cards.js'
import {cards} from  './cards.js'
import './card_item_class.js'
import { CardItem } from './card_item_class.js';
import './Category_cards.js'
import './winArrayItem_class.js'
import './Category_cards.js'
import { categoryCardsContainer } from './Category_cards.js'


export const setOfCards = {
    elements : {
        container: null,
        gameBtn: null,
        starsBox: null,

    },

    properties: {
        cardBack: false,
        gameOption: null,
    },

    init(state) {
        let cardsArray = [];
        let index = cards[0].findIndex(i => i.word === state);
        index++;
        cards[index].forEach(element => {
        cardsArray.push(new CardItem(element.word, element.translation, element.image, element.audioSrc))
    });

     // создаем элементы
    
    this.elements.container = document.createElement('div');
    this.elements.starsBox = document.createElement('div');
    this.elements.gameBtn = document.createElement('button');

    //добавляем классы и атрибуты
    this.elements.starsBox.classList.add('stars-box');
    this.elements.gameBtn.classList.add('game-button', 'start');
    this.elements.gameBtn.textContent = "Start the game";

    // добавляем элементы в DOM
    const container = document.querySelector('.container');
    container.appendChild(this._createCards(cardsArray));

    
    // добавляем выбор Игры
    const gameOption = document.querySelector('.game-checkbox');
    if (gameOption.checked == true) {
        this._createBaseElementsForGame(cardsArray);
    };

    gameOption.addEventListener('click', () => {
        this.remove();
        this._createBaseElementsForGame(cardsArray);
            
    });
    },

    _createBaseElementsForGame(cardsArray) {
        const gameOption = document.querySelector('.game-checkbox');
        document.querySelector('.slider').textContent = 'PLAY';
        if (gameOption.checked == true) {
            this.remove();

            document.querySelector('.container').appendChild(this._createGameCards(cardsArray));

            const wrapper = document.querySelector('.main-wrapper');

            wrapper.appendChild(this.elements.starsBox);
            wrapper.appendChild(this.elements.gameBtn);

            document.querySelector('.start').addEventListener('click', () => {
                document.querySelector('.start').remove();

                let repeatBtn = document.createElement('button');
                repeatBtn.textContent = "Repeat";
                repeatBtn.classList.add('game-button-repeat');
                repeatBtn.classList.add('game-button');

                wrapper.appendChild(repeatBtn);

                this._game(cardsArray);
            })
            
        }
           
        else
        {
            this.remove();
            document.querySelector('.slider').textContent = 'TRAIN';
            document.querySelector('.container').appendChild(this._createCards(cardsArray));
        }

    },

   _sound(audioSrc) {
        let audio = new Audio();
        audio.src = audioSrc;
        audio.autoplay = true;        
},

    _createCards(cardsArray) {
        const fragment = document.createDocumentFragment();

        cardsArray.forEach(element => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');

             //front side of card
            const cardBody = document.createElement('div');
            const cardBodyImg = document.createElement('img');
            const cardBodyFooter = document.createElement('div');
            const cardBodyText = document.createElement('p');
            const cardButton = document.createElement('button');
            const cardButtonImage = document.createElement('img');
            const front = document.createElement('div');
           
            cardBody.appendChild(cardBodyImg);
            cardBody.appendChild(cardBodyFooter);
            cardBodyFooter.appendChild(cardBodyText);
            cardBodyFooter.appendChild(cardButton);
            cardButton.appendChild(cardButtonImage);
            front.appendChild(cardBody);

            cardBody.classList.add('front-body');
            cardBodyText.textContent = element.word;
            const imageSource = element.image;
            cardBodyImg.setAttribute('src', `${imageSource}`);
            cardButtonImage.setAttribute('src', './assets/img/pngegg.png');
            cardButton.classList.add('card-button');
            cardBodyFooter.classList.add('card-footer');
            front.classList.add('front');
            cardBodyImg.classList.add('body-img');


            //back side of card
            const back = document.createElement('div');
            back.classList.add('back');
            back.classList.add('back-inactive');
            back.textContent = element.translation;

            cardElement.appendChild(front);
            cardElement.appendChild(back);
            back.setAttribute("tabindex", "1");

           

            fragment.appendChild(cardElement);

            cardButton.addEventListener('click', () => { 
               back.classList.add("focused");
                front.style.transform = 'rotateY(180deg)';
                
                setTimeout(() => front.classList.toggle("front-inactive"), 500);
                setTimeout(() => back.classList.toggle("back-inactive"), 500);
            });
            front.addEventListener('click', () => {
                this._sound(element.audioSrc);
            });

            cardElement.onmouseleave = function() {
               console.log("weird");
               let temp = null;
               if (temp = document.querySelector('.focused')) {

                    temp.classList.toggle('focused'); 
                    front.style.transform = 'rotateY(360deg)';
                    setTimeout(() => front.classList.toggle('front-inactive'), 500);
                    setTimeout(() => back.classList.toggle('back-inactive'), 500);
               }
            };
        });

        return fragment;
    },

    _createGameCards(cardsArray) {
        const fragment = document.createDocumentFragment();

        cardsArray.forEach(element => {
            //создаем элементы
            const cardElement = document.createElement('div');
            
            cardElement.classList.add('card');
            cardElement.classList.add('card-game');
            const front = document.createElement('div');
            const cardBody = document.createElement('div');
            const cardBodyImg = document.createElement('img');
            
            // добавляем классы и атрибуты
            front.classList.add('front');
            cardBody.classList.add('front-body');
            const imageSource = element.image;
            cardBodyImg.setAttribute('src', `${imageSource}`);
            cardBodyImg.classList.add('body-img');

            // добавляем элементы в DOM
            cardBody.appendChild(cardBodyImg);
            front.appendChild(cardBody);
            cardElement.appendChild(front);

            fragment.appendChild(cardElement);
           
        });
        return fragment;
    },

    _game(cardsArray) {
        
        this._play(cardsArray);
        
    },


    _play(cardsArray) {

        let cardsFromW = document.querySelectorAll('.body-img');
        let tempArray = cardsArray.slice();
        let nb;
        let flag;
        let audioSrc;
        let soundnb;
        let rptButton;
        let star;
        let starImg;
        let starsBoxWidth
        let starWidth = 0;
        let counter = 0;
        
        starsBoxWidth = this.elements.starsBox.getBoundingClientRect().right;

        soundnb = 7;
        // Rundom number for creating array of images for background
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
        };



        nb = getRandomIntInclusive(0, 7);
        audioSrc = cardsArray[nb].audioSrc;

        this._sound(audioSrc);

        rptButton = document.querySelector('.game-button-repeat');
        rptButton.addEventListener('click', () => {
        this._sound(audioSrc);
        })

        

        cardsFromW.forEach(element => {
            element.addEventListener('click', () => {
                    flag = soundnb;
                    counter++;
                    
                    if (element.getAttribute('src') == tempArray[nb].image) {
                        let img = tempArray[nb].image;
                        let ind = cardsArray.findIndex(el => el.image === img);
                        cardsArray[ind].checked = true;
                        tempArray.splice(nb, 1);
                        soundnb--;
                        element.classList.add('deactivated')
                        let parent1 = element.parentElement;
                        let parent2 = parent1.parentElement;
                        let parent3 = parent2.parentElement;

                        parent1.classList.add('deactivated');
                        parent2.classList.add('deactivated');
                        parent3.classList.add('deactivated');

                        let correctSound  = './assets/audio/going-up-186.mp3'
                        this._sound(correctSound);

                        star = document.createElement('div');
                        starImg = document.createElement('img');
                        star.classList.add('star');
                        starImg.setAttribute('src', './assets/img/icons8-star-100-colored.png');

                        star.appendChild(starImg);
                        if (this.elements.starsBox.firstChild) starWidth = this.elements.starsBox.lastChild.getBoundingClientRect().left;
                        if ((starsBoxWidth - 100) < starWidth) {  
                           document.querySelector('.stars-box').firstChild.remove();
                            this.elements.starsBox.appendChild(star);
                        }
                        else this.elements.starsBox.appendChild(star);

                    }
                    else {
                        
                        let errorSound = './assets/audio/argh-my-eyes-288.mp3'; 
                        this._sound(errorSound);

                        star = document.createElement('div');
                        starImg = document.createElement('img');
                        star.classList.add('star');
                        starImg.setAttribute('src', './assets/img/icons8-star-100.png');

                        star.appendChild(starImg);
                        starsBoxWidth = this.elements.starsBox.getBoundingClientRect().right;
                        if (this.elements.starsBox.firstChild) starWidth = this.elements.starsBox.lastChild.getBoundingClientRect().left;
                        if ((starsBoxWidth - 100) < starWidth) {  
                            document.querySelector('.stars-box').firstChild.remove();
                            this.elements.starsBox.appendChild(star);
                        }
                        else this.elements.starsBox.appendChild(star);

                    }
                 // Popup success and failure
                if (counter === 8 && tempArray.length === 0) {
                        const popupSucess = document.createElement('div');
                        const popup = document.createElement('div');
                        const popupContent = document.createElement('div');
                        const popupImg = document.createElement('img');
    
                        popupSucess.classList.add('overlay');
                        popupSucess.classList.add('is-blacked-out');
                        popup.classList.add('popup');
                        popupContent.classList.add('popup-content')
                        popupContent.textContent = ' You are amazing!!!';
                        popupImg.setAttribute('src', './assets/img/mirage-message-sent.png');
    
                        popupSucess.appendChild(popup);
                        popup.appendChild(popupContent);
                        popupContent.appendChild(popupImg);
    
                        document.querySelector('.main-wrapper').appendChild(popupSucess);
                        let victorySound = './assets/audio/victory-sound.mp3';
                        this._sound(victorySound);
                        setTimeout(() => this.remove(), 2000);
                        setTimeout(() => categoryCardsContainer.init(), 2010);
    
                }

                else if (counter > 8 && tempArray.length === 0) {
                    const popupFailure = document.createElement('div');
                        const popup = document.createElement('div');
                        const popupContent = document.createElement('div');
                        const popupImg = document.createElement('img');
    
                        popupFailure.classList.add('overlay');
                        popupFailure.classList.add('is-blacked-out');
                        popup.classList.add('popup');
                        popupContent.classList.add('popup-content')
                        popupContent.textContent = 'Try once more';
                        popupImg.setAttribute('src', './assets/img/mirage-bad-gateway.png');
    
                        popupFailure.appendChild(popup);
                        popup.appendChild(popupContent);
                        popupContent.appendChild(popupImg);
    
                        document.querySelector('.main-wrapper').appendChild(popupFailure);
                        let failureSound = './assets/audio/Failure-sound.mp3';
                        this._sound(failureSound);
                        setTimeout(() => this.remove(), 2000);
                        setTimeout(() => categoryCardsContainer.init(), 2010);

                }
                    
               if (flag > soundnb) {
                    nb = getRandomIntInclusive(0, soundnb);
                    
                    if (tempArray[nb]) {
                        audioSrc = tempArray[nb].audioSrc;
                        setTimeout(() => this._sound(audioSrc), 1000);
                    }
                }

                
            });
        });
    },

    remove() {
        let removed = document.querySelectorAll(".card");
        removed.forEach(element => {
            element.remove();
        });
        let removedRptBtn = document.querySelector('.game-button');
        if (removedRptBtn) removedRptBtn.remove();

        let removedStar = document.querySelectorAll('.star');
        if (removedStar) {
            removedStar.forEach(element => {
                element.remove();
            })
        };

        let removedstarsBox = document.querySelector('.stars-box');
        if(removedstarsBox) removedstarsBox.remove();

        let removedPopup = document.querySelector('.overlay');
        if (removedPopup) removedPopup.remove();
    },
}

