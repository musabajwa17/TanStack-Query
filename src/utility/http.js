// import { response } from "express";

export async function fetchNotes(){
 const response = await fetch('http://localhost:8001/notes')
  return await handleResponse(response)
}
export async function searchNotes(searchTerm){
    const response = await fetch(`http://localhost:8001/search?query=${searchTerm}`);
    return await handleResponse(res)
}
export async function veiwNote(id){
  console.log(id)
   const response = await fetch(`http://localhost:8001/search?query=${id.id}`);
   return await handleResponse(response)
}


export async function addNewNote(note){
    const response = await fetch('http://localhost:8001/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
      }),
    })
    return await handleResponse(response)
}

export async function updateNotes({id,payload}){
  console.log(id,payload)
  const response = await fetch(`http://localhost:8001/notes/${id.id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: payload.title,
        description: payload.description,
      }),
    })
    return await handleResponse(response);
}

async function handleResponse(res){
    if(!res.ok) { 
        const error = new Error("Something went wrong");
        error.code = res.status;
        error.message = error.code === 404 ? "Something is wrong " : await res.json();
    throw error
}
    return await res.json();
}