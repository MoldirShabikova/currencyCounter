import React from 'react'

function CurrencyRow({currencyOptions, selectedCurrency,onChangeCurrency, amount,onChangeAmount}) {
  return (
    <div>
        <input className='input' value={amount}type="number" onChange={onChangeAmount}/>
        <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(option=>(
   <option key={option.id} value={option}>
   {option}
               </option>
            ))}
         
        </select>
    </div>
  )
}

export default CurrencyRow