 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Admin({dokumenta,setDokumentIzmena}) {
 
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
    function searchTable() {
      // uzimamo vrednost iz polja za pretragu
      var input = document.getElementById("searchInput").value.toUpperCase();
      
      // pronalazimo tabelu i sve redove u njoj
      var table = document.getElementById("myTable");
      var rows = table.getElementsByTagName("tr");
      
      // prolazimo kroz svaki red u tabeli
      for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var found = false;
        // prolazimo kroz svaku ćeliju u trenutnom redu
        for (var j = 0; j < cells.length; j++) {
          var cell = cells[j];
          // ako sadrži traženu vrednost, postavljamo found na true i prekidamo petlju
          if (cell.innerHTML.toUpperCase().indexOf(input) > -1) {
            found = true;
            break;
          }
        }
        // prikazujemo ili skrivamo red u zavisnosti od toga da li smo pronašli traženu vrednost
        if (found) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }

    const [sortedDocuments, setSortedDocuments] = useState(dokumenta);
    const sortByYear = () => {
      const sorted = [...sortedDocuments].sort((a, b) => {
        return a.godina_izdanja - b.godina_izdanja;
      });
      setSortedDocuments(sorted);
    }
    function obrisi(id){
      axios
      .delete("http://127.0.0.1:8000/api/dokument/"+id,
      {headers:{'Authorization': `Bearer ${ window.sessionStorage.getItem('auth_token')}`} } )
      .then((res)=>{  
          console.log(res.data);
          alert("OBRISANO")
      })
      .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
      
        });
    }
    function azuriraj(d){
      setDokumentIzmena(d)
      navigate('izmeni')
    }
    return ( 
    <>
        <div className="container">
          <button className='btn btn-success' onClick={sortByYear}> Sortiraj</button>

            <button className='btn btn-primary' onClick={handleLogout}> Odjavi se</button>

            <input type="text"  id="searchInput" onChange={searchTable}/>

            <table className="table table-dark" >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Autor</th>
                  <th scope="col">Fajl</th>
                  <th scope="col"  ></th>
                  <th scope="col">Opis</th>
                  <th scope="col">Opcije</th>

                </tr>
              </thead>
              <tbody id="myTable">
              {
                sortedDocuments.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.autor.ime} {d.autor.prezime}</td>
                    <td><a href={vratiLink(d.file.file_name)} target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>otvori</a></td>
                    <td>{d.godina_izdanja}</td>
                    <td>{d.opis}</td>
                    <td><button className='btn btn-danger' onClick={()=>obrisi(d.id)}>Obrisi</button></td>
                    <td><button className='btn btn-danger' onClick={()=>azuriraj(d)}>Azuriraj</button></td>

                  </tr>
                ))
              }
              </tbody>
              </table>
        </div>
  
    </>
  
    );
  }
  
  export default Admin;
  