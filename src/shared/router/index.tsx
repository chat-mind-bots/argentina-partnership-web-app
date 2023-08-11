import { createBrowserRouter, useLoaderData } from "react-router-dom";
import React from "react";
import CreateBusinessForm from "shared/business/create-business-form";
import { JsonplaceholderResp, loadData } from "shared/business/data";
import Partners from "shared/partners";

export const router = createBrowserRouter([
  {
    path: "/partners",
    loader: () => loadData(),
    Component() {
      const data = useLoaderData() as JsonplaceholderResp;
      return <Partners />;
    },
  },
  {
    path: "/create/business",
    Component() {
      return <CreateBusinessForm />;
    },
  },
  {
    path: "/partner/:userId/:businessId",
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
