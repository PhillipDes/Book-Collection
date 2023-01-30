import { CreateModalContext } from '../context/CreateModalContext'
import { useContext } from 'react'

export const useCreateModalContext = () => {
    const context = useContext(CreateModalContext)

    //check if the context is trying to be used outside of where it's included
    if (!context) {
        throw Error('useCreateModalConext must be used inside a CreateModalProvider')
    }

    return context
}