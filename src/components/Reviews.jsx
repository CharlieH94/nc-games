import { useEffect, useState } from "react";
import Nav from "./Nav";
import ReviewCard from "./ReviewCard";
import { getReviews } from "../utils/api";

const Reviews = () => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getReviews().then(reviewData => setReviews(reviewData));
    }, [])

    return (
        <main>
            <Nav />
            <ul className='reviews-list'>
                {reviews.map(review => {
                    return <li key={review.created_at}><ReviewCard review={review} /></li>
                })}
            </ul>
        </main>
    )
}

export default Reviews;