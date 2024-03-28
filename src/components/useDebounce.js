import { useEffect, useState } from "react";

export function useDebounce(value , delay){
    const [debounce , setDebounce]  = useState("");

    useEffect(()=>{
    const timeOut =   setTimeout(()=>{
       setDebounce(value);
      }, delay)

      return ()=>{
      clearTimeout(timeOut);
      }
    }, [value , delay])
    return debounce
}