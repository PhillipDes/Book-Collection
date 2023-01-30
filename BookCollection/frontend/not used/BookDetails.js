import { useBooksContext } from "../src/hooks/useBooksContext";
import { useAuthContext } from "../src/hooks/useAuthContext";

const BookDetails = ({book}) => {
    const {dispatch} = useBooksContext()
    const {user} = useAuthContext()
    
    const handleClick = async () => {
        if(!user) {
            return
        }
        const response = await fetch('/api/books/' + book._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type:'DELETE_Book', payload: json})
        }
    }

    return (
        <div className="book-details">
            <article>
                <h2>{book.title}</h2>
                <p>Written by {book.author}</p>
                <div>{book.isbn}</div>
                <button onClick={handleClick}>Delete</button>
            </article>
        </div>
     );
}
 
export default BookDetails;