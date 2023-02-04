import { useEffect , useRef} from "react";

//closes a component if a click is made outside of it
const useClickOutside = (func) => {
    
    let node = useRef();

    useEffect(() => {
        const handler = (event) => {
            if(!node.current.contains(event.target))
                func();
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    });

    return node;
}
export default useClickOutside;