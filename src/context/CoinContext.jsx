import { createContext, useEffect, useState } from "react";



export const CoinCotext=createContext();

const CoinContextProvider=(props)=>{
     
    const [allCoin,setAllCoin]=useState([])
    const [currency, setCurrency] = useState({
        name:"usd",
        symbol:"$"
    })

    const fetchAllCoin=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ShjnaDPpG2mAto2FKMqsAxB2'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));
    }
  useEffect(() => {
    fetchAllCoin();
  }, [currency])
  
    const contextValue={
        allCoin,currency,setCurrency
    }

    return(
        <CoinCotext.Provider value={contextValue}>
            {props.children}
        </CoinCotext.Provider>
    )
    
}

export default CoinContextProvider;