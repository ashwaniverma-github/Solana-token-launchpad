"use client";
import React , {useMemo} from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";


export default function AppWalletProvider({children}:{children:React.ReactNode}){
    const netwrok = WalletAdapterNetwork.Devnet
    const endpoint = useMemo(()=>clusterApiUrl(netwrok),[netwrok])
    const wallets = useMemo(()=>[

    ],[netwrok])
    return (
        <ConnectionProvider endpoint={endpoint} >
            <WalletProvider wallets={[]} autoConnect >
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}