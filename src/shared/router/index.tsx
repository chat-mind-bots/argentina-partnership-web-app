import { createBrowserRouter, useLoaderData } from "react-router-dom";
import React from "react";
import CreateBusinessForm from "shared/business/create-business-form";

export const router = createBrowserRouter([
  {
    path: "/partner",
    Component() {
      return <CreateBusinessForm />;
    },
  },
  {
    path: "/:userId/:businessId",
    Component() {
      return <div>List</div>;
    },
  },
  {
    path: "*",
    Component() {
      return <div>Not found</div>;
    },
  },
]);
