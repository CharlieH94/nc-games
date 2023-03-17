import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviews, patchReviewById } from "../utils/api";
import CommentsList from "./CommentsList";
import ErrorPage from "./ErrorPage";

const SingleReview = () => {
    const [review, setReview] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { review_id } = useParams();
    const { review_img_url, title, owner, category, review_body, votes, created_at } = review;
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getReviews(+review_id).then(reviewData => {
            setReview(reviewData);
            setIsLoading(false);
        }).catch(err => setError(err));
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
            }).catch(err => setError(err));;
        } else if (liked) {
            setReview((currentReview) => {
                setLiked(false);
                return {...currentReview, votes: votes - 1}
            })
            patchReviewById(review_id, -1).catch(() => {
                setLiked(true);
                setReview(currentReview => {
                    return { ...currentReview, votes: votes + 1 };
                })
            }).catch(err => setError(err));;
        }
    }
    
    // const downVote = (review_id) => {
    //     if (liked) {
    //         setReview((currentReview) => {
    //             setLiked(false);
    //             return {...currentReview, votes: votes - 1}
    //         })
    //         patchReviewById(review_id, -1).catch(() => {
    //             setLiked(true);
    //             setReview(currentReview => {
    //                 return { ...currentReview, votes: votes + 1 };
    //             })
    //         });
    //     }
    // }


    if (error) return <ErrorPage error={error.message}/>

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
                            <button id='like-btn' style={{color: liked ? 'green' : 'black'}} onClick={() => upVote(review_id)} ><i className="fa-solid fa-thumbs-up"></i></button>
                            {/* <button id='dislike-btn' onClick={() => downVote(review_id)} disabled={!liked}><i className="fa-solid fa-thumbs-down"></i></button> */}
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