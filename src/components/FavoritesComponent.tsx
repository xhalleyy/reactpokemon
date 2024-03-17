import { useContext, useState } from 'react'
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import { getLocal, removeFromLocal } from '../helpers/LocalStorageFunctions';
import { pokemonApi, locationApi, speciesApi, evolutionApi } from '../services/DataServices';
import EvolContext from '../UserContext/EvolutionContext';
import locationContext from '../UserContext/LocationContext';
import SpeciesContext from '../UserContext/SpeciesContext';
import UserContext from '../UserContext/UserContext';

type FavoritesComponentProps = {
  isFavorited: boolean
  setIsFavorited: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FavoritesComponent({isFavorited, setIsFavorited}: FavoritesComponentProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [renderFavs, setRenderFavs] = useState<string[]>(getLocal());
  const pokeContext = useContext(UserContext);
  const pokeLocation = useContext(locationContext);
  const speciesContext = useContext(SpeciesContext);
  const evolutionContext = useContext(EvolContext);

  const searchPokemon = async (pokeName: string) => {
    const pokemonData = await pokemonApi(pokeName);
    const locationData = await locationApi(pokemonData.location_area_encounters);
    const speciesData = await speciesApi(pokemonData.species.url);
    const evolutionData = await evolutionApi(speciesData.evolution_chain.url);


    pokeContext?.setPokemon(pokemonData);
    pokeLocation?.setLocation(locationData);
    speciesContext?.setSpecies(speciesData);
    evolutionContext?.setEvolution(evolutionData);

    let evolArray: string[] = []
    evolutionData.chain.evolves_to.map(evo => {
      if (evo.evolves_to.length > 0) {
        evo.evolves_to.map(evol2 => {
          evolArray.push(`${evolutionData.chain.species.name} → ${evo.species.name} → ${evol2.species.name}`);
        })
      } else {
        evolArray.push(evolutionData.chain.species.name + ' → ' + evo.species.name);
      }
    })
    evolutionContext?.setEvolutionLine(evolArray)
  }

  return (
    <div>
      <button className='font-kodchasan-medium text-2xl lg:text-xl xl:text-3xl bg-sky-200 border-2 border-black px-2 rounded-md' type="button" onClick={() => {
        setOpen(true)
        setRenderFavs(getLocal())
      }
      }>Favorites</button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <DialogTitle className='bg-sky-200 !m-0 pt-10 pb-5 !font-kodchasan-semi !text-2xl !xl:text-3xl !inline-flex !items-center !justify-center !text-center !text-gray-800'>Favorites</DialogTitle>
        <DialogContent className='bg-sky-200 dark:bg-gray-800 items-center'>
          {
            renderFavs.map((favPoke, idx) => {
              return (
                <div key={idx} className="grid grid-cols-2 bg-white my-5 py-1 ps-2 rounded-2xl items-center cursor-pointer">
                  <p className="font-kodchasan-medium col-span-1 text-gray-800 text-2xl" onClick={async () => {
                    searchPokemon(favPoke);
                    setOpen(false);
                  }}>
                    {favPoke}
                  </p>
                  <span className="col-span-1 cursor-pointer text-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-md w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white ml-auto me-2" onClick={() => {
                    removeFromLocal(favPoke)
                    setRenderFavs(getLocal())
                    if(pokeContext?.pokemon?.name === favPoke){
                      setIsFavorited(false)
                    }
                  }}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-440v-80h560v80H200Z" /></svg></span>
                </div>

              )
            })
          }
        </DialogContent>
      </Drawer>
    </div>
  );
}