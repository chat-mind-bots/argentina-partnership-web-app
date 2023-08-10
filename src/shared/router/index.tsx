import { createBrowserRouter, useLoaderData } from "react-router-dom";
import React from "react";
import Main from "pages/main";
import Partner from "shared/partner";
import CreateBusinessForm from "shared/business/create-business-form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "partners",
        element: <Partner />,
      },
      {
        path: "business",
        children: [
          {
            path: "list",
            element: <div>лист</div>,
          },
          { path: "create", element: <CreateBusinessForm /> },
        ],
      },
    ],
  },
  {
    path: "*",
    Component() {
      return <div>Not found</div>;
    },
  },
]);
