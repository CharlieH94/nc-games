import { useParams } from "react-router";

const SingleReview = () => {
    const {review_id} = useParams;
    console.log(review_id)


    return (
        <p>hello there</p>
    )
};

export default SingleReview;