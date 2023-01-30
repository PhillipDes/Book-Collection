import { EditModalContext } from './EditModalContext'
import { useContext } from 'react'

export const useEditModalContext = () => {
    const context = useContext(EditModalContext)

    //check if the context is trying to be used outside of where it's included
    if (!context) {
        throw Error('useEditModalConext must be used inside a EditModalProvider')
    }

    return context
}