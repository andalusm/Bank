import React from 'react'

export default function ModalComp({transaction}) {
  return (
    <div>
        <div>{new Date(transaction.date).toLocaleDateString('en-DE')}</div>
        <div>{transaction.vendor}: {transaction.amount}$</div>
        <hr></hr>
    </div>
  )
}
