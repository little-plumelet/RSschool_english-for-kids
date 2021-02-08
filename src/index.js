import './styles/main.css'
import './styles/header.css'
import './styles/card.css'
import './styles/popup.css'
import './header.js'
import './navigation-menu.js'
import './footer.js'
import './Item_cards.js'
import { myHeader } from './header.js'
import { myFooter } from './footer.js';

import './Category_cards.js'
import './cards.js'
import './card_category_class.js'
import { categoryCardsContainer } from './Category_cards.js'
import { menu } from './navigation-menu'
import './winArrayItem_class.js'

myHeader.init();
menu.init();
myFooter.init();
categoryCardsContainer.init();
console.log ("Hello World");