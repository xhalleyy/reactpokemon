import { createContext } from "react";
import { ISpecies } from "../interfaces/interface";

type SpeciesContextType = {
    species: ISpecies | undefined,
    setSpecies: React.Dispatch<React.SetStateAction<ISpecies | undefined>>
}

const SpeciesContext = createContext<SpeciesContextType | null>(null);

export default SpeciesContext