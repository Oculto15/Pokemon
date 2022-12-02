import {
    renderListWithTemplate
} from './utils.js';

export default class PokeList {
    constructor(type, dataSource, listElement) {
        this.type = type;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.pokemon = [];
    }

    async init() {

        // Data source returns promise so we need to wait
        const list = await this.dataSource.getData(this.type);

        // Get a list of pokemon from the datasource
        const pokename = await list.map((item) => item.pokemon);

        // Create a list of pokemon based on that name
        const newList = await this.dataSource.getPokemonList(pokename);

        this.renderList(newList);
        document.querySelector('.title').innerHTML = this.type;
    }

    renderList(list) {
        // make sure the list is empty
        this.listElement.innerHTML = '';
        //get the template
        const template = document.getElementById('pokemon-card-template');
        renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);
    }

    prepareTemplate(template, pokemon) {

        if (window.location.href.split('=')[1] == 'fire'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/fire-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'flying'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/flying-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'ice'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/ice-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'water'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/water-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'ghost'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/ghost-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'fighting'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/fighting-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'normal'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/normal-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'psychic'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/psychic-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'dark'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/dark-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'steel'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/steel-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'fairy'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/fairy-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'bug'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/bug-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'electric'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/electric-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'dragon'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/dragon-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'grass'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/grass-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'poison'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/poison-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'ground'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/ground-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        if (window.location.href.split('=')[1] == 'rock'){
            var image = document.createElement("img");
            image.setAttribute('src',"../images/rock-icon.png");
            image.classList.add("icon-abso");
            var getDiv = template.querySelector('.poke-border');
            
            getDiv.appendChild(image);
        }
        
        
        template.querySelector('li').classList.add(window.location.href.split('=')[1]);
        // template.querySelector('li').classList.add(pokemon.types[0].type.name); use this when you search for name
        template.querySelector('a').href += pokemon.id;
        template.getElementById('artwork').src = pokemon['sprites']['other']['official-artwork']['front_default'];
        template.getElementById('artwork').alt += pokemon.name;
        // if(pokemon.types.length > 1) {
        //     template.querySelector('li').style.backgroundImage = "linear-gradient(125deg, var(--" + pokemon.types[0].type.name + ") 50%,  var(--" + pokemon.types[1].type.name + ") 50%)";
        // }
        template.querySelector('.card__name').textContent = pokemon.name.replace('-', ' ');
        return template;
    }

}