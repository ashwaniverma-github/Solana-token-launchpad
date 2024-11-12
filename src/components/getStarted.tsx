'use client'
import { useWallet } from "@solana/wallet-adapter-react"
import WalletConnectBtn from "./sm-components/wallectConnectBtn"
import { useRouter } from "next/navigation"
import {  motion } from "framer-motion"

export default function GetStarted(){
    const router = useRouter()
    const {publicKey} = useWallet()

    return (
        <>
        {publicKey?(
            <motion.div className="text-lg font-semibold"
            whileHover={{ scale: 0.9, rotate: 0 }}
            whileTap={{
                scale: 1,
                
                borderRadius: "100%"
            }}
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