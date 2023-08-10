import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";
import Partners from "partners";

interface JsonplaceholderResp {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

async function  loadData (): Promise<JsonplaceholderResp> {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
  console.log("Finish")
  return data
}
const router = createBrowserRouter([
  {
    path: "/partners",
    loader: () => loadData(),
    Component() {
      const data = useLoaderData() as JsonplaceholderResp
      return <Partners />
    },
  },
  {
    path:'*',
    Component() {
      return <div>Not found</div>
    }
  }
]);
function App() {
  return (
      <RouterProvider router={router} fallbackElement={<p>Loading.Ы..</p>} />
  );
}

export default App;
