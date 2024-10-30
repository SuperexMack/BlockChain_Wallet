import { Navbar } from "../Navbar/Navbar";
import { mnemonicToSeed, generateMnemonic } from "bip39";
import {Keypair} from "@solana/web3.js"
import {drivePath} from "ed25519-hd-key"
import {useState} from "react"

export function MyLogic(){
  

  // creating mnemonic 
  const [mnemonic , setMnemonic] = useState([])

  const createMnemonic = ()=>{
    console.log("creating some mnemonic")
    const newMneomnic = generateMnemonic()
    const newCustomizedMnemonic = newMneomnic.split(" ")
    setMnemonic(newCustomizedMnemonic)
    
  }


  const storageMnemonic = (mnemonic)=>{
    let storage = []
    for(let i = 0 ; i<mnemonic.length ; i+=4){
      storage.push(mnemonic.slice(i, i+4))
    }
    return storage
  }

  return(
    <>
      <Navbar></Navbar>
      <div className="w-full h-[100px] flex justify-center items-center">
        <button onClick={createMnemonic} className="createSeed hover:cursor-pointer hover:bg-pink-500 p-2 bg-blue-600 w-[900px] text-white font-bold rounded-lg text-[30px]">Create mnemonic</button>
      </div>
      <div className="w-full h-auto flex justify-center">
        <div className="w-auto h-[300px] p-8">

          {storageMnemonic(mnemonic).map((row,rowindex)=>(
            <div key={rowindex} className="space-x-24 flex justify-center items-center">
              {row.map((newvalue,colindex)=>(
                <span key={colindex} className="text-[40px] font-bold text-white hover:bg-violet-600 hover:rounded-xl p-3 hover:cursor-pointer">{newvalue}</span>
              ))}
            </div>
          ))}
       
        </div>
      </div>
    </>
  )
    
}