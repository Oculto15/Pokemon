import ExternalServices from './ExternalServices.js';
import PokeList from './pokelist.js';
import { loadHeaderFooter, getParam } from './utils.js';

loadHeaderFooter();

const type = getParam('type');
// first create an instance of our ProductData class.
const dataSource = new ExternalServices();
// then get the element we want the product list to render in
const listElement = document.querySelector('.pokemon-list');
// then create an instance of our ProductList class and send it the correctsinformation.
const myList = new PokeList(type, dataSource, listElement);
// finally call the init method to show our products
myList.init();