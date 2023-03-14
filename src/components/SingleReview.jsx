import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import Nav from "./Nav";

const SingleReview = () => {
    const [review, setReview] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { review_id } = useParams();
    const { review_img_url, title, owner, category, review_body, votes, comment_count, created_at } = review;

    useEffect(() => {
        setIsLoading(true);
        getReviews(+review_id).then(reviewData => {
            setReview(reviewData);
            setIsLoading(false);
        })
    }, [review_id])

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
                    <h2 className='single-review__title'>{title}</h2>
                    <figure>
                        <img src={review_img_url} alt={title} className='single-review__img'/>
                    </figure>
                    <figcaption>
                        <h3 className='single-review__owner'>by {owner}</h3>
                        <h4><em>{category}</em></h4>
                        <p className='single-review__body'>{review_body}</p>
                    </figcaption>
                    <div className='popularity-stats'>
                            <p>Comment Count: {comment_count}</p>
                            <p>Votes: {votes}</p>
                        </div>
                </section>
            </>     
    )
};

export default SingleReview;