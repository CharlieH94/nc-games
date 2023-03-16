import axios from "axios";

const ncGamesAPI = axios.create({
    baseURL: "https://be-nc-games-project.onrender.com/api",
  });
  
  export const getReviews = (review_id, category) => {
    let path = '/reviews';

    if (review_id) path += `/${review_id}`;

    return ncGamesAPI.get(path, {
      params: {
        category: category
      }
    }).then((response) => {
      return review_id ? response.data.review : response.data.reviews;
  });
};

export const getCommentsById = (review_id) => {
  let path = '/reviews';

  if (review_id) path += `/${review_id}/comments`;

  return ncGamesAPI.get(path).then((response) => {
    return response.data.comments;
  });
};

export const patchReviewById = (review_id, voteChange) => {
  let path = `/reviews/${review_id}`;
  const body = {inc_votes: voteChange}
  return ncGamesAPI.patch(path, body).then(response => {
    return response.data.review;
  });
};

export const postComment = (review_id, newComment) => {
  let path = `/reviews/${review_id}/comments`;
  
  return ncGamesAPI.post(path, newComment).then(({data}) => {
    return data.comment;
  });
};

export const getCategories = () => {
  return ncGamesAPI.get('/categories').then(({data}) => {
    return data.categories;
  })
}

export const deleteCommentById = (comment_id) => {
  let path = `/comments/${comment_id}`;
  
  return ncGamesAPI.delete(path).then(response => {
    return response;
  });
}
