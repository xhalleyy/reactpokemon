import './App.css';
import NavbarComponent from './components/NavbarComponent';
import UserContext from './UserContext/UserContext';
import PokeHooks from './Hooks/PokeHooks';
import BodyComponent from './components/BodyComponent';
function App() {
  return (
    <UserContext.Provider value={PokeHooks()}>

    <div className='bgImg'>
      <NavbarComponent/>
      <BodyComponent/>
    </div>
    </UserContext.Provider>
  );
}

export default App;
