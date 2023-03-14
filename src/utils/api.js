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

export const getCommentsById = (review_id) => {
  let path = '/reviews';

  if (review_id) path += `/${review_id}/comments`;

  return ncGamesAPI.get(path).then((response) => {
    console.log(response)
    return response.data.comments;
  });
};

export const postComment = (review_id, newComment) => {
  let path = `/reviews/${review_id}/comments`;
  
  return ncGamesAPI.post(path, newComment).then(response => {
    console.log(response.data.comment);
  });
};

export const deleteCommentById = (comment_id) => {
  let path = `/comments/${comment_id}`;
  
  return ncGamesAPI.delete(path).then(response => {
    console.log(response);
  });
}
