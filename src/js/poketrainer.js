import {
  db
} from './firebase';

const id = window.localStorage.getItem('id');
// const addButton = document.getElementById('addToTeam');
let pokemonId = 0;
let pokemonType = '';
let deleteButton = null;

export default class PokeTrainer {
  constructor(userID) {
    this.userID = userID;
    this.trainerName = ' ';
    this.trainerAge = ' ';
    this.trainerGender = ' ';
    this.trainerClass = 'Beginner';
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
      fullCompleteName.innerHTML = `Name: ${name}`;
      photo.src = photoProfile;
    }
    // Check the database to see if we have collections for team 1,2,and 3
    
    // If this user does not have those collections, create them

    // Fill team 1 with its members from the db
    this.team1 = await this.getTeam(1);
    // console.log(this.team1);
    const teamElement1 = document.querySelector('.team1');
    // Display team 1 data in the right place
    await this.displayTeam(teamElement1,this.team1);
    // Fill Team 2 with its members from the db
    this.team2 = await this.getTeam(2);
    // console.log(this.team2);
    const teamElement2 = document.querySelector('.team2');
    // Display team 2 data in the right place
    await this.displayTeam(teamElement2, this.team2);
    // Fill team 3 with its members from the db
    this.team3 = await this.getTeam(3);
    // console.log(this.team3);
    const teamElement3 = document.querySelector('.team3');
    // Display team 3 data in the right place
    await this.displayTeam(teamElement3, this.team3);

    // Chaging the team name with double click
    const teamName1 = document.querySelector('#team1-title');
    teamName1.addEventListener('dblclick', this.changeTeamName);

    deleteButton = document.querySelector('.deletePokemon');
    deleteButton.addEventListener('click', this.deletePokemon);
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
          // console.log(item.pokemonId);
          // console.log(`${doc.id} => ${doc.data()}`);
        });
      });

    // console.log(pokemonIds);
    const pokemonTeam = [];
    //We must await the grabData. This requires us to use a real for loop
    for (let x in pokemonIds) {
      // console.log('Hi');
      let pokemon = await this.getPokeTeamMemberData(pokemonIds[x]);
      pokemonTeam.push(pokemon);
    }
    // console.log(`This is our team ${pokemonTeam}`);

    return pokemonTeam;
  }

  async getPokeTeamMemberData(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    // console.log(`This is our data ${data.name}`);
    return data;
  }

  async displayTeam(teamElement, team) {
    const pokemons = team;
    // console.log(`These are our pokemon ${pokemons}`);
    pokemons.forEach((pokemon, index) => {
      if (index <= 5) {

        // Created the main div
        const divMain = document.createElement('div');

        // We create the div for the pokemon card
        const div1 = document.createElement('div');
        div1.classList.add('poke-border');
        div1.classList.add(`small-card`);

        const li = document.createElement('li');
        li.classList.add(`pokemon-card`); 
        li.classList.add(`pokemon-card-small`);
        if (pokemon.types.length > 1) {
          const type1 = pokemon.types[0].type.name;
          const type2 = pokemon.types[1].type.name;
          li.style.backgroundImage = 'linear-gradient(122deg, var(--' + type1 + ') 50%,  var(--' + type2 + ') 50%)';
        }
        else {
          li.classList.add(pokemon.types[0].type.name);
        }

        const a = document.createElement('a');
        a.href += `http://localhost:5173/pokedetails/index.html?pokemon=${pokemon.id}`;

        const img = document.createElement('img');
        if (pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] == null) {
          img.src = pokemon['sprites']['versions']['generation-v']['black-white']['front_default'];
          console.log('This gif is null');
        }
        else {
          img.src = pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
        img.alt += pokemon.name;

        const nameLink = document.createElement('a');
        nameLink.href += `http://localhost:5173/pokedetails/index.html?pokemon=${pokemon.id}`;
        const name = document.createElement('p');
        name.innerHTML = `${pokemon.name.replace('-', ' ')}`;

        // We create a second div for the option to delete Pokemon
        const div2 = document.createElement('div');
        div2.classList.add('deleteFromTeam');
        
        const deleteLink = document.createElement('a');
        deleteLink.classList.add(`deletePokemon`); 
        deleteLink.href += `${pokemon.id}`;
        const deletePokemon = document.createElement('p');
        deletePokemon.innerHTML = `Delete from Team`;

        // We append everthing here
        deleteLink.append(deletePokemon);
        div2.append(deleteLink); 

        a.append(img);
        li.append(a);
        nameLink.append(name);
        li.append(nameLink);
        div1.append(li);

        teamElement.append(divMain);
        divMain.append(div1);
        divMain.append(div2);

      }
    });
  }

  async  deletePokemon() {
    await db.collection('users').doc(id).collection('team1').doc(String(pokemonId)).delete({
      pokemonId: pokemonId,
      pokemonType: pokemonType
    });
  }

  changeTeamName() {
    
  }
  
}
