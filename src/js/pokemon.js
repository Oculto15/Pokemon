import ExternalServices from "./ExternalServices.js";
import PokeDetails from "./pokedetail.js";
import { getParam } from "./utils.js";

const pokemonId = getParam("pokemon");
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
  const yValues = pokemon.getPokeStats();
  // No need for the next line. There is an option for beginning at 0
  // yValues.push(0);
  const barColors = [];
  var i;
  for (i = 0; i < yValues.length; i++) {
    var color;
    if (yValues[i] <= 50) {
      color = "#ff0000";
    } else if (yValues[i] <= 60) {
      color = "#ff3200";
    } else if (yValues[i] <= 70) {
      color = "#ff6600";
    } else if (yValues[i] <= 80) {
      color = "#ff9800";
    } else if (yValues[i] <= 90) {
      color = "#ffcc00";
    } else if (yValues[i] <= 100) {
      color = "#fffe00";
    } else if (yValues[i] <= 110) {
      color = "#ccff00";
    } else if (yValues[i] <= 120) {
      color = "#9aff00";
    } else if (yValues[i] <= 130) {
      color = "#66ff00";
    } else if (yValues[i] <= 140) {
      color = "#34ff00";
    } else if (yValues[i] <= 150) {
      color = "#02ff2a";
    } else if (yValues[i] <= 160) {
      color = "#02ff55";
    } else if (yValues[i] <= 170) {
      color = "#02ff7f";
    } else if (yValues[i] <= 180) {
      color = "#02ffaa";
    } else {
      color = "#02ff2a";
    }
    barColors[i] = color;
  }
 
  // Chart.defaults.elements.bar.borderWidth = 2;
  
  new Chart(document.getElementById("myChart").getContext("2d"), {
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
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            // To eliminate grid lines we could use the following options
            // display:false
            // color: "rgba(0, 0, 0, 0)",
            display:false,
          }
        }],
        yAxes: [{
          gridLines: {
            display:false,
          }   
        }]
      },
      title: {
        display: true,
        text: "Pokemon Stats",
      },
    },
  });
}

await graphStats(pokemon);
