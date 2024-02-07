import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Category from './Category';
import Item from './Item';


export default function BreakDown() {

    const [breakdown,setBreakdown] = useState([])


  function getBreakDown(){
    axios.get("/api/categories").then((res ) => {
      setBreakdown(res.data)
    });
  }
  useEffect(() => {
    getBreakDown()}
  , []);
  return (
    <Item className='breakdown'>
         <h2 className='title'>BreakDown:</h2>
        {breakdown.map((b,index)=><Category category={b} key={index}/>)}
        </Item>
  )
}
