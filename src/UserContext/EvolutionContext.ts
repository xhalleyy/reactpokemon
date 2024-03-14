import React, { createContext } from "react";
import { IEvolution } from "../interfaces/interface";

type EvolContextType = {
    evolution: IEvolution | undefined,
    setEvolution: React.Dispatch<React.SetStateAction<IEvolution | undefined>>
    evolutionLine: string[]
    setEvolutionLine: React.Dispatch<React.SetStateAction<string[]>>
}

const EvolContext = createContext<EvolContextType | null>(null);

export default EvolContext;