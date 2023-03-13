import { Link } from "react-router-dom";

const ReviewCard = ({ review: {review_id, title, designer, owner, review_img_url, category, created_at, votes } }) => {
    return (
        <Link to={`/reviews/${review_id}`} style={{ textDecoration:'none' }}>
            <section className='review'>
                <figure>
                    <img src={review_img_url} alt={title} className='review__img'/>
                </figure>
                <figcaption>
                    <h2 className='review__title'>{title}</h2>
                    <p>by {owner}</p>
                    <p>Votes: {votes}</p>
                </figcaption>
            </section>
        </Link>
    )
}

export default ReviewCard;