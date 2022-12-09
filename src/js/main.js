import {
  loadHeaderFooter
} from './utils.js';


loadHeaderFooter();

function searchPokemon(){
  const searchValue = document.querySelector('#searchName').value;

  window.location.href = `http://localhost:5173/pokedetails/index.html?pokemon=${searchValue}`; 

}

document.querySelector('#btnSearch').addEventListener('click', searchPokemon);


