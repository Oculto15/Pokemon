import { db } from "./firebase";
import { loadHeaderFooter } from './utils.js';

const UID = window.localStorage.getItem('id');
const ulElement = document.getElementById('team')

loadHeaderFooter();

async function getTeam(){
    const pokemonIds = [];
    
    await db.collection('users').doc(UID).collection('team').get().then(result=> {
        result.forEach(async id => {
            let info = await id.data();
            pokemonIds.push(info);
        });
    })

    const pokemonTeam = await pokemonIds.map(grabData);
        
        
    // })
    console.log(pokemonTeam);
    return pokemonTeam;
}

async function grabData(id){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.pokemonId}`);
    const data = await res.json().name;
    // const pokemonName = data.name;
    // console.log(pokemonName);
    return data;
}

async function displayTeam() {
    const pokemons = await getTeam();

    console.log(pokemons);
    pokemons.forEach((pokemon, index) => {
        if (index <= 5) {
            const item = document.createElement('li');
            item.innerHTML = pokemon;
            ulElement.append(item);
        }
    });
}

displayTeam()

