import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Login from "./Login";
import Browse from "./Browse";
import { MovieDetails } from "./MovieDetails";
import Layout from "./Layout";
import { Search } from "./Search";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path:"search",
        element:<Search/>
      },
      {
        path: "movie/:movieId",
        element: <MovieDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
