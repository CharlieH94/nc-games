import axios from "axios";

const ncGamesAPI = axios.create({
    baseURL: "https://be-nc-games-project.onrender.com/api",
  });
  
  export const getReviews = () => {
    return ncGamesAPI.get("/reviews").then((response) => {
      return response.data.reviews;
    });
  };