'use client'
import { Label } from "@/components/ui/label"
import Navbar from "@/components/navbar"
import { Input } from "@/components/ui/input"

export default function Dashboard(){
    return (
        <div>
            <Navbar/>
            <div className="bg-blue-50  m-28 p-6 shado rounded-xl">
                <div className="flex flex-col items-center justify-center space-y-2 " >
                    <h1 className="text-4xl font-bold " >Solana Token Creator</h1>
                    <p className="font-semibold text-lg text-gray-400" >Create your own Solana spl token in just few clicks without any coding</p>
                </div>
                <div className="" >
                    <div className="flex justify-between space-x-20 p-16 mx-20" >
                        <div className="flex-col items-center space-y-2 w-full" >
                            <Label htmlFor="email" className="p-1" >Name :</Label>
                            <Input type="email" id="email" placeholder="Name of your token" />
                        </div>
                        <div className="flex-col items-center space-y-2 w-full">
                            <Label htmlFor="email" className="p-1">Symbol :</Label>
                            <Input type="email" id="email" placeholder="Symbol of your token" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}