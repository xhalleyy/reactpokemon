import title from '../assets/title.png';
import pokeball from '../assets/pokeballtab.png';
import './Pokemon.css';
import { useContext, useState } from 'react';
import { evolutionApi, locationApi, pokemonApi, speciesApi } from '../services/DataServices';
import UserContext from '../UserContext/UserContext';
import locationContext from '../UserContext/LocationContext';
import EvolContext from '../UserContext/EvolutionContext';
import SpeciesContext from '../UserContext/SpeciesContext';
import FavoritesComponent from './FavoritesComponent';

type NavbarComponentProps = {
  isFavorited: boolean
  setIsFavorited: React.Dispatch<React.SetStateAction<boolean>>
}
const NavbarComponent = ({isFavorited, setIsFavorited}: NavbarComponentProps) => {
  const pokeContext = useContext(UserContext);
  const pokeLocation = useContext(locationContext);
  const speciesContext = useContext(SpeciesContext);
  const evolutionContext = useContext(EvolContext);
  const [pokeName, setPokeName] = useState<string>('');
  // const [newPokemon, setNewPokemon] = useState<IPokemon>();

  const handleReload = () => {
    window.location.reload();
  }

  const randomizedPoke = async () => {
    let randomNum: number = Math.floor(Math.random() * 650);
    const pokemonData = await pokemonApi(randomNum.toString());
    const locationData = await locationApi(pokemonData.location_area_encounters);
    const speciesData = await speciesApi(pokemonData.species.url);
    const evolutionData = await evolutionApi(speciesData.evolution_chain.url);

    pokeContext?.setPokemon(pokemonData)
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
    evolutionContext?.setEvolutionLine(evolArray);
  }


  const handleSavePoke = async () => {
    try {
      const pokemonData = await pokemonApi(pokeName.toLowerCase());
      const locationData = await locationApi(pokemonData.location_area_encounters);
      const speciesData = await speciesApi(pokemonData.species.url);
      const evolutionData = await evolutionApi(speciesData.evolution_chain.url);
      let gen: number = pokemonData.id;

      if (gen < 650) {
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

        // fetchData(pokeName)
      } else {
        alert("Please Pick a Pokemon from Gen 1-5!");
      }
    }
    catch (error) {
      alert("That wasn't a valid Pokemon! Try Again.");
    }
  }

  return (
    <div className='grid grid-cols-2 pt-5'>
      <div className='ms-6 col-span-2 lg:col-span-1 flex justify-center lg:justify-start'>
        <img
          src={title}
          alt="PokeDex title logo"
          className='xl:w-1/2 lg:w-3/5 md:w-80 w-96 cursor-pointer inline-block'
          onClick={handleReload}
        />
      </div>
      <div className='lg:col-span-1 col-span-2 flex justify-center lg:justify-end items-center'>
        <div className='tooltip' onClick={randomizedPoke}>
          <img src={pokeball} alt="Random Pokemon" className='cursor-pointer' style={{ height: '46px' }} />
          <span className='tooltiptext font-kodchasan-reg xl:text-xl text-sm md:text-xl'>Random Pokémon</span>
        </div>
        <div className='bg-white rounded-md border-2 border-black xl:ms-2'>
          <input value={pokeName} onChange={(e) => setPokeName(e.target.value)} type="text" placeholder="Enter a Pokémon" className='font-kodchasan-semi text-lg md:text-2xl lg:text-lg xl:text-3xl ps-1 xl:ps-2 py-0 text-gray-400 w-44 md:w-56 lg:w-44 xl:w-72 xl:h-9 border-0 rounded-md' />
        </div>
        <div onClick={handleSavePoke} className='cursor-pointer bg-yellow-200 border-2 border-black px-2 rounded-md mx-1 md:mx-3'>
          <p className='font-kodchasan-medium lg:text-xl xl:text-3xl text-2xl hidden lg:block'>Search</p>
          <div className='lg:hidden flex justify-center'>
            {/* need to figure out how to add material icon font */}
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
          </div>
        </div>
        <div className='lg:me-12 xl:me-14'>
          <div className='hidden lg:block'>
            <FavoritesComponent isFavorited={isFavorited} setIsFavorited={setIsFavorited} />
            {/* <button className='font-kodchasan-medium text-2xl lg:text-xl xl:text-3xl bg-sky-200 border-2 border-black px-2 rounded-md' type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
              aria-controls="drawer-example">Favorites</button> */}
          </div>
          <button className='lg:hidden font-kodchasan-medium bg-sky-200 border-2 border-black px-2 rounded-md' type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example">
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;