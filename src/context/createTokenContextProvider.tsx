'use client'
import { createContext, ReactNode, useState } from "react";



interface CreateTokenProps{
    name:string;
    symbol:string;
    setName:React.Dispatch<React.SetStateAction<string>>;
    setSymbol:React.Dispatch<React.SetStateAction<string>>;
}

const createTokenContext = createContext<CreateTokenProps|undefined>(undefined)




export const CreateTokenContextProvider = ({children}:{children:ReactNode})=>{
    const [name,setName] = useState("");
    const [symbol , setSymbol] = useState("");

    return (
        <createTokenContext.Provider value={{name,setName,symbol,setSymbol}} >
            {children}
        </createTokenContext.Provider>
    )
}