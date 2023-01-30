import { useState, useEffect} from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext"

const Edit = () => {
    const {dispatch} = useBooksContext()
    const {user} = useAuthContext()
    const {_id} = useParams()
    const [book, setBook] = useState('')
    const [title, setTitle] = useState('');
    const [isbn, setISBN] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBook = async () => {
            const response = await fetch('/api/books/' + _id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json)
            
            if(response.ok) {
                setBook(json)
                setTitle(book.title)
                setAuthor(book.author)
                setISBN(book.isbn)
            }
        }
        if(user){
            fetchBook()
        }
    }, [user, book.title, book.author, book.isbn, _id])    

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return 
        }

        const bookEdit = {title, author, isbn}

        const response = await fetch('/api/books/' + _id, {
            method: 'PATCH',
            body: JSON.stringify(bookEdit),
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
            console.log('Book Edited', json)
            dispatch({type:'UPDATE_BOOK', payload: json})
            navigate({ pathname: '/' })
        }
    }

    const handleCancel = () => {
        navigate({ pathname: '/' })
    }
    
    //disable input while loading data
    return ( 
        
        <div className="edit">
            <h2>Edit Book</h2>
            {book &&
                <form onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
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
                <button>Save</button> 
                <button onClick={handleCancel}>Cancel</button>      
            </form> 
            }
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
 
export default Edit;