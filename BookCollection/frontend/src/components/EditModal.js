//hooks
import { useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext"
import useClickOutside from "../hooks/useClickOutside";

//onClose is a function that is used to close the modal
const EditModal = ({book, isEditOpen, onClose}) => {
    //context
    const {dispatch} = useBooksContext()
    const {user} = useAuthContext()
    
    //form vars
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [isbn, setISBN] = useState(book.isbn);
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    //for submit function
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return 
        }

        const bookEdit = {title, author, isbn}

        //send a patch request
        const response = await fetch('/api/books/' + book._id, {
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
            onClose()
        }
    }

    //reset form values back to the unedited values when canceled
    const handleCancel = () => {
        onClose()
        setTitle(book.title)
        setAuthor(book.author)
        setISBN(book.isbn)
        setError(null)
        setEmptyFields([])
    }
    
    const out = useClickOutside(() => handleCancel());

    if(!isEditOpen) {       
        return(null)
    }

    return (
        <>
            <div className="modal-overlay" />
            <div className="modal" ref={out}>
                <div className="edit">
                <h2>Edit Book</h2>
                {book &&
                    <form onSubmit={handleSubmit}>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
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
                        />
                    {error && <div className="error">{error}</div>}
                    <button onClick={handleCancel}>Cancel</button>   
                    <button>Save</button>       
                </form> 
                }
                </div>
            </div>
        </>
    );
}
 
export default EditModal;