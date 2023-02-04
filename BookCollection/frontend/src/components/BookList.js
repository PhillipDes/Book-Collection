//components
import Burger from "./Burger";

const BookList = ({book}) => {
    return ( 
        <div className="book-list">
            <div className="book-preview">
                <h2>{book.title}</h2>
                <p>Written by {book.author}</p>
                <span><Burger book = {book} /></span>
            </div>
        </div>
     );
}
 
export default BookList;