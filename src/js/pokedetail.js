import { loadHeaderFooter } from "./utils.js";

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
    console.log(this.pokemon);
    this.getPokeAbilities();
    this.getPokeTypes();
    this.getPokeStats();
    console.log(this.abilities);
    console.log(this.types);
    console.log(this.stats);
    if (this.types.length > 1) {
      document.querySelector("main").innerHTML = this.renderPokeDetails();
    } else {
      document.querySelector("main").innerHTML = this.renderPokeDetail();
    }
  }

  renderPokeDetails() {
    // Image path to gif
    // <img src="${this.pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default']}" alt="${this.pokemon.name}"/>
    return `<section class="pokemon-detail">
      <h1 class="divider">${this.pokemon.name.replace('-', ' ')}</h1>
      <div class='imagenB'>
      <img src="${this.pokemon['sprites']['other']['official-artwork']['front_default']}" alt="${this.pokemon.name}" style="background-image: linear-gradient(135deg, var(--${this.types[0]}) 50%,  var(--${this.types[1]}) 50%);"/>
      </div>
      
      <p>Abilities: <span class="pokemon-card__abilities">${this.abilities}</span></p>

      <div class='tipos'> <p>Type: <span class="pokemon__types Type ${this.types[0]}">${this.types[0]}</span>
      <span class="pokemon__types Type ${this.types[1]}">${this.types[1]}</span>
      </p>
      </div>

      <div id="container">
      <canvas id="myChart" style="width:100%;max-width:600px"></canvas>
      </div>
      
      <p class="pokemon__description">The description goes here</p>
      <div class="pokemon-detail__add">
      <button  id="addToCart" data-id="${this.pokemon.Id}" class="${
      this.types[0]
    } glow-button">
      <span>Add to Team</span>
      </button>
      </div></section>`;
  }

  renderPokeDetail() {
    return `<section class="pokemon-detail"> 
      <h1 class="divider">${this.pokemon.name.replace('-', ' ')}</h1>
      <div class='imagenB'>
      <img class="${this.types[0]}" src="${this.pokemon['sprites']['other']['official-artwork']['front_default']}" alt="${this.pokemon.name}"/>
      </div>
      
      <p>Abilities: <span class="pokemon-card__abilities">${this.abilities}</span></p>

      <div class='tipos'> <p>Type: <span class="pokemon__types Type ${this.types[0]}">${this.types[0]}</span>
      </p></div>

      <div id="container">
      <canvas id="myChart" style="width:100%;max-width:600px"></canvas>
      </div>

      <p class="pokemon__description">The description goes here</p>
      <div class="pokemon-detail__add">
      <button id="addToCart" data-id="${this.pokemon.Id}" class="${
      this.types[0]
    } glow-button">
      <span>Add to Team</span>
      </button>
      </div></section>`;
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

    element.innerHTML = "";
    const htmlString = list.map((item) => template(item));
    element.innerHTML = htmlString.join("");
  }
}
