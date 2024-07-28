import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Login from "./Login";
import Browse from "./Browse";
import { MovieDetails } from "./MovieDetails";
import Layout from "./Layout";
import { Search } from "./Search";
import Movies from "./Movies";
import TvShows from "./TvShows";
import TvShowDetails from "./TvShowDetails";

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
        path:"movies",
        element:<Movies/>
      },
      {
        path:"tvshows",
        element:<TvShows/>
      },
      {
        path: "movie/:movieId",
        element: <MovieDetails />,
      },
      {
        path: "tv/:tvId",
        element:<TvShowDetails/>
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
