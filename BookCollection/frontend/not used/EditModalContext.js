import { createContext, useState } from "react";

export const EditModalContext = createContext()


//template will allow all components to use BooksContext
//allowing for a page to update on its own
export const EditModalContextProvider = ({children}) => {
    const [isEditOpen, setIsEditOpen] = useState(false)

    return (  
        <EditModalContext.Provider value={[isEditOpen, setIsEditOpen]}>
            {children}
        </EditModalContext.Provider>
    );
}
 