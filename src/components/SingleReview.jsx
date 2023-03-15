import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviews, patchReviewById } from "../utils/api";
import Nav from "./Nav";
import CommentsList from "./CommentsList";

const SingleReview = () => {
    const [review, setReview] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { review_id } = useParams();
    const { review_img_url, title, owner, category, review_body, votes, created_at } = review;
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getReviews(+review_id).then(reviewData => {
            setReview(reviewData);
            setIsLoading(false);
        })
    }, [review_id])

    
    const upVote = (review_id) => {
        if (!liked) {
            setReview((currentReview) => {
                setLiked(true);
                return {...currentReview, votes: votes + 1}
            })
            patchReviewById(review_id, 1).catch(() => {
                setLiked(false);
                setReview(currentReview => {
                    return { ...currentReview, votes: votes - 1 };
                })
            });
        }
    }
    
    const downVote = (review_id) => {
        if (liked) {
            setReview((currentReview) => {
                setLiked(false);
                return {...currentReview, votes: votes - 1}
            })
            patchReviewById(review_id, -1).catch(() => {
                setLiked(true);
                setReview(currentReview => {
                    return { ...currentReview, votes: votes + 1 };
                })
            });
        }
    }

    return isLoading ? (
        <div>
            <Nav />
            <p>Loading Review...</p>
        </div>
    )
        :  (
            <>
                <Nav />
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
                        <h4><em>{category}</em></h4>
                        <div className='votes-container'>
                            <p>Votes: {votes}</p>
                            <button id='like-btn' onClick={() => upVote(review_id)} disabled={liked}><i className="fa-solid fa-thumbs-up"></i></button>
                            <button id='dislike-btn' onClick={() => downVote(review_id)} disabled={!liked}><i className="fa-solid fa-thumbs-down"></i></button>
                        </div>
                    </figcaption>
                </section>
                <CommentsList review_id={review_id} />
            </>     
    )
};

export default SingleReview;

export const dateFormatter = (created_at) => {
    const splitDate = created_at.split('T');
    const firstHalf = splitDate[0].split('-').reverse().join('-');
    const secondHalf = splitDate[1].split('.')[0].slice(0, -3);

    return `${firstHalf} ${secondHalf}`
}