import { useState } from "react";
import { IPokemon } from "../interfaces/interface"

const PokeHooks = () => {

  const [pokemon, setPokemon] = useState<IPokemon>();

  return {pokemon, setPokemon}
}

export default PokeHooks
