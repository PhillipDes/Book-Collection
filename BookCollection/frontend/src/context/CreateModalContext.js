import { createContext, useState } from "react";

export const CreateModalContext = createContext()

export const CreateModalContextProvider = ({children}) => {
    const [isCreateOpen, setIsCreateOpen] = useState(false)

    return (  
        <CreateModalContext.Provider value={[isCreateOpen, setIsCreateOpen]}>
            {children}
        </CreateModalContext.Provider>
    );
}
 