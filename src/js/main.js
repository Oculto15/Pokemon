import { db } from './firebase';
import { loadHeaderFooter } from './utils.js';

const UID = window.localStorage.getItem('id');
const ulElement = document.getElementById('team')

loadHeaderFooter();

async function getTeam(){
    const pokemonIds = [];
    
    await db.collection('users').doc(UID).collection('team')
    .get()
    .then(result => {
        result.forEach(async id => {
            let info = await id.data();
            console.log(`This is our info ${info}`);
            pokemonIds.push(info);
        });
    })

    console.log(`This is  our IDs array ${pokemonIds}`); 
    const pokemonTeam = await pokemonIds.map(grabData);
    console.log(`This is our team ${pokemonTeam}`); 
        
    // })
    return pokemonTeam;
}

async function grabData(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.pokemonId}`);
    const data = await res.json();
    // const pokemonName = data.name;
    console.log(`This is our data ${data.name}`);
    return data.name;
}

async function displayTeam() {
    const pokemons = await getTeam();

    await console.log(`These are our pokemon ${pokemons}`);
    await pokemons.forEach((pokemon, index) => {
        if (index <= 5) {
            const item = document.createElement('li');
            item.innerHTML = pokemon;
            ulElement.append(item);
        }
    });
}

await displayTeam();