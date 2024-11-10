'use client'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { clear } from "console"
import { Scale, Wallet } from "lucide-react"
import { animate, motion } from "framer-motion"
export default function WalletConnectBtn(){
    return (
        <motion.div
        whileHover={{scale:0.9}}
        >
            <WalletMultiButton  style={{borderRadius:'20px' , padding:"" , backgroundColor:'royalblue' }}>
            </WalletMultiButton>
        </motion.div>
    )
}