import { Navbar } from "../Navbar/Navbar";

export function MyLogic(){
  return(
    <>
      <Navbar></Navbar>
      <div className="w-full h-[100px] flex justify-center items-center">
        <button className="createSeed hover:cursor-pointer p-2 bg-green-600 w-[200px] text-white font-bold rounded-lg text-[30px]">Create Seed</button>
      </div>
    </>
  )
    
}


