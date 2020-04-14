import React,{useState} from 'react'
import CardsMovie from '../components/CardsMovie'



function Movie(){
  
  return(
     <div>
    <div style={{display:'flex',justifyContent:'center'}}>
        <h2>MOVIES</h2>
      </div>
    <CardsMovie types='movies'/>
    </div>
  )
}

export default Movie