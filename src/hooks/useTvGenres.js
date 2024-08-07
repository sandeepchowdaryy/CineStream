import { API_Options } from "../utils/constants";

export const fetchGenres = async() => {
    const data = await fetch(
        "https://api.themoviedb.org/3/genre/tv/list?language=en-US",
        API_Options
      );
      const json = await data.json();
      return json;
}
