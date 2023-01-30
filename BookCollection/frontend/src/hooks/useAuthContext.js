import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    //check if the context is trying to be used outside of where it's included
    if (!context) {
        throw Error('useAuthConext must be used inside a AuthContextProvider')
    }

    return context
}