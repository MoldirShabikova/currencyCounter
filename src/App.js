
import './App.css';
import {useState, useEffect} from 'react'
import CurrencyRow from './CurrencyRow';

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
const [fromCurrency, setFromCurrency] = useState()
const [toCurrency, setToCurrency] = useState()
const [exchangeRate, setExchangeRate] = useState()
const [amount, setAmount] = useState(1)
const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)


let toAmount, fromAmount
if(amountInFromCurrency){
  fromAmount = amount
  toAmount = amount * exchangeRate
}else {
  toAmount =amount
  fromAmount =amount / exchangeRate
}
  console.log(currencyOptions)
  useEffect(()=>{
    fetch("https://open.er-api.com/v6/latest/USD")
    .then(res=>res.json())
    .then(data=>{
      const currency = Object.keys(data.rates)[2]
      setCurrencyOptions([data.base_code, ...Object.keys(data.rates)])
      setFromCurrency(data.base_code)
      setToCurrency(currency)
      setExchangeRate(data.rates[currency])
    })

  },[])
function handleFromAmountChange(e){
   setAmount(e.target.value)
   setAmountInFromCurrency(true)
 }
 function handleToAmountChange(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(false)
}

  console.log(currencyOptions)

  return (
    <div className="App">
     <h1>Convert</h1>
     <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency} 
      onChangeCurrency={e=> setFromCurrency(e.target.value)} 
      amount={fromAmount}
      onChangeAmount={handleFromAmountChange}
      />
     <h1 className='equals'>=</h1>
     <CurrencyRow currencyOptions={currencyOptions} 
     selectedCurrency={toCurrency} 
     onChangeCurrency={e=> setToCurrency(e.target.value)}
  amount={toAmount}
  onChangeAmount={handleToAmountChange}
     />
    </div>
  );
}

export default App;
