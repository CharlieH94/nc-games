import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviews, patchReviewById } from "../utils/api";
import CommentsList from "./CommentsList";
import ErrorPage from "./ErrorPage";
import { useContext } from 'react';
import { UserContext } from '../contexts/User';

const SingleReview = () => {
    const [review, setReview] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { review_id } = useParams();
    const { review_img_url, title, owner, category, review_body, votes, created_at } = review;
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext)


    useEffect(() => {
        setIsLoading(true);
        getReviews(+review_id).then(reviewData => {
            setReview(reviewData);
            setIsLoading(false);
        }).catch(err => setError(err));
    }, [review_id])

    
    const upVote = (review_id) => {
        if (disliked) {
            setReview((currentReview) => {
                setDisliked(false);
                setLiked(false)
                return {...currentReview, votes: votes + 1}
            })
            patchReviewById(review_id, 1).catch(() => {
                setDisliked(true);
                setReview(currentReview => {
                    return { ...currentReview, votes: votes - 1 };
                })
            }).catch(err => setError(err));
            
        } 
        else if (!disliked) {
            setReview((currentReview) => {
                setLiked(true);
                return {...currentReview, votes: votes + 1}
            })
            patchReviewById(review_id, 1).catch(() => {
                setLiked(false);
                setReview(currentReview => {
                    return { ...currentReview, votes: votes - 1 };
                })
            }).catch(err => setError(err));
        }      
    }
    
    const downVote = (review_id) => {
        if (liked) {
            setReview((currentReview) => {
                setDisliked(false);
                setLiked(false)
                return {...currentReview, votes: votes - 1}
            })
            patchReviewById(review_id, -1).catch(() => {
                setLiked(true);
                setReview(currentReview => {
                    return { ...currentReview, votes: votes + 1 };
                })
            }).catch(err => setError(err));
        } 
        else if (!liked) {
            setReview((currentReview) => {
                setDisliked(true);
                return {...currentReview, votes: votes - 1}
            })
            patchReviewById(review_id, -1).catch(() => {
                setDisliked(false);
                setReview(currentReview => {
                    return { ...currentReview, votes: votes + 1 };
                })
            }).catch(err => setError(err));
        }    
    }


    if (error) return <ErrorPage error={error.message}/>

    let likedColor;
    if (liked & user.authorised) likedColor = 'green';

    let dislikedColor;
    if (disliked & user.authorised) dislikedColor = 'red';

    return isLoading ? <p>Loading Review...</p>
        :  (
            <>
                <section className='single-review'> 
                    <header className='single-review__title'>
                        <h2>{title}</h2>
                        <p><em>{dateFormatter(created_at)}</em></p>
                    </header>
                    <figure>
                        <img src={review_img_url} alt={title} className='single-review__img'/>
                    </figure>
                    <figcaption>
                        <p className='single-review__body'>{review_body}</p>
                        <h3 className='single-review__owner'>by {owner}</h3>
                        <Link to={`/reviews?category=${category}`} className='single-review__category'><em><h4 >{category}</h4></em></Link>
                        <div className='votes-container'>
                            <p>Votes: {votes}</p>
                            <button id='like-btn' style={{backgroundColor: likedColor}} onClick={() => upVote(review_id)} disabled={!user.authorised || liked}><i className="fa-solid fa-thumbs-up"></i></button>
                            <button id='dislike-btn' style={{backgroundColor: dislikedColor}}onClick={() => downVote(review_id)} disabled={!user.authorised || disliked}><i className="fa-solid fa-thumbs-down"></i></button>
                        </div>
                    </figcaption>
                </section>
                <CommentsList review_id={review_id} error={error} setError={setError} />
            </>     
    )
};

export default SingleReview;

export const dateFormatter = (created_at) => {
    if (created_at !== undefined) {
        const splitDate = created_at.split('T');
        const firstHalf = splitDate[0].split('-').reverse().join('-');
        const secondHalf = splitDate[1].split('.')[0].slice(0, -3);
    
        return `${firstHalf} ${secondHalf}`
    }
}