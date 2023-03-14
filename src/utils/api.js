import axios from "axios";

const ncGamesAPI = axios.create({
    baseURL: "https://be-nc-games-project.onrender.com/api",
  });
  
  export const getReviews = (review_id) => {
      let path = '/reviews';

      if (review_id) path += `/${review_id}`;

      return ncGamesAPI.get(path).then((response) => {
        return review_id ? response.data.review : response.data.reviews;
    });
  };