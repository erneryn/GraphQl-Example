import React,{useState} from 'react'
import CardTv from '../components/CardsTv'


function Movie(){
  
  return(
     <div>
    <div style={{display:'flex',justifyContent:'center'}}>
        <h2>TV SERIES</h2>
      </div>
    <CardTv/>
    </div>
  )
}

export default Movie