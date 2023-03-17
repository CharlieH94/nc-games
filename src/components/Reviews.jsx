import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { getReviews } from "../utils/api";
import ErrorPage from "./ErrorPage";

const Reviews = ({params, reviews, setReviews}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getReviews(null, params).then(reviewData => {
            setReviews(reviewData)
            setIsLoading(false);
        } ).catch(err => setError(err));
    }, [params, setReviews])

    if (error) return <ErrorPage error={error.message}/>

    return isLoading ? <p>Loading Page...</p>
        : (
        <main>
                <ul className='reviews-list'>
                {reviews.map(review => {
                    return <li key={review.title}><ReviewCard review={review} /></li>
                })}
            </ul>
        </main>
    )
}

export default Reviews;