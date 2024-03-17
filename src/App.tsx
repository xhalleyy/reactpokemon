import './App.css';
import NavbarComponent from './components/NavbarComponent';
import UserContext from './UserContext/UserContext';
import PokeHooks from './Hooks/PokeHooks';
import BodyComponent from './components/BodyComponent';
import locationContext from './UserContext/LocationContext';
import EvolContext from './UserContext/EvolutionContext';
import SpeciesContext from './UserContext/SpeciesContext';
import FavoritesComponent from './components/FavoritesComponent';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { getLocal } from './helpers/LocalStorageFunctions';
function App() {
  const activePokemon = useContext(UserContext);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  useEffect(()=> {
    let favPokemons = getLocal();
    if(favPokemons.includes(activePokemon?.pokemon?.name ?? 'pikachu')){
      setIsFavorited(true);
    }else{
      setIsFavorited(false);
    }
  },[activePokemon?.pokemon?.name])
  return (
    <UserContext.Provider value={PokeHooks()}>
      <locationContext.Provider value={PokeHooks()}>
        <SpeciesContext.Provider value={PokeHooks()}>
          <EvolContext.Provider value={PokeHooks()}>
            <div className='bgImg'>
              <NavbarComponent isFavorited={isFavorited} setIsFavorited={setIsFavorited} />
              <BodyComponent isFavorited={isFavorited} setIsFavorited={setIsFavorited} />

            </div>

          </EvolContext.Provider>
        </SpeciesContext.Provider>

      </locationContext.Provider>

    </UserContext.Provider>
  );
}

export default App;
