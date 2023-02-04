import { useState } from "react";
import { Link } from "react-router-dom";

//Hooks
import useClickOutside from "../hooks/useClickOutside";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const Burger = ({book}) => {
    //open vars
    const [open, setOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    //context vars
    const {dispatch} = useBooksContext()
    const {user} = useAuthContext()

    const handleEdit = async () => {
        setOpen(false)
        setIsEditOpen(true)       
    }

    const handleDelete = async () => {
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
            dispatch({type:'DELETE_BOOK', payload: json})
        }
    }

    //Allows dropdown to be closed when another part of the page is clicked
    const out = useClickOutside(() => setOpen(false));

    return ( 
        <div ref={out} className="burger">
            <button className="dropdown" onClick={() => setOpen(!open)}></button>
            <div className={`options ${open ? " visible" : ""}`}>
                <Link id="edit" className="opt edit" onClick={handleEdit}>Edit Book</Link>
                <Link id="delete" className="opt del"  
                onClick={() => {
                    setOpen(false)
                    setIsDeleteOpen(true)  
                }}
                >Delete</Link>
            </div>
            <EditModal book = {book} isEditOpen = {isEditOpen} onClose = {() => setIsEditOpen(false)} />
            <DeleteModal isDeleteOpen = {isDeleteOpen} onClose = {() => setIsDeleteOpen(false)} handleDelete = {() => handleDelete} />
        </div>
    );
}
 
export default Burger;