import { useEffect, useState } from "react";
import Nav from "./Nav";
import ReviewCard from "./ReviewCard";
import { getReviews } from "../utils/api";
import { useSearchParams } from "react-router-dom";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const userSelectedCategory = searchParams.get('category')

    useEffect(() => {
        setIsLoading(true);
        getReviews(null, userSelectedCategory).then(reviewData => {
            setReviews(reviewData)
            setIsLoading(false);
        } );
    }, [userSelectedCategory])

    return isLoading ? (
        <>
            <Nav />
            <p>Loading Page...</p>
        </>)
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