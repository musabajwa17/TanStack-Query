import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
// import EditNote, { Loader as noteLoader, action as actionNote} from './components/EditNote';
import FindNote from './components/FindNote';
import Layout from './components/Layout';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import {  QueryClientProvider } from '@tanstack/react-query';
import ErrorBlock from './components/ErrorBlock';
import { queryClient } from './utility/queryClient';
import VeiwNote from './components/VeiwNote';
import EditNote from './components/EditNote';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/notes'} />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/notes',
        element: <Notes />,
      },
      { path: '/new-note', element: <NewNote /> },
      { path: '/veiw-note/:id', element: <VeiwNote /> },
      { path: '/edit-note/:id', element: <EditNote /> },
      { path: '/find-note', element: <FindNote /> },
    ],
  },
  {
    path: '*',
    element: <ErrorBlock />
  }
]);

function App() {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>;
}

export default App;
