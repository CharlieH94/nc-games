import { useEffect, useState } from "react";
import Nav from "./Nav";
import ReviewCard from "./ReviewCard";
import { getReviews } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBySelection, setSortBySelection] = useState('created_at');
    const [sortByCommentCount, setSortByCommentCount] = useState(false);
    const [orderSelection, setOrderSelection] = useState('desc');
    const [error, setError] = useState(null);

    const userSelectedCategory = searchParams.get('category')

    const params = {category: userSelectedCategory, sort_by: sortBySelection, order: orderSelection};

    useEffect(() => {
        setIsLoading(true);
        getReviews(null, params).then(reviewData => {
            setReviews(reviewData)
            setIsLoading(false);
        } ).catch(err => setError(err));
    }, [userSelectedCategory])



    const onSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        getReviews(null, params).then(reviewData => {
            if (sortByCommentCount) {
                setSortBySelection('comment_count')
                let sortedReviewsByCount;
                orderSelection === 'desc' ? sortedReviewsByCount = [...reviewData].sort((a, b) => b.comment_count - a.comment_count)
                : sortedReviewsByCount = [...reviewData].sort((a, b) => a.comment_count - b.comment_count)                
                setReviews(sortedReviewsByCount);
            } else {
                setReviews(reviewData)
            }
            setIsLoading(false);
            setSortBySelection('created_at');
            setOrderSelection('desc');
            setSortByCommentCount(false);
        } );
    }

    const onChange = (event) => {
        const query = event.target.id;
        const option = event.target.value;
        
        if (query === 'sort-by') {
            if (option === 'Comment Count') setSortByCommentCount(true);
            else if (option === 'Date') setSortBySelection('created_at');
            else if (option === 'Votes') setSortBySelection('votes');
        }
        
        if (query === 'order-by') {
            if (option === 'Ascending') setOrderSelection('asc');
            else if (option === 'Descending') setOrderSelection('desc');
        }
    }

    if (error) return <ErrorPage error={error.message}/>

    return isLoading ? (
        <>
            <Nav />
            <p>Loading Page...</p>
        </>)
        : (
        <main>
            <Nav />
                <ul className='reviews-list'>
                <form id='organise-input' onSubmit={onSubmit}>
                    <div id='sort-input'>
                        <label>Sort By </label>
                        <select name="" id='sort-by' onChange={onChange} defaultValue="default">
                            <option value="default" key="no-select" disabled>Select sort option</option>
                            <option>Date</option>
                            <option>Votes</option>
                            <option>Comment Count</option>
                        </select>
                    </div>
                    <div id='order-input'>
                    <label>Order </label>
                    <select name="" id='order-by' onChange={onChange} defaultValue="default">
                        <option value="default" key="no-select" disabled>Select order</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select>
                    </div>
                    <button type='submit' id='sort-btn'>Sort</button>
                </form>
                {reviews.map(review => {
                    return <li key={review.title}><ReviewCard review={review} /></li>
                })}
            </ul>
        </main>
    )
}

export default Reviews;