import {
  loadHeaderFooter
} from './utils.js';
import {
  db
} from './firebase';
const id = window.localStorage.getItem('id');
// const addButton = document.getElementById('addToTeam');
let pokemonId = 0;
let pokemonType = '';
let addButton = null;

loadHeaderFooter();
export default class PokeDetails {
  constructor(pokemonId, dataSource) {
    this.pokemonId = pokemonId;
    this.pokemon = {};
    this.abilities = [];
    this.types = [];
    this.dataSource = dataSource;
  }
  async init() {
    this.pokemon = await this.dataSource.findPokemonById(this.pokemonId);
    pokemonId = this.pokemon.id;
    pokemonType = this.pokemon.types[0].type.name;
    this.getPokeAbilities();
    this.getPokeTypes();
    this.getPokeStats();
    if (this.types.length > 1) {
      document.querySelector('main').innerHTML = this.renderPokeDetails();
      addButton = document.getElementById('addToTeam');
      addButton.addEventListener('click', addPokemon);
    } else {
      document.querySelector('main').innerHTML = this.renderPokeDetail();
      addButton = document.getElementById('addToTeam');
      addButton.addEventListener('click', addPokemon);
    }
    if (!id) {
      addButton.style.display = 'none';
    } else {
      addButton.style.display = 'block';
    }
  }

  renderPokeDetails() {

    // Image path to gif
    // <img src='${this.pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default']}' alt='${this.pokemon.name}'/>
    return `<section class='pokemon-detail'>
      <h1 class='divider'>${this.pokemon.name.replace('-', ' ')}</h1>
      <div class='imagenB'>
      <img src='${this.pokemon['sprites']['other']['official-artwork']['front_default']}' alt='${this.pokemon.name}' style='background-image: linear-gradient(135deg, var(--${this.types[0]}) 50%,  var(--${this.types[1]}) 50%);'/>
      </div>
      <p>Abilities: <span class='pokemon-card__abilities'>${this.abilities}</span></p>

      <div class='tipos'> <p>Type: <a href='http://localhost:5173/pokelist/index.html?type=${this.types[0]}' class='pokemon__types Type ${this.types[0]}'>${this.types[0]}</a>
      <a href='http://localhost:5173/pokelist/index.html?type=${this.types[1]}' class='pokemon__types Type ${this.types[1]}'>${this.types[1]}</a>
      </p>
      </div>

      <div id='container'>
      <canvas id='myChart' style='width:100%;max-width:600px'></canvas>
      </div>
      <p class='pokemon__description'>The description goes here</p>
      <div class='pokemon-detail__teamSelect'>
      <p> Select a Team:
        <select id="teamSelect">
            <option value="team1">Team 1</option>
            <option value="team2">Team 2</option>
            <option value="team3">Team 3</option>
        </select>
      </p>
      </div>
      <div class='pokemon-detail__add'>
      <button  id='addToTeam' data-id='${this.pokemon.Id}' class='glow-button'>
      <span class='btnText'>Add to Team</span>
      </button>
      </div></section>`;
  }

  renderPokeDetail() {
    return `<section class='pokemon-detail'> 
      <h1 class='divider'>${this.pokemon.name.replace('-', ' ')}</h1>
      <div class='imagenB'>
      <img class='${this.types[0]}' src='${this.pokemon['sprites']['other']['official-artwork']['front_default']}' alt='${this.pokemon.name}'/>
      </div>
      
      <p>Abilities: <span class='pokemon-card__abilities'>${this.abilities}</span></p>

      <div class='tipos'> 
      <p>Type: <a href='http://localhost:5173/pokelist/index.html?type=${this.types[0]}' class='pokemon__types Type ${this.types[0]}'>${this.types[0]}</a>
      </p></div>

      <div id='container'>
      <canvas id='myChart' style='width:100%;max-width:600px'></canvas>
      </div>

      <p class='pokemon__description'>The description goes here</p>
      <div class='pokemon-detail__teamSelect'>
      <p> Select a Team:
          <select id="teamSelect">
            <option value="team1">Team 1</option>
            <option value="team2">Team 2</option>
            <option value="team3">Team 3</option>
          </select>
      </p>
      </div>
      <div class='pokemon-detail__add'>
      <button id='addToTeam' data-id='${this.pokemon.Id}' class='glow-button'>
      <span class='btnText'>Add to Team</span>
      </button>
      </div>
      
      </section>`;
  }

  getPokeAbilities() {
    this.abilities = this.pokemon.abilities.map((item) =>
      item.ability.name.replace('-', ' ')
    );
  }

  abilitiesTemplate(ability) {
    return `
      <li>
          <h4 class='abilities'>${ability.name}</h4>
      </li>
      `;
  }

  getPokeTypes() {
    this.types = this.pokemon.types.map((item) => item.type.name);
  }

  typesTemplate(type) {
    return `
      <li>
          <h4 class='types Type ${type.name}'>${type.name}</h4>
      </li>
      `;
  }

  getPokeStats() {
    this.stats = this.pokemon.stats.map((item) => item.base_stat);
    this.statsNames = this.pokemon.stats.map((item) =>
      item.stat.name.replace('-', ' ')
    );
    return this.stats;
  }

  renderList(list, template, outputId) {
    const element = document.querySelector(outputId);

    element.innerHTML = '';
    const htmlString = list.map((item) => template(item));
    element.innerHTML = htmlString.join('');
  }

}


async function addPokemon() {

  // Get the value from the select element on the page
  const selectElement = document.querySelector('#teamSelect');
  const team = selectElement.value;

  // Check if team is full
  const pokemonIds = [];
  await db
    .collection(`users/${id}/${team}`)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        pokemonIds.push(item.pokemonId);
        // console.log(item.pokemonId);
        // console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  console.log(`This is the detail page pokemonIDs ${pokemonIds}`);
  if (pokemonIds.length >= 6) {
    alert('Your team is full. Consider deleting a member first.');
  } else {
    // Add the pokemon to the correct team
    await db.collection('users').doc(id).collection(team).doc(String(pokemonId)).set({
      pokemonId: pokemonId,
      pokemonType: pokemonType
    });
    alert(`Added pokemon to team`);
  }
}

async function deletePokemon() {
  await db.collection('users').doc(id).collection('team1').doc(String(pokemonId)).delete({
    pokemonId: pokemonId,
    pokemonType: pokemonType
  });
}
