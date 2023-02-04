import { useState } from "react"
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    //context vars
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            //save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update with auth context
            dispatch({type: 'LOGIN', payload: json})
            console.log('logged in')
            setIsLoading(false)
        }  
    }

    return {login, isLoading, error}
}

