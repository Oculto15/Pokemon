import {
  db
} from './firebase';
import {
  loadHeaderFooter
} from './utils.js';

const UID = window.localStorage.getItem('id');
const ulElement = document.getElementById('team')

loadHeaderFooter();

async function getTeam() {
  const pokemonIds = [];
  await db.collection(`users/${UID}/team`).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      pokemonIds.push(item.pokemonId);
      console.log(item.pokemonId);
        console.log(`${doc.id} => ${doc.data()}`);
    });
  });

  console.log(pokemonIds);
  const pokemonTeam = [];
  //We must await the grabData. This requires us to use a real for loop
  for(let x in pokemonIds)
  {
    let name = await grabData(pokemonIds[x]);
    pokemonTeam.push(name);
  }
  console.log(`This is our team ${pokemonTeam}`);

  return pokemonTeam;
}

async function grabData(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  // const pokemonName = data.name;
  console.log(`This is our data ${data.name}`);
  return data.name;
}

async function displayTeam() {
  const pokemons = await getTeam();

  console.log(`These are our pokemon ${pokemons}`);
  pokemons.forEach((pokemon, index) => {
    if (index <= 5) {
      const item = document.createElement('li');
      item.innerHTML = pokemon;
      ulElement.append(item);
    }
  });
}

displayTeam();
