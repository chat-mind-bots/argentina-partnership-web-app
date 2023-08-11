import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "shared/router";

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
