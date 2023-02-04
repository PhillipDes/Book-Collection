import { BooksContext } from '../context/BooksContext'
import { useContext } from 'react'

export const useBooksContext = () => {
    const context = useContext(BooksContext)

    //check if the context is trying to be used outside of where it's included
    if (!context) {
        throw Error('useBooksConext must be used inside a BooksContextProvider')
    }

    return context
}