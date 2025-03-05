import React, { useContext } from 'react'
import { CoinCotext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

function Navbar() {

    const{setCurrency}=useContext(CoinCotext)
     
   const currencyHandler=(event)=>{
         switch(event.target.value){
            case "usd":{
                setCurrency({name:"usd" ,symbol:"$"})
                break;
            }
            case "inr":{
                setCurrency({name:"inr" ,symbol:"₹"})
                break;
            }
            case "eur":{
                setCurrency({name:"eur" ,symbol:"€"})
                break;
            }
            default:{
                setCurrency({name:"usd" ,symbol:"$"})
                break;
            }
         }
   }

  return (
    <>
    <nav className='flex items-center justify-between   text-lg py-2 bg-slate-700 text-white'>
         <Link to={'/'}><span className='font-bold text-2xl ml-11'>CryptoSite</span></Link>
         <ul className='flex gap-7'>
            <li className='cursor-pointer'><Link to={'/'}>Home</Link></li>
            <li className='cursor-pointer'>Features</li>
            <li className='cursor-pointer'>pricing</li>
            

         </ul>
         <div className='flex items-center gap-6 mr-11'>
            <select onChange={currencyHandler} className='px-2 py-1 border border-slate-300 rounded-lg bg-transparent '>
                <option className='bg-slate-700' value="usd">USD</option>
                <option className='bg-slate-700' value="inr">INR</option>
                <option className='bg-slate-700' value="eur">EUR</option>
            </select>
            <button className='bg-slate-300 text-black py-1 px-3 rounded-lg cursor-pointer font-semibold '>Sing-Up</button>
         </div>
    </nav>
    
    </>
  )
}

export default Navbar