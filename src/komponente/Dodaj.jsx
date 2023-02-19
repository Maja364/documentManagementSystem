 
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

function Dodaj() {
 

    const [dokumentdata,setDokumentData]=useState({
        autor_id:window.sessionStorage.getItem("auth_id"),
        godina_izdanja:1,
        opis:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        files:[]
    });
    function handleInput(e){  
 
        let newDokumentData = dokumentdata; 
      
        newDokumentData[e.target.name]=e.target.value;  
        console.log(newDokumentData)
        setDokumentData(newDokumentData);  
 
    }
    let navigate = useNavigate();
    function fileValidate(file) {
    

        if (file.type === "application/pdf") {
          console.log("Odabrani fajl je PDF.");
            return true;
        } else {
          console.log("Odabrani fajl nije PDF.");
           return false;
        }
       }
       const [fajlovi,setFajlovi]=useState([]);
       const handleInputFile = (e) =>{
           const filesArray = [];
           let isValid = "";
       
           for (let i = 0; i < e.target.files.length; i++) {
             isValid = fileValidate(e.target.files[i]);
             if(isValid){
                 filesArray.push(e.target.files[i]);
             }
               
           }
           setFajlovi(filesArray)
           dokumentdata.files=filesArray
           
       }
    function handleAdd(e){

        e.preventDefault(); 
        
        const data = new FormData();
        for (let i = 0; i < fajlovi.length; i++) {
            data.append("files[]", fajlovi[i]);
        }
      

        data.append("godina_izdanja",dokumentdata.godina_izdanja);
        data.append("autor_id",sessionStorage.getItem("auth_id"));
        data.append("opis",dokumentdata.opis);

 
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/dokument',
            data:data,
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
            <h1>Dodaj dokument</h1>
        </header>
            <div id="form">
            
            <div className="fish" id="fish"></div>
            <div className="fish" id="fish2"></div>
            
            <form id="waterform" onSubmit={handleAdd} >
            
            <div className="formgroup" id="name-form">
                <label for="email">godina_izdanja</label>
                <input type="text" id="godina_izdanja" name="godina_izdanja" onInput={handleInput} />
            </div>
            
            <div className="formgroup" id="email-form">
                <label for="opis">opis</label>
                <input type="text" id="opis" name="opis" onInput={handleInput}/>
            </div>
            <div className="formgroup" id="email-form">
                <label for="file">file</label>
                <input type="file"  name="file" placeholder="Unesi dokument "    required onChange={handleInputFile}/>
            </div>
            
           
            
                <input type="submit" value="DODAJ"   />
            </form>
            </div>
        
  
    </>
  
    );
  }
  
  export default Dodaj;
  