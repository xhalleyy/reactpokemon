import './App.css';
import NavbarComponent from './components/NavbarComponent';
import UserContext from './UserContext/UserContext';
import PokeHooks from './Hooks/PokeHooks';
import BodyComponent from './components/BodyComponent';
import locationContext from './UserContext/LocationContext';
function App() {
  return (
    <UserContext.Provider value={PokeHooks()}>
      <locationContext.Provider value={PokeHooks()}>

        <div className='bgImg'>
          <NavbarComponent />
          <BodyComponent />
        </div>
      </locationContext.Provider>

    </UserContext.Provider>
  );
}

export default App;
