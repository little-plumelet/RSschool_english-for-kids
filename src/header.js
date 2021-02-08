export const myHeader = {
    elements : {
        wrapperHeader : null,
        menu : null,
        h1 : null,
        switchGame : null,
        inputGame : null,
        spanGame: null,
    },

init () {
// создаем элементы
this.elements.wrapperHeader = document.createElement('div');

this.elements.menu = document.createElement('div');

this.elements.h1 = document.createElement('h1');
this.elements.h1.textContent = 'English for kids';

this.elements.switchGame = document.createElement('label');
this.elements.inputGame = document.createElement('input');
this.elements.spanGame = document.createElement('span');

//добавляем классы
this.elements.wrapperHeader.classList.add('wrapper');
this.elements.menu.classList.add('menu');
this.elements.switchGame.classList.add('switch');
this.elements.inputGame.setAttribute('type', 'checkbox');
this.elements.inputGame.classList.add('game-checkbox');
this.elements.spanGame.classList.add('slider');
this.elements.spanGame.classList.add('round');


this.elements.spanGame.textContent = 'TRAIN';

// добавляем элементы в DOM
const header = document.querySelector('header');

header.appendChild(this.elements.wrapperHeader);
this.elements.wrapperHeader.appendChild(this.elements.menu);
this.elements.wrapperHeader.appendChild(this.elements.h1);
this.elements.wrapperHeader.appendChild(this.elements.switchGame);
this.elements.switchGame.appendChild(this.elements.inputGame);
this.elements.switchGame.appendChild(this.elements.spanGame);
    }
}