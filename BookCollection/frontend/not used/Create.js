import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext"

const Create = () => {
    const {dispatch} = useBooksContext()
    const [title, setTitle] = useState('');
    const [isbn, setISBN] = useState('');
    const [author, setAuthor] = useState('');
    //const [status, setStatus] = useState('');
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return 
        }

        const book = {title, author, isbn}

        const response = await fetch('/api/books', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok) {
            setTitle('')
            setAuthor('')
            setISBN('')
            setError(null)
            setEmptyFields([])
            console.log('New Book Added', json)
            dispatch({type:'CREATE_BOOK', payload: json})
            navigate({ pathname: '/' })
        }
    }

    return ( 
        <div className="create">
            <h2>Add a Book</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />
                <label>Author:</label>
                <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={emptyFields.includes('author') ? 'error' : ''}
                />
                <label>ISBN:</label>
                <input
                    type='text'
                    value={isbn}
                    onChange={(e) => setISBN(e.target.value)}
                />
                {error && <div className="error">{error}</div>}
                <button>Add Book</button>                
            </form>
        </div>
     );
    //  <label>Status:</label>
    //             <select
    //             value={status}
    //             onChange={(e) => setStatus(e.target.value)}
    //             >
    //                 <option style={{ display: 'none'}}></option>
    //                 <option value="To Be Read">To Be Read</option>
    //                 <option value="Reading">Reading</option>
    //                 <option value="Finished">Finished</option>
    //             </select>
}
 
export default Create;