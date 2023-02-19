 
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './komponente/Login';
import Dokumenta from './komponente/Dokumenta';
import Admin from './komponente/Admin';
import axios from "axios";
import { useEffect, useState } from 'react';
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
function App() {

  const [dokumenta,setDokumenta] = useState([ ])

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


  return (
      <BrowserRouter  >
 
      <Routes>
        <Route path="/" element={<Login ></Login>}></Route>
        <Route path="/dokumenta" element={<Dokumenta ></Dokumenta>}></Route>
        <Route path="/admin" element={<Admin dokumenta={dokumenta}></Admin>}></Route>
      
      
      </Routes>

  </BrowserRouter>
  );
}

export default App;
