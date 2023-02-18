 
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './komponente/Login';
import Dokumenta from './komponente/Dokumenta';
import Admin from './komponente/Admin';

function App() {
  return (
      <BrowserRouter  >
 
      <Routes>
        <Route path="/" element={<Login ></Login>}></Route>
        <Route path="/dokumenta" element={<Dokumenta ></Dokumenta>}></Route>
        <Route path="/admin" element={<Admin ></Admin>}></Route>
      
      
      </Routes>

  </BrowserRouter>
  );
}

export default App;
