import { createContext, useReducer } from "react";

export const BooksContext = createContext()


//cases for which action to take passed in by a dispatch function
export const booksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BOOKS':
            return {
                books: action.payload
            }
        case 'GET_BOOK':
            return {
                book: action.payload
            }
        case 'CREATE_BOOK':
            return {
                books: [action.payload, ...state.books]
            }
        case 'DELETE_BOOK':
            return {
                books: state.books.filter((book) => book._id !== action.payload._id)
            }
        case 'UPDATE_BOOK':
            return {
                books: state.books
            }
        default:
            return state
    }
}

//template will allow all components to use BooksContext
//allowing for a page to update on its own
export const BooksContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(booksReducer, {books: null})

    return (  
        <BooksContext.Provider value={{...state, dispatch}}>
            {children}
        </BooksContext.Provider>
    );
}
 