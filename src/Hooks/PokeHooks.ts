import { useState } from "react";
import { IEvolution, IPokeLocation, IPokemon, ISpecies } from "../interfaces/interface"

const PokeHooks = () => {

  const [pokemon, setPokemon] = useState<IPokemon>();

  const [location, setLocation] = useState<IPokeLocation[]>();

  const [species, setSpecies] = useState<ISpecies>();

  const [evolution, setEvolution] = useState<IEvolution>();
  
  const [evolutionLine, setEvolutionLine] = useState<string[]>([]);

  return {pokemon, setPokemon, location, setLocation, evolution, setEvolution, species, setSpecies, evolutionLine, setEvolutionLine}
}

export default PokeHooks
