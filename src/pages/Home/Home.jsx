import React, { useContext, useEffect, useState } from 'react'
import { CoinCotext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

function Home() {

    const{allCoin,currency}=useContext(CoinCotext)
     
     const [displayCoin,setDisplayCoin]=useState([])

     const [input,setInput]=useState('')

     const inputHandler=(event)=>{
        setInput(event.target.value)
        if(event.target.value==""){
          setDisplayCoin(allCoin)
        }
   } 

     useEffect(() => {
       setDisplayCoin(allCoin)
     }, [allCoin])
     
   
   
     
     const searchHandler=async(e)=>{
             e.preventDefault();
            const coins= await allCoin.filter((item)=>(
               item.name.toLowerCase().includes(input.toLowerCase())
                
            ))
             //bitcoin
             //bit
            //  console.log(coins)
             setDisplayCoin(coins)
     }
  return (
    <div className='px-3 pb-24 text-white'>
        <div className='max-w-[600px]  my-24 mx-auto flex flex-col items-center text-center gap-8 text-white'>
            <h1 className='text-5xl font-bold '>Largest <br /> Crypto MarketSite</h1>
            <p className='w-[70%] leading-normal'>Welcome to the world's largest cryptocurrency marketsite. Sing up to explore more aboute Cryptos.</p>
            <form onSubmit={searchHandler} className='p-2 w-[80%] bg-white rounded-lg text-xl text-black flex justify-between items-center gap-3' >
                <input onChange={inputHandler} list='coinlist' value={input} type="text" className='flex-1 outline-none border-none pl-3' placeholder='search crypto..'
                 required/>

                <datalist id='coinlist'>
                    {allCoin.map((item,index)=>(<option key={index} value={item.name} />))}
                </datalist>

                <button className='border-none bg-slate-600 text-xl px-3 py-1 text-white rounded-lg' type='submit'>Search</button>
            </form>
        </div>
        <div className='max-w-3xl border m-auto bg-slate-700 rounded-lg'>
            <div className="grid grid-flow-col grid-cols-[0.5fr,2fr,1fr,1fr,1.5fr] px-2 py-3 border-b-[1px] border-solid border-slate-300 items-center">
                <p className=' '>#</p>
                <p className=' '>Coin</p>
                <p className=' '>Price</p>
                <p className=' text-center '>24H Change</p>
                <p className=' text-right'>Market cap</p>
            </div>
             {
             displayCoin.slice(0,10).map((item,index)=>(
                <Link
                to={`/coin/${item.id}`}
                className="grid grid-flow-col grid-cols-[0.5fr,2fr,1fr,1fr,1.5fr] px-2 py-3 border-b-[1px] border-solid border-slate-300 items-center"
                key={index}
                >
                 <p>{item.market_cap_rank}</p>
                 <div className='flex text-center'>
                    <img className='w-6' src={item.image} alt="" />
                    <p>{item.name+" - "+item.symbol}</p>
                    </div>
                    <p>{currency.symbol}{item.current_price.toLocaleString()}</p> 
                    <p className={item.price_change_percentage_24h>0?"text-green-500 text-center":"text-red-700 text-center"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>  
                    <p className='text-right'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
                </Link>
             ))
             }
        </div>
    </div>
  )
}

export default Home