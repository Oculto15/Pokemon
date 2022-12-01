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

    // add listener to My Team button
    // document.getElementById('addToCart')
    //     .addEventListener('click', this.addToCart.bind(this));
  }
  // addToCart() {
  //     const cartanim = document.querySelector('#cart-animation');
  //     cartanim.classList.add('cart-animate');
  //     // setInterval(cartanim.classList.remove('cart-animate'), 2000);
  //     // clearInterval();
  //     setTimeout(function () {
  //         cartanim.classList.remove('cart-animate')
  //     }, 2000);
  //     // to fix the cart we need to get anything that is in the cart already.
  //     let cartContents = getLocalStorage('so-cart');
  //     //check to see if there was anything there
  //     if (!cartContents) {
  //         cartContents = [];
  //     }
  //     // then add the current pokemon to the list
  //     cartContents.push(this.pokemon);
  //     setLocalStorage('so-cart', cartContents);
  //     updateCartNumber();

  // }
  renderPokeDetails() {
    return `<section class="pokemon-detail">
      <h1 class="divider">${this.pokemon.name.replace("-", " ")}</h1>
 
      <img
      class="divider" style="background-image: linear-gradient(135deg, var(--${
        this.types[0]
      }) 50%,  var(--${this.types[1]}) 50%);"
      src="${
        this.pokemon["sprites"]["other"]["official-artwork"]["front_default"]
      }"
      alt="${this.pokemon.name}"
      />
      
      <p class="pokemon-card__abilities">${this.abilities}</p>

      <p class="pokemon__types Type ${this.types[0]}">${this.types[0]}</p>
      <p class="pokemon__types Type ${this.types[1]}">${this.types[1]}</p>

      <div id="container">
      <canvas id="myChart" style="width:100%;max-width:600px"></canvas>
      </div>
      <ul class="stats">
        <li>HP: ${this.stats[0]}</li>
        <li>Attack: ${this.stats[1]}</li>
        <li>Defense: ${this.stats[2]}</li>
        <li>Spe. Attack: ${this.stats[3]}</li>
        <li>Spe. Defense: ${this.stats[4]}</li>
        <li>Speed: ${this.stats[5]}</li>
      </ul>
      
      <p class="pokemon__description">${this.pokemon.name.replace("-", " ")}</p>
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
      <h1 class="divider">${this.pokemon.name.replace("-", " ")}</h1>
      <img
        class="divider ${this.types[0]}"
        src="${
          this.pokemon["sprites"]["other"]["official-artwork"]["front_default"]
        }"
        alt="${this.pokemon.name}"
      />
      <p>Abilities: <span class="pokemon-card__abilities">${
        this.abilities
      }</span></p>

      <p>Type: <span class="pokemon__types Type ${this.types[0]}">${
      this.types[0]
    }</p>
      
      <div id="container"></div>
      <ul class="stats">
        <li>${this.statsNames[0]}: ${this.stats[0]}</li>
        <li>Attack: ${this.stats[1]}</li>
        <li>Defense: ${this.stats[2]}</li>
        <li>Spe. Attack: ${this.stats[3]}</li>
        <li>Spe. Defense: ${this.stats[4]}</li>
        <li>Speed: ${this.stats[5]}</li>
      </ul>

      // <p class="pokemon__description">${this.pokemon.name}</p>
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
      item.ability.name.replace("-", " ")
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
      item.stat.name.replace("-", " ")
    );
  }

  getStats() {
    return this.stats;
  }

  graphStats() {
    const xValues = [
      "HP",
      "Attack",
      "Defense",
      "Sp. Attack",
      "Sp. Defense",
      "Speed",
    ];
    const yValues = [43, 45, 200, 34, 180, 140, 0];
    const barColors = ["red", "green", "blue", "orange", "brown", "purple"];

    new Chart(document.getElementById("myChart"), {
      type: "horizontalBar",
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: barColors,
            data: yValues,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Stats",
        },
      },
    });
  }

  renderList(list, template, outputId) {
    const element = document.querySelector(outputId);

    element.innerHTML = "";
    const htmlString = list.map((item) => template(item));
    element.innerHTML = htmlString.join("");
  }
}
