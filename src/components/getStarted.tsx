'use client'
import { useConnection , useWallet } from "@solana/wallet-adapter-react"
import WalletConnectBtn from "./sm-components/wallectConnectBtn"
import { useRouter } from "next/navigation"
import { animate, motion } from "framer-motion"

export default function GetStarted(){
    const router = useRouter()
    const {connection} = useConnection()
    const {publicKey} = useWallet()

    return (
        <>
        {publicKey?(
            <motion.div className="text-lg font-semibold"
            whileHover={{scale:1.1}}
             >
                <button onClick={()=>{
                    router.push('/dashboard')
                }} className="bg-blue-500 rounded-3xl p-4 px-8" >Get Started</button>
            </motion.div>
        ):(
            <WalletConnectBtn/>
        )}
        </>       
    )
}