import React from 'react'
import Note from './Note'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { veiwNote } from '../utility/http';
import LoadingBlock from './LoadingBlock';
import ErrorBlock from './ErrorBlock';
// const data = 
//   {
//     id :81,
//   title : "tanstack Query",
//   description :"Use mutation query",
//   date :"2024-01-15T04:54:08.133Z"
// }
const VeiwNote = () => {
    const params = useParams();
    const { data, isLoading, isError , error} = useQuery({
      queryKey: ['notes', {id:  params.id}],
      queryFn: ()=> veiwNote({id :params.id}),
      staleTime: 10 * 3000 
    })
    let content = "";
    if(isLoading) content = <LoadingBlock />
    if(isError) content = <ErrorBlock message={error}/>
    if(data) content = <Note note={data} />
  return (
    <div className='notes-container'>
    <h1>Veiwing Notes</h1>
      <div className='notes-wrapper'>
        {content}
      </div>
    </div>
  )
}

export default VeiwNote