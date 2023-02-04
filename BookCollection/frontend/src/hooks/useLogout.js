import { useAuthContext } from "./useAuthContext";
import { useBooksContext } from "./useBooksContext";

export const useLogout = () => {
    //context vars
    const {dispatch} = useAuthContext()
    const {dispatch: booksDispatch} = useBooksContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout function 
        dispatch({type: 'LOGOUT'})
        booksDispatch({type: 'SET_BOOKS', payload: null})
    }
    
    return {logout}
}