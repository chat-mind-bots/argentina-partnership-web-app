import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";
import Partners from "partners";
import {router} from "shared/router";

function App() {
  return (
      <RouterProvider router={router} fallbackElement={<p>Loading.Ы..</p>} />
  );
}

export default App;
