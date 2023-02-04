import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    //form vars
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //hook vars
    const {login, error, isLoading} = useLogin()

    //form submit function
    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email.toLowerCase(), password)
    }

    return (  
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>
            <input 
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value = {email}
            />
            <label>Password:</label>
            
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value = {password}
            />

            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
 
export default Login;