 
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

function Login() {
 

    const [userData,setUserData]=useState({
        email:"",
        password:""
    });
    function handleInput(e){  
 
        let newUserData = userData; 
      
        newUserData[e.target.name]=e.target.value;  
        console.log(newUserData)
        setUserData(newUserData);  
 
    }
    let navigate = useNavigate();
    function handleLogin(e){

        e.preventDefault(); 

        axios
            .post("http://127.0.0.1:8000/api/login", userData )
            .then((res)=>{ 
                console.log(res.data[0]);
                if(res.data.success===true){

                    window.sessionStorage.setItem("auth_token",res.data[0].token);
                    window.sessionStorage.setItem("auth_name",res.data[0].username);
                    window.sessionStorage.setItem("auth_id",res.data[0].id);

                     
                    console.log(res.data[0].token);
                    if(res.data[0].role === 'admin')
                    {
         
                         navigate("/admin")
                    }
                    else{
                        navigate("/dokumenta"); 
                    }



                }else{
                    alert("NEUSPESNO");
                }
            });
           

    }
    return ( 
    <>
        <header>
            <h1>Login</h1>
        </header>
            <div id="form">
            
            <div className="fish" id="fish"></div>
            <div className="fish" id="fish2"></div>
            
            <form id="waterform" onSubmit={handleLogin} >
            
            <div className="formgroup" id="name-form">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" onInput={handleInput} />
            </div>
            
            <div className="formgroup" id="email-form">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" onInput={handleInput}/>
            </div>
            
           
            
                <input type="submit" value="Login"   />
            </form>
            </div>
        
  
    </>
  
    );
  }
  
  export default Login;
  