import { Navbar } from "../Navbar/Navbar";
import { mnemonicToSeed, generateMnemonic } from "bip39";
import {Keypair} from "@solana/web3.js"
import {derivePath} from "ed25519-hd-key"
import nacl from "tweetnacl"
import {useState} from "react"

export function MyLogic(){
  

  // creating mnemonic 
  const [mnemonic , setMnemonic] = useState([])
  const [keyStorage , setKeyStorage] = useState([])
  const [totalWallets, setTotalWallet] = useState(0)

  const createMnemonic = async()=>{
    console.log("creating some mnemonic")
    const newMneomnic = generateMnemonic()
    const newCustomizedMnemonic = newMneomnic.split(" ")
    setMnemonic(newCustomizedMnemonic)

    const seed = await mnemonicToSeed(newMneomnic)

    const path = `m/44'/501'/${totalWallets}'/0'`
 
    const derivedSeed = derivePath(path , seed.toString("hex")).key // derivedPath is used to create many wallets from a single seed

    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey

    const publicKey = Keypair.fromSecretKey(secret)


    setKeyStorage([...keyStorage , publicKey.publicKey])

    setTotalWallet(totalWallets+1)
    
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

      <div>
        <h1 className="text-center text-white text-[50px] mt-12 font-bold">Solana wallet keys</h1>
      </div>

    <div className="w-full h-auto  flex flex-col justify-center items-center font-bold mt-11 space-y-11">
    
    {keyStorage.map((walletId , index)=>(
      <p key={index} className="text-purple-600 text-[30px]">
        <span className="text-red-600">Your solana Public key ----- </span>{walletId.toBase58()}<br></br>
      </p>
    ))}
   
    </div>


    </>
  )
    
}