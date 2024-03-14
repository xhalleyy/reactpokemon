import { useState } from "react";
import { IPokeLocation, IPokemon } from "../interfaces/interface"

const PokeHooks = () => {

  const [pokemon, setPokemon] = useState<IPokemon>();

  const [location, setLocation] = useState<IPokeLocation[]>();

  return {pokemon, setPokemon, location, setLocation}
}

export default PokeHooks
