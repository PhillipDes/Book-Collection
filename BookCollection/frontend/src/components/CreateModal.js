//hooks
import { useCreateModalContext } from '../hooks/useCreateModalContext'
import { useState} from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext"
import useClickOutside from "../hooks/useClickOutside";

const CreateModal = () => {
    //context vars
    const {dispatch} = useBooksContext()
    const {user} = useAuthContext()
    const [isCreateOpen, setIsCreateOpen] = useCreateModalContext()

    //form vars
    const [title, setTitle] = useState('');
    const [isbn, setISBN] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    //form submit function
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setEmptyFields([])

        if(!user) {
            setError('You must be logged in')
            return 
        }

        const book = {title, author, isbn}

        //send post request to add a new book
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
            setIsCreateOpen(false)
        }
    }

    //reset all previous input on cancel
    const handleCancel = () => {
        setTitle('')
        setAuthor('')
        setISBN('')
        setError(null)
        setEmptyFields([])
        setIsCreateOpen(false)
    }

    const out = useClickOutside(() => handleCancel());

    //return nothing if open button hasn't been clicked
    if(!isCreateOpen) {
        return(null)
    }

    return (
        <>
            <div className="modal-overlay" />
            <div className="modal" ref={out}>
                <div className="create">
                    <h2>Add a Book</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={emptyFields.includes('title') ? 'error' : ''}
                        />
                        <label>Author:</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className={emptyFields.includes('author') ? 'error' : ''}
                        />
                        <label>ISBN:</label>
                        <input
                            type='text'
                            maxlength="13"
                            value={isbn}
                            onChange={(e) => setISBN(e.target.value)}
                            className={emptyFields.includes('isbn') ? 'error' : ''}
                        />
                        {error && <div className="error">{error}</div>}
                        <button onClick={handleCancel}>Cancel</button> 
                        <button>Add Book</button>               
                    </form>
                </div> 
            </div>
        </>
    );
}
 
export default CreateModal;