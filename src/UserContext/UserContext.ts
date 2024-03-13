import { createContext } from "react";
import { IPokemon } from "../interfaces/interface";
import PokeHooks from "../Hooks/PokeHooks";

type userContextType = {
    pokemon: IPokemon | undefined,
    setPokemon: React.Dispatch<React.SetStateAction<IPokemon | undefined>>
}
// Create a new context object called UserContext using createContext
// Create Context: when created, it can be the type IPokemon OR NULL
const UserContext = createContext<userContextType | null>(null);

export default UserContext;