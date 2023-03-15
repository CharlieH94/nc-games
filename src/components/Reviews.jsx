import { useEffect, useState } from "react";
import Nav from "./Nav";
import ReviewCard from "./ReviewCard";
import { getReviews } from "../utils/api";
import { useParams } from "react-router-dom";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userSelectedCategory } = useParams();

    useEffect(() => {
        setIsLoading(true);
        getReviews().then(reviewData => {
            const filteredReviews = reviewData.filter(review => {
                return review.category === userSelectedCategory;
            })
            if (userSelectedCategory) setReviews(filteredReviews);
            else setReviews(reviewData)
            setIsLoading(false);
        } );
    }, [userSelectedCategory])

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