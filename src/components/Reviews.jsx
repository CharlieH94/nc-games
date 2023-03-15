import { useEffect, useState } from "react";
import Nav from "./Nav";
import ReviewCard from "./ReviewCard";
import { getReviews } from "../utils/api";
import { useSearchParams } from "react-router-dom";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortByCommentCount, setSortByCommentCount] = useState(false);
    const [sortBySelection, setSortBySelection] = useState(null);
    const [orderSelection, setOrderSelection] = useState(null);

    const userSelectedCategory = searchParams.get('category')
    const userSelectedSortBy = searchParams.get('sort_by')
    const userSelectedOrder = searchParams.get('order')

    const params = {category: userSelectedCategory, sort_by: userSelectedSortBy, order: userSelectedOrder};
    
    useEffect(() => {
        setIsLoading(true);
        getReviews(null, params).then(reviewData => {
            setReviews(reviewData)
            setIsLoading(false);
        } );
    }, [userSelectedCategory])


    const onSubmit = (event) => {
        event.preventDefault();
    }

    const onChange = (event) => {
        const query = event.target.id;
        const option = event.target.value;
        console.log(option);
        
        if (query === 'sort_by') {
            if (option === 'Comment Count') setSortByCommentCount(true);
            else if (option === 'Date') setSortBySelection('');
            else if (option === 'Votes') setSortBySelection('');
        }
        
        if (query === 'order-by') {
            if (option === 'Ascending') return;
            else if (option === 'Descending') return;
        }
    }

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
                    <label>Sort By: </label>
                    <select name="" id='sort-by' onChange={onChange} defaultValue="default">
                        <option value="default" key="no-select" disabled>Select sort option</option>
                        <option key='date'>Date</option>
                        <option>Votes</option>
                        <option>Comment Count</option>
                    </select>
                </div>
                    <div id='order-input'>
                    <label>Order: </label>
                    <select name="" id='order-by' onChange={onChange} defaultValue="default">
                        <option value="default" key="no-select" disabled>Select order</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select>
                </div>
            </form>
                {reviews.map(review => {
                    return <li key={review.title}><ReviewCard review={review} /></li>
                })}
            </ul>
        </main>
    )
}

export default Reviews;