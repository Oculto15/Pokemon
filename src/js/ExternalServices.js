const baseURL = 'https://pokeapi.co/api/v2/'

async function convertToJson(res) {
    const response = await res.json();
    console.log(response);
    //const JsonResp = JSON.stringify(response);
    if (res.ok) {
        return response;
    } else {
        throw {
            name: 'servicesError',
            message: response
        };
    }
}

export default class ExternalServices {
    constructor() {
    }
    getData(type) {
        // instead we will pass the category we want in here when we need it.
        return fetch(baseURL + `type/${type}`)
            .then(convertToJson).then((data) => data.pokemon);
    }

    async findPokemonById(id) {
        //const products = await this.getData()
        //return products.find((item) => item.Id === id);
        // the API allows us to pull products directly from it by ID...so we can change this method as well to take advantage of that.
        return await fetch(baseURL + `pokemon/${id}`).then(convertToJson)
            .then((data) => data);
    }

    // We need to be able to take a list of pokemon names and convert that into a list of pokemon
    async getPokemonList(list)
    {
        const newList = await Promise.all(list.map((pokemon) => this.findPokemonById(pokemon.name)));
        console.log(newList);
        return newList;
    }


}