import React from 'react'
import Transaction from './Transaction'
import Item from './Item';



export default function Transactions({transactions, update}) {
  return (
    <>
    <Item className='transactions'>{transactions.map((t,index)=><Transaction transaction={t} update={update} key={index}></Transaction>)}</Item>
    </>
  )
}
