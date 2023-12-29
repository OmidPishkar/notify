"use client";

import { useState , useEffect } from "react";

interface Props{
    children : React.ReactNode
}

const ClientOnly : React.FC<Props> = ({children}) => {
    
    const [hasMounted , setHasMounted] = useState(false);
    
    useEffect( () => {
        setHasMounted(true);
    } , []);

    return (
        <>
            {children}
        </>
    )
}

export default ClientOnly;