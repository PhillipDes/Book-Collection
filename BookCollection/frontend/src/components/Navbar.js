import {Link} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCreateModalContext } from '../hooks/useCreateModalContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
    //context vars
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const [isCreateOpen, setIsCreateOpen] = useCreateModalContext()

    const handleLogout = () => {
        logout()
    }

    const handleCreate = () => {
        setIsCreateOpen(true)   
    }

    return ( 
        <nav className="navbar">
            <h1>Book Collection</h1>
            {user && (
                <div className="links">
                    <Link to="/">My Books</Link>
                    <Link  onClick={handleCreate}>Add Book</Link>
                    <button onClick={handleLogout}>Log out</button>
                    <span>{user.username}</span>
                </div>
            )}
            {!user && (
                <div className='links'>
                    <Link to="/login">Log in</Link>
                    <Link to="/signup">Sign up</Link>
                </div>
            )}
        </nav>
     );
}
 
export default Navbar;