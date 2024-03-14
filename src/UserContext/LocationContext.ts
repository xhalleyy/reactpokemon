import { createContext } from "react";
import { IPokeLocation } from "../interfaces/interface";

type locContextType = {
    location: IPokeLocation[] | undefined,
    setLocation: React.Dispatch<React.SetStateAction<IPokeLocation[] | undefined>> 
}

const locationContext = createContext<locContextType | null>(null);

export default locationContext;