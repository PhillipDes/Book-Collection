import { useEffect} from "react"
import { useBooksContext } from "../hooks/useBooksContext"
import { useAuthContext } from "../hooks/useAuthContext"

//components
import BookList from "../components/BookList";

const Home = () => {
    //context vars
    const {books, dispatch} = useBooksContext()
    const {user} = useAuthContext()

    //get books of the logged-in user
    useEffect(() => {
        const fetchBooks = async () => {
            //uses proxy in package.json in dev, need to point to correct endpoint for prod
            const response = await fetch('/api/books', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_BOOKS', payload: json})
            }
        }
        if(user){
            fetchBooks()
        }    
    }, [dispatch, user])

    return (   
        <div className="home">
            <h2>My Books</h2>
            <div className="books">
                {books && books.map((book) => (
                    <BookList key={book._id} book={book} />
                ))} 
            </div>       
        </div>      
     );
}
 
export default Home;