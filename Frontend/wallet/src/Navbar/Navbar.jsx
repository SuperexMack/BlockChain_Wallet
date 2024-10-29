import MywalletImage from "./thirdddd.jpg"

export function Navbar(){
    return(
    <>
    <div className="flex items-center justify-center h-[200px]">
        <div className="absolute left-7">
        <img className="h-[200px] w-[200px] rounded-full" src={MywalletImage}></img>
        </div>
        <h1 className="font-bold text-[70px] text-white">Mack's Block wallet</h1>
    </div>
    </>
    )
    
}