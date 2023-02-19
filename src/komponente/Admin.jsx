 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Admin({dokumenta}) {
 
    const navigate = useNavigate();
 
    function handleLogout(){ 
     
       
      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/logoutAdmin',
        headers:{'Authorization': `Bearer ${ window.sessionStorage.getItem('auth_token')}`},
      };
   
      
      axios(config)
      .then(function (response) {
       
        console.log(response);
       
        window.sessionStorage.setItem('auth_token',null); 
        window.sessionStorage.setItem('auth_name',null); 
        window.sessionStorage.setItem('auth_id',null); 
        navigate('/');
        sessionStorage.clear();
       
  
      })
      .catch(function (error) {
       
        if (error.response) {
                
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            
            console.log(error.request);
        } else {
          
            console.log('Error', error.message);
        }
    
        
        
  
      }); 
    }
    function vratiLink(fileName){
      return "http://127.0.0.1:8000/uploads/"+fileName
    }
    return ( 
    <>
        <div className="container">
            <button className='btn btn-primary' onClick={handleLogout}> Odjavi se</button>


            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Autor</th>
                  <th scope="col">Fajl</th>
                  <th scope="col">Godina izdanja</th>
                  <th scope="col">Opis</th>

                </tr>
              </thead>
              <tbody>
                    {

                      dokumenta.map((d)=><tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.autor.ime}  {d.autor.prezime}</td>
                        <td><a href={  vratiLink(d.file.file_name)} target="_blank" rel="noopener noreferrer" style={{color:"white"}}>otvori</a></td>
                        <td>{d.godina_izdanja}</td>
                        <td>{d.opis}</td>

                      </tr>)
                    }
              </tbody>
              </table>
        </div>
  
    </>
  
    );
  }
  
  export default Admin;
  