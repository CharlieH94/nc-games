import { useEffect, useState } from "react";
import Nav from "./Nav";
import ReviewCard from "./ReviewCard";
import { getReviews } from "../utils/api";
import { useSearchParams } from "react-router-dom";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const sort_by = searchParams.get('sort_by')
    const category = searchParams.get('category')

    const params = {sort_by, category};

    useEffect(() => {
        setIsLoading(true);
        getReviews().then(reviewData => { 
            setReviews(reviewData);
            setIsLoading(false);
        } );
    }, [])

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