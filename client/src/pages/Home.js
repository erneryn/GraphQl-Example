import React,{useState} from 'react'
import CardsTv from '../components/CardsTv'
import CardsMovie from '../components/CardsMovie'
import FormaddTv from '../components/FormAddTv'
import FormaddMovie from '../components/FormAddMov'
import { useSelector } from 'react-redux'
import { Button, Col, Row, Container} from 'react-bootstrap';


function Home(){
  
  return(
     <div>
    <div style={{display:'flex',justifyContent:'center'}}>
        <h2>MOVIES</h2>
      </div>
    <CardsMovie types='movies'/>
    <div style={{display:'flex',justifyContent:'center'}}>
        <h2>TV SERIES</h2>
      </div> 
    <CardsTv types='tv'/>
    </div>
  )
}

export default Home