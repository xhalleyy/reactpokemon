import { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext/UserContext'
import { evolutionApi, locationApi, pokemonApi, speciesApi } from '../services/DataServices';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';
import locationContext from '../UserContext/LocationContext';
import SpeciesContext from '../UserContext/SpeciesContext';
import EvolContext from '../UserContext/EvolutionContext';

const BodyComponent = () => {

  const activePokemon = useContext(UserContext);
  const activeLocation = useContext(locationContext);
  const activeSpecies = useContext(SpeciesContext);
  const activeEvolution = useContext(EvolContext);
  const [pikachuEvo, setPikachuEvo] = useState<string[]>(['pichu → pikachu → raichu'])
  const [shiny, setShiny] = useState<boolean>(false);



  useEffect(() => {
    const pikachu = async () => {
      activePokemon?.setPokemon(await pokemonApi("pikachu"))
    }

    const location = async () => {
      activeLocation?.setLocation(await locationApi("https://pokeapi.co/api/v2/pokemon/25/encounters"))
    }

    const species = async () => {
      activeSpecies?.setSpecies(await speciesApi("https://pokeapi.co/api/v2/pokemon-species/25/"))
    }

    const evolution = async () => {
      activeEvolution?.setEvolution(await evolutionApi("https://pokeapi.co/api/v2/evolution-chain/10/"))
    }
    
    pikachu();
    location();
    species();
    evolution();

    
    

  }, [])

  const toggleShiny = () => {
    setShiny(shiny => !shiny);
  }

  const defaultClass: string = 'inline-block bg-blue-200 px-8 mx-5 mt-5 font-kodchasan-medium text-lg xl:text-xl rounded-2xl';
  const shinyClass: string = 'inline-block bg-yellow-200 px-8 mx-5 mt-5 font-kodchasan-medium text-lg xl:text-xl rounded-2xl';


  return (
    <div className='grid grid-cols-5 mt-5'>
      <div className='lg:col-span-2 col-span-5'>
        <div className='md:ms-20 lg:me-0 md:me-20 lg:mb-8 ms-5 me-5 bg-white/90 rounded-lg drop-shadow-xl'>
          <div className='grid grid-cols-2 px-10 items-center pt-3'>
            <div className='col-span-1 flex justify-start'>
              <h1 className='font-kodchasan-semi text-4xl xl:text-6xl'>{`${activePokemon?.pokemon?.name.charAt(0).toUpperCase()}${activePokemon?.pokemon?.name.slice(1)}`}</h1>
            </div>
            <div className='col-span-1 flex justify-end'>
              <svg className='xl:w-12 w-8 cursor-pointer'
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960">
                <path
                  d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
              </svg>
            </div>
          </div>
          <div>
            <p className={!shiny ? defaultClass : shinyClass}>{!shiny ? 'Default' : 'Shiny'}</p>
          </div>\
          <div className='flex justify-center'>
            <img 
              src={!shiny ? activePokemon?.pokemon?.sprites.other['official-artwork'].front_default : activePokemon?.pokemon?.sprites.other['official-artwork'].front_shiny} 
              alt="" className='xl:h-96 cursor-pointer'
              onClick={toggleShiny}
              />
          </div>
          <div className='flex lg:justify-start justify-center'>
            <p className='inline-block bg-pink-200 px-8 mx-5 mt-2 mb-5 font-kodchasan-medium text-lg xl:text-xl rounded-2xl'>{activePokemon?.pokemon?.types.map(pokeEl => pokeEl.type.name).join(", ")}</p>
          </div>
        </div>
      </div>
      <div className='lg:col-span-3 col-span-5 lg:me-20 lg:ms-10 md:ms-10 md:me-10 ms-5 me-5 mt-5 lg:mt-0'>
        <Accordion className='bg-pink-200/95 rounded-lg drop-shadow-xl'>
          <AccordionPanel className='rounded-lg'>
            <AccordionTitle className='font-kodchasan-medium !text-black !py-3 text-xl lg:text-2xl xl:text-3xl'>Abilities</AccordionTitle>
            <AccordionContent aria-labelledby="accordion-flush-heading-1" className='!py-5'>
              <div className=''>
                <p className="font-kodchasan-reg md:text-xl xl:text-2xl text-gray-800 dark:text-gray-400">
                  {activePokemon?.pokemon?.abilities.map(pokeAbility => pokeAbility.ability.name).join(", ")}
                </p>
              </div>
            </AccordionContent>

          </AccordionPanel>
          <AccordionPanel className='rounded-lg'>
            <AccordionTitle className='font-kodchasan-medium !text-black !py-3 text-xl lg:text-2xl xl:text-3xl'>Moves</AccordionTitle>
            <AccordionContent>
              <p className="font-kodchasan-reg xl:text-xl text-gray-800 dark:text-gray-400">
                {activePokemon?.pokemon?.moves.map(pokeMoves => pokeMoves.move.name).join(", ").replaceAll('-', ' ')}
              </p>

            </AccordionContent>
          </AccordionPanel>
          <div className='px-5 py-3'>
            <h2 className='font-kodchasan-medium text-xl lg:text-2xl xl:text-3xl text-gray-800'>Location</h2>
            <p className='font-kodchasan-reg md:text-xl xl:text-2xl text-gray-800 dark:text-gray-400 pt-2'>
              {activeLocation?.location && activeLocation?.location.length > 0 ? activeLocation?.location[0].location_area.name : 'Unknown'}
            </p>
          </div>
        </Accordion>
        <div className='bg-sky-200 rounded-lg lg:my-8 my-5'>
          <div className='px-5 py-3 font-kodchasan-medium text-xl lg:text-2xl xl:text-3xl text-gray-800 dark:text-gray-400'>
            Evolution Paths
            <p className='font-kodchasan-reg lg:text-xl xl:text-2xl text-gray-800 dark:text-gray-400 py-3'>
             
              {activeEvolution?.evolutionLine.length ? activeEvolution?.evolutionLine.join(", ")  : pikachuEvo}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BodyComponent
