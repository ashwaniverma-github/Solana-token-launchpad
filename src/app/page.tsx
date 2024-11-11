"use client"
import GetStarted from "@/components/getStarted";
import Navbar from "@/components/navbar";
export default function Home() {
  return (
    <div className="min-h-screen pt-10 " >
      <Navbar/>
      <div className="flex flex-col items-center justify-center gap-10 m-10  " >
        <div className="text-8xl font-serif" >
          <h1 className=" p-2" >Solana Token</h1>
          <h1 className="text-center p-2" >Launchpad</h1>
        </div>
        <div>
          <p className="font-semibold text-2xl text-gray-400" >Create, launch, and manage your Solana tokens with ease. Connect your wallet to get started.</p>
        </div>
        <GetStarted/>
      </div>
    </div>
  );
}
