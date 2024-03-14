import './App.css';
import NavbarComponent from './components/NavbarComponent';
import UserContext from './UserContext/UserContext';
import PokeHooks from './Hooks/PokeHooks';
import BodyComponent from './components/BodyComponent';
import locationContext from './UserContext/LocationContext';
import EvolContext from './UserContext/EvolutionContext';
import SpeciesContext from './UserContext/SpeciesContext';
function App() {
  return (
    <UserContext.Provider value={PokeHooks()}>
      <locationContext.Provider value={PokeHooks()}>
        <SpeciesContext.Provider value={PokeHooks()}>
          <EvolContext.Provider value={PokeHooks()}>
            <div className='bgImg'>
              <NavbarComponent />
              <BodyComponent />
            </div>

          </EvolContext.Provider>
        </SpeciesContext.Provider>

      </locationContext.Provider>

    </UserContext.Provider>
  );
}

export default App;
