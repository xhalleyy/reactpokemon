import pokeLocation from "../interfaces/interface";

// API calls
const pokemonApi = async (pokemon: string) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data: object = await promise.json();
    return data;
}

const locationApi = async (location: string) => {
    const promise = await fetch(location);
    const data: pokeLocation = await promise.json();
    return data;
}

const speciesApi = async (species: string) => {
    const promise = await fetch(species);
    const data: object = await promise.json();
    return data;
}

const evolutionApi = async (evolution: string) => {
    const promise = await fetch(evolution);
    const data: object = await promise.json();
    return data;
}