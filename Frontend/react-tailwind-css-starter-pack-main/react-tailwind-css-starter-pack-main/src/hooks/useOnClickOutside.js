import { useEffect } from "react";

const useOnClickOutside = (ref, cb) =>
{
    console.log(ref.current)
    return useEffect(() => 
    {
        const listener = (event) => {
            if(!ref.current || ref.current.contains(event.target))
            {
                return;
            }
            cb(event);
        }

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        }
    }, 
    [ref, cb]);
}

export default useOnClickOutside