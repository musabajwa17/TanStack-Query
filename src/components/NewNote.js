
import { useNavigate } from 'react-router-dom';
import NoteForm from './NoteForm';
import { useMutation } from '@tanstack/react-query';
import { addNewNote } from '../utility/http';
import { queryClient } from '../utility/queryClient';

const NewNote = () => {
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const {mutate} = useMutation({
    mutationFn: addNewNote,
    onSuccess: ()=> 
    { 
      queryClient.invalidateQueries({
        queryKey: ['notes']
      })
      navigate('/')
      
    }
  })
  function noteSubmissionHandler(note){
    mutate(note)
  }
  // const noteSubmissionHandler = (note) => {
  //   setError(null);
  //   fetch('http://localhost:8001/notes', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       title: note.title,
  //       description: note.description,
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.status === 422) return response.json();
  //       if (!response.ok) {
  //         throw new Error({ msg: 'Can not add new note!' });
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.error) {
  //         setError(data.error);
  //         return;
  //       }
  //       navigate('/');
  //     })
  //     .catch((error) => console.log(error));
  // };
  return (
    <div className='new-note-container'>
      <h1>Add Note!</h1>
      {/* {error &&
        Object.values(error).map((err) => (
          <p className='error' key={err}>
            {err}
          </p>
        ))} */}
      <NoteForm onSubmit={noteSubmissionHandler} />
    </div>
  );
};
export default NewNote;
