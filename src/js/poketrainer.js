import {
  db
} from './firebase';
import {
  loadHeaderFooter
} from './utils.js';

export default class PokeTrainer {
  constructor(userID) {
    this.userID = userID;
    this.trainerName = ' ';
    this.trainerAge = ' ';
    this.trainerGender = ' ';
    this.trainerClass = ' ';
    this.team1 = [];
    this.team2 = [];
    this.team3 = [];
  }

  async init() {

    // If there is trainer data in local storage add it to the correct UI elements
    const fullCompleteName = document.getElementById('fullName');
    const photo = document.getElementById('photo-profile');
    const userName = window.localStorage.getItem('user');
    const name = window.localStorage.getItem('full-Name');
    const photoProfile = window.localStorage.getItem('photo-prof');
    const firstName = document.getElementById('firstName');

    if (userName != ' ') {
      firstName.innerHTML = userName;
      fullCompleteName.innerHTML = `Name: ${name}`;
      photo.src = photoProfile;
    }
    // Check the database to see if we have collections for team 1,2,and 3
    
    // If this user does not have those collections, create them

    // Fill team 1 with its members from the db
    // Display team 1 data in the right place

    // Fill Team 2 with its members from the db
    // Display team 2 data in the right place

    // Fill team 3 with its members from the db
    // Display team 3 data in the right place
  }

  async getTeam(teamNumber) {
    const pokemonIds = [];
    await db
      .collection(`users/${this.userID}}/team${teamNumber}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          pokemonIds.push(item.pokemonId);
          // console.log(item.pokemonId);
          // console.log(`${doc.id} => ${doc.data()}`);
        });
      });

    //console.log(pokemonIds);
    const pokemonTeam = [];
    //We must await the grabData. This requires us to use a real for loop
    for (let x in pokemonIds) {
      let name = await this.getPokeTeamMemberData(pokemonIds[x]);
      pokemonTeam.push(name);
    }
    //console.log(`This is our team ${pokemonTeam}`);

    return pokemonTeam;
  }

  async getPokeTeamMemberData(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    // const pokemonName = data.name;
    // console.log(`This is our data ${data.name}`);
    return data.name;
  }

  async displayTeam(teamElement) {
    const pokemons = await this.getTeam();
    // console.log(`These are our pokemon ${pokemons}`);
    pokemons.forEach((pokemon, index) => {
      if (index <= 5) {
        const item = document.createElement('li');
        item.classList.add('pokemonList');
        item.innerHTML = `- ${pokemon}`;
        teamElement.append(item);
      }
    });
  }
}
