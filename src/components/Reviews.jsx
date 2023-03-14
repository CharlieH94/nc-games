import { useEffect, useState } from "react";
import Nav from "./Nav";
import ReviewCard from "./ReviewCard";
import { getReviews } from "../utils/api";

const Reviews = ({category}) => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getReviews().then(reviewData => {
            const filteredReviews = reviewData.filter(review => {
                return review.category === category;
            })
            if (category) setReviews(filteredReviews);
            else setReviews(reviewData)
            setIsLoading(false);
        } );
    }, [category])

    return isLoading ?
        <p>Loading Page...</p>
        : (
        <main>
            <Nav />
            <ul className='reviews-list'>
                {reviews.map(review => {
                    return <li key={review.title}><ReviewCard review={review} /></li>
                })}
            </ul>
        </main>
    )
}

export default Reviews;