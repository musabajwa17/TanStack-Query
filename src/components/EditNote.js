import {  useNavigate, useParams , useNavigation } from 'react-router-dom';
import ErrorBlock from './ErrorBlock';
import LoadingBlock from './LoadingBlock';
import NoteForm from './NoteForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateNotes, veiwNote } from '../utility/http';
import { queryClient } from '../utility/queryClient';

const EditNote = () => {
  const navigate = useNavigate();
  const params = useParams();
  // const submit = useSubmit();
  const navigation = useNavigation();

 const {data, isLoading, isError, error} =  useQuery({
    queryKey: ['notes', {id: params.id}],
    queryFn:   ()=> veiwNote({id :params.id})
  })
  console.log(data)
  const {mutate} =  useMutation({
    mutationFn: ()=>updateNotes({id: params.id, payload: note}),
    // onSuccess: ()=>{
    //   queryClient.invalidateQueries({
    //     queryKey: ['notes' , {id: params.id}]
    //   })
    // }
    onMutate: async (data)=>{
      const note = data.payload;
      await queryClient.cancelQueries({
        queryKey: ['notes', {id:  params.id}],
      });
      const previousData = queryClient.getQueryData(['notes', {id:  params.id}])
      queryClient.setQueriesData( ['notes', {id:  params.id}], note)
      return {previousData}
    },
    onError: (error, data, context)=>{
      queryClient.setQueryData(['notes', {id:  params.id}], context.previousData)
    },
    onSettled: ()=>{
      queryClient.invalidateQueries(['notes', {id:  params.id}])
    }
  })
  const noteSubmissionHandler = (note) => {
    mutate({id: params.id, payload: note})
    navigate(`/veiwnote/${params.id}`)
    //  submit(note, {
    //   method: 'PUT'
    //  })
    // setError(null);
    // fetch(`http://localhost:8001/notes/${params.id}/edit`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     title: note.title,
    //     description: note.description,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => navigate('/'))
    //   .catch((error) => setError('Something went wrong!'));
  };
  let content = "";
  if(isLoading) {
    content = <LoadingBlock />
  }
  if(isError) content = <ErrorBlock message={error} />
  if(data) content = <NoteForm data={data} onSubmit={noteSubmissionHandler} />
  console.log(data)
  return (
    <div className='new-note-container'>
      <h1>Edit Note!</h1>
    {content}
    {navigation.state === 'submitting' && "Please Wait....."}
    </div>
  );
};
export default EditNote;

// export function Loader({params}){
//   return queryClient.fetchQuery({
//     queryKey: ['notes', {id: params.id}],
//     queryFn:   ()=> veiwNote({id :params.id})
//   })
// }
// export async function action({params, request}){
//   const formdata = await request.formdata();
//   const data = Object.fromEntries(formdata);
//   await updateNotes({id: params.id, payload: data})
//   queryClient.invalidateQueries(['notes'])
//   redirect("/veiw-note")
// }
