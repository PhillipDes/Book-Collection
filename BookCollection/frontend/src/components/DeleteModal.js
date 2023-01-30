//hooks
import useClickOutside from "../hooks/useClickOutside";

//onClose is a function that is used to close the modal
const DeleteModal = ({isDeleteOpen, onClose, handleDelete}) => {

    const out = useClickOutside(() => onClose());

    //return nothing if open button hasn't been clicked
    if(!isDeleteOpen) {       
        return(null)
    }

    return (
        <>
            <div className="modal-overlay" />
            <div className="modal" ref={out}>
                <div className="delete"> 
                <h4>Confirm Delete</h4> 
                <button onClick={() => onClose()}>Cancel</button>
                <button className="del-butt" onClick={handleDelete()}>Delete</button>   
                </div>
            </div>
        </>
    );
}
 
export default DeleteModal;