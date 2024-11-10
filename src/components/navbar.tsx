import WalletConnectBtn from "./sm-components/wallectConnectBtn"
export default function Navbar(){
    return (
        <div className="border-b p-2">
            <div className="flex justify-between">
                <div className="font-semibold text-lg flex" >
                    <button className="">Token Launchpad</button>
                </div>
                <WalletConnectBtn/> 
            </div>            
        </div>
    )
}