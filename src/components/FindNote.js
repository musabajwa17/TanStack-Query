import { useState } from 'react';
import ErrorBlock from './ErrorBlock';
import LoadingBlock from './LoadingBlock';
import Note from './Note';
import { useQuery } from '@tanstack/react-query';
import { searchNotes } from '../utility/http';
import { useDebounce } from './useDebounce';

const FindNote = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const value = useDebounce(searchTerm, 500);
  const {data = [], isLoading  , error} = useQuery({
    queryKey: ['notes',{ searchTerm : value } ],
    queryFn: ()=> searchNotes(value),
    enabled: !!value,
    staleTime: 1000*30
  })

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // useEffect(() => {
  //   // debounce the API call
  //   const timeoutId = setTimeout(async () => {
  //     setSearchResults([]);
  //     if (!searchTerm) return;
  //     setError('');
  //     setIsLoading(true);
  //     try {
  //       setSearchResults(data);
  //     } catch (error) {
  //       setError('Something went wrong!');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }, 500); // wait for 500ms before making the API call

  //   // clear the timeout on every key press
  //   return () => clearTimeout(timeoutId);
  // }, [searchTerm]);
  let content = "type anything to search notes" ;

   if(isLoading){
    content = <LoadingBlock />
   } 
   if(error) {
    content = <ErrorBlock message={error} />
   }
   if(data) {
    content = data.map((note) => (
      <Note key={note.id} note={note} />
) )}
  return (
    <div className='find-note-container'>
      <input type='text' placeholder='Search notes' value={searchTerm} onChange={handleSearch} />
      <div className='search-results-container'>
       {content}
      </div>
    </div>
  );
};

export default FindNote;
