// import { useState } from "react";
import { getReviews } from "../utils/api";


const SortByBar = ({params, orderSelection, setReviews, setOrderSelection, setSortBySelection, sortByCommentCount, setSortByCommentCount}) => {
    // const [isLoading, setIsLoading] = useState(true);

    const onSubmit = (event) => {
        event.preventDefault();
        // setIsLoading(true);
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
            // setIsLoading(false);
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

    return (
        <form id='organise-input' onSubmit={onSubmit}>
                    <div id='sort-input'>
                        <label>Sort By  </label>
                        <select name="" id='sort-by' onChange={onChange} defaultValue="default">
                            <option value="default" key="no-select" disabled>Select sort option</option>
                            <option>Date</option>
                            <option>Votes</option>
                            <option>Comment Count</option>
                        </select>
                    </div>
                    <div id='order-input'>
                    <label>Order  </label>
                    <select name="" id='order-by' onChange={onChange} defaultValue="default">
                        <option value="default" key="no-select" disabled>Select order</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select>
                    </div>
                    <button type='submit' id='sort-btn'>Sort</button>
                </form>
    );
}

export default SortByBar;