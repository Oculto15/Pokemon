import {
  db
} from './firebase';

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
    // const fullCompleteName = document.getElementById('fullName');
    // const photo = document.getElementById('photo-profile');
    // const userName = window.localStorage.getItem('user');
    // const name = window.localStorage.getItem('full-Name');
    // const photoProfile = window.localStorage.getItem('photo-prof');
    // const firstName = document.getElementById('firstName');

    // if (userName != ' ') {
    //   firstName.innerHTML = userName;
    //   fullCompleteName.innerHTML = `Name: ${name}`;
    //   photo.src = photoProfile;
    // }
    // Check the database to see if we have collections for team 1,2,and 3
    
    // If this user does not have those collections, create them

    // Fill team 1 with its members from the db
    this.team1 = await this.getTeam(1);
    console.log(this.team1);
    const teamElement1 = document.querySelector('.team1');
    // Display team 1 data in the right place
    await this.displayTeam(teamElement1,this.team1);
    // Fill Team 2 with its members from the db
    this.team2 = await this.getTeam(2);
    console.log(this.team2);
    const teamElement2 = document.querySelector('.team2');
    // Display team 2 data in the right place
    await this.displayTeam(teamElement2, this.team2);
    // Fill team 3 with its members from the db
    this.team3 = await this.getTeam(3);
    console.log(this.team3);
    const teamElement3 = document.querySelector('.team3');
    // Display team 3 data in the right place
    await this.displayTeam(teamElement3, this.team3);
  }

  async getTeam(teamNumber) {
    const pokemonIds = [];
    await db
      .collection(`users/${this.userID}/team${teamNumber}`)
      .get()
      .then((querySnapshot) => {
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
    for (let x in pokemonIds) {
      console.log('Hi');
      let name = await this.getPokeTeamMemberData(pokemonIds[x]);
      pokemonTeam.push(name);
    }
    console.log(`This is our team ${pokemonTeam}`);

    return pokemonTeam;
  }

  async getPokeTeamMemberData(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    console.log(`This is our data ${data.name}`);
    return data.name;
  }

  async displayTeam(teamElement, team) {
    const pokemons = team;
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
