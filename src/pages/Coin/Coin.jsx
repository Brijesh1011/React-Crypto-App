import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinCotext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

function Coin() {

    const {coinId}=useParams()

    const [coinData,setCoinData]=useState();
    const [historicalData,sethistoricalData]=useState();
    const {currency}=useContext(CoinCotext)

    const fetchCoinData=async ()=>{

        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ShjnaDPpG2mAto2FKMqsAxB2'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(res => res.json())
            .then(res => setCoinData(res))
            .catch(err => console.error(err));
    }

    const fetchHistoricalData=async ()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ShjnaDPpG2mAto2FKMqsAxB2'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(res => res.json())
            .then(res => sethistoricalData(res))
            .catch(err => console.error(err));
    }

    useEffect(() => {
      fetchCoinData();
      fetchHistoricalData();
    }, [currency])
    
    if(coinData && historicalData){
        return (

            <div className='py-2 px-5 text-white'>
                <div className='flex flex-col items-center my-12 mx-auto '>
                    <img className='max-w-24' src={coinData.image.large} alt="" />
                    <p className='font-semibold text-4xl'>{coinData.name}({coinData.symbol.toUpperCase()})</p>
                </div>

                 <div className="max-w-3xl h-60 m-auto">
                    <LineChart historicalData={historicalData}/>
                 </div>

                 <div className="max-w-3xl my-10 mx-auto flex flex-col">
                    <ul  className='flex justify-between py-2 px-0 border-b-1 border-solid border-red-800 list-none font-semibold'>
                        <li>Crypto Market Renk</li>
                        <li>{coinData.market_cap_rank}</li>
                    </ul>
                    <ul className='flex justify-between py-2 px-0 border-b-1 border-solid border-red-800 list-none font-semibold'>
                        <li>Current Price</li>
                        <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul className='flex justify-between py-2 px-0 border-b-1 border-solid border-red-800 list-none font-semibold'>
                        <li>Market Cap</li>
                        <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul className='flex justify-between py-2 px-0 border-b-1 border-solid border-red-800 list-none font-semibold'>
                        <li>24 Hour High</li>
                        <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul className='flex justify-between py-2 px-0 border-b-1 border-solid border-red-800 list-none font-semibold'>
                        <li>24 Hour Low</li>
                        <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
                    </ul>
                 </div>

            </div>
          )
    }else{
        return (

            <div className='grid place-self-center min-h-[80vh]'>
                <div className='w-16 h-16 place-self-center border-[5px] border-solid border-t-slate-700 border-white rounded-full animate-spin'>
                    
                </div>
            </div>
          )
        
    }

  
}

export default Coin