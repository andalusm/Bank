import React from 'react'
import Item from './Item'
import { Grid } from '@mui/material';

export default function Category({category}) {
  return (
    <Item className='category'>
        
        <h3 >{category._id}:{category.totalSum}</h3>
    </Item>
  )
}
