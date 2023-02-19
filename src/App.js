 
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './komponente/Login';
import Dokumenta from './komponente/Dokumenta';
import Admin from './komponente/Admin';
import axios from "axios";
import { useEffect, useState } from 'react';
import Dodaj from './komponente/Dodaj';
import Izmeni from './komponente/Izmeni';
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
function App() {

  const [dokumenta,setDokumenta] = useState([ ])
  const [radovi,setRadovi] = useState([ ])

  useEffect(() => {
    const getDokumenta = async () => {
      try {
        const res = await axiosInstance.get( "http://127.0.0.1:8000/api/dokument",
          {
            headers:{'Authorization': `Bearer ${ window.sessionStorage.getItem('auth_token')}`},
          }
        );
        setDokumenta(res.data.data);
        console.log(res.data.data)
      } catch (err) {
        console.log(err);
      }
    };
    getDokumenta();
  }, [ axiosInstance]);

  useEffect(() => {
    const getRadovi = async () => {
      try {
        const res = await axiosInstance.get(  "https://openlibrary.org/subjects/it.json?limit=10",
          
        );
        console.log(res)
        setRadovi(res.data.works);
        
      } catch (err) {
        console.log(err);
      }
    };
    getRadovi();
  }, [ axiosInstance]);

  const [dokumentIzmena,setDokumentIzmena] = useState(null)

  return (
      <BrowserRouter  >
 
      <Routes>
        <Route path="/" element={<Login ></Login>}></Route>

        <Route path="/dokumenta/dodaj" element={<Dodaj ></Dodaj>}></Route>

        <Route path="/dokumenta" element={<Dokumenta radovi={radovi}></Dokumenta>}></Route>
        <Route path="/admin/izmeni" element={<Izmeni dok={dokumentIzmena}></Izmeni>}></Route>

        <Route path="/admin" element={<Admin dokumenta={dokumenta} setDokumentIzmena={setDokumentIzmena}></Admin>}></Route>
      
      
      </Routes>

  </BrowserRouter>
  );
}

export default App;
