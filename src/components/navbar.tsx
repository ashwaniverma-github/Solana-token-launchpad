import WalletConnectBtn from "./sm-components/wallectConnectBtn"
export default function Navbar(){
    return (
        <div className="border-b p-2 fixed top-0 left-0 w-full backdrop-blur-md ">
            <div className="flex justify-between">
                <div className="font-semibold text-lg flex" >
                    <button className="">Token Launchpad</button>
                </div>
                <WalletConnectBtn/> 
            </div>            
        </div>
    )
}