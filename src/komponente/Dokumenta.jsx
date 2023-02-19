 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Dokumenta({radovi}) {
  console.log(radovi)
    const navigate = useNavigate();
 
    function handleLogout(){ 
     
       
      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/logout',
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
    function dodaj(){
      navigate('dodaj')
    }


    return ( 
    <>
        <div className="container">
          <button className='btn btn-primary' onClick={dodaj}> Dodaj</button>
            <button className='btn btn-primary' onClick={handleLogout}> Odjavi se</button>

            {radovi.map((d)=>
              <div key={d.id} className="card">
              <div className="card-body">
                <h5 className="card-title">{d.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Autor: {d.authors[0].name}
                </h6>
                <p className="card-text">
                  Subject: {d.subject[0] }
                </p>
                <a
                  href={"http://openlibrary.org" + d.key}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  Link do rada
                </a>
              </div>
            </div>
            )}



        </div>
  
    </>
  
    );
  }
  
  export default Dokumenta;
  