import PokeTrainer from './poketrainer.js';
import { loadHeaderFooter } from './utils.js';

const UID = window.localStorage.getItem('id');
//const ulElement = document.getElementById('team');

loadHeaderFooter();

const pokemonTrainer = new PokeTrainer(UID);

pokemonTrainer.init();
