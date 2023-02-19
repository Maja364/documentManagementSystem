 
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
$('document').ready(function(){
	$('input[type="text"], input[type="email"], textarea').focus(function(){
		var background = $(this).attr('id');
		$('#' + background + '-form').addClass('formgroup-active');
		$('#' + background + '-form').removeClass('formgroup-error');
	});
	$('input[type="text"], input[type="email"], textarea').blur(function(){
		var background = $(this).attr('id');
		$('#' + background + '-form').removeClass('formgroup-active');
	});

function errorfield(field){
	$(field).addClass('formgroup-error');
	console.log(field);	
}
	
});

function Izmeni({dok}) {
 

    const [dokumentdata,setDokumentData]=useState({
        autor_id:dok.autor.id,
        godina_izdanja:dok.godina_izdanja,
        opis:dok.opis, 
         
    });
    function handleInput(e){  
 
        let newDokumentData = dokumentdata; 
      
        newDokumentData[e.target.name]=e.target.value;  
        console.log(newDokumentData)
        setDokumentData(newDokumentData);  
 
    }
    let navigate = useNavigate();
 
    function handleUpdate(e){

        e.preventDefault(); 
        
        
        var config = {
            method: 'put',
            url: 'http://127.0.0.1:8000/api/dokument/'+dok.id,
            data:dokumentdata,
            headers:{'Authorization': `Bearer ${ window.sessionStorage.getItem('auth_token')}`},
          };
       
          
          axios(config)
          .then(function (response) {
           
            console.log(response);
           
            alert("USPESNO")
           navigate("/dokumenta")
      
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

    return ( 
    <>
        <header>
            <h1>Uredi dokument</h1>
        </header>
            <div id="form">
            
            <div className="fish" id="fish"></div>
            <div className="fish" id="fish2"></div>
            
            <form id="waterform" onSubmit={handleUpdate} >
            
            <div className="formgroup" id="name-form">
                <label for="email">godina_izdanja</label>
                <input type="text" id="godina_izdanja" name="godina_izdanja" onInput={handleInput}  defaultValue={dok.godina_izdanja}/>
            </div>
            
            <div className="formgroup" id="email-form">
                <label for="opis">opis</label>
                <input type="text" id="opis" name="opis" onInput={handleInput} defaultValue={dok.opis}/>
            </div>
   
                <input type="submit" value="IZMENI"   />
            </form>
            </div>
        
  
    </>
  
    );
  }
  
  export default Izmeni;
  