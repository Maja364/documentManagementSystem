 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Dokumenta() {
 
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
        </div>
  
    </>
  
    );
  }
  
  export default Dokumenta;
  