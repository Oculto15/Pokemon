import ExternalServices from './ExternalServices.js';
import PokeDetails from './pokedetail.js';
import { getParam } from './utils.js';

const pokemonId = getParam('pokemon');
const dataSource = new ExternalServices();

const pokemon = new PokeDetails(pokemonId, dataSource);
await pokemon.init();

async function graphStats(pokemon) {
    const xValues = [
      "HP",
      "Attack",
      "Defense",
      "Sp. Attack",
      "Sp. Defense",
      "Speed",
    ];
    const yValues = pokemon.getStats();
    yValues.push(0);
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

await graphStats(pokemon);