import { useEffect, useState } from "react";
import { getCommentsById } from "../utils/api";

const CommentsList = ({ review_id }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        getCommentsById(review_id).then(commentsData => {
            setComments(commentsData);
            setIsLoading(false);
        })
    }, [review_id])

    return isLoading ? (
        <div>
            <p>Loading Comments...</p>
        </div>
    )
        : (
            <section className='comments'>
                <ul className='comments__list'>
                    {comments.map(comment => {
                        const { author, body, created_at, votes, comment_id } = comment;
                        return (
                            <li key={comment_id} className='comment-card'>
                                <div className='comment-header'>
                                    <p><strong>{author}</strong></p>
                                </div>
                                <p className='comment-body'>{body}</p>
                                <div className='comment-footer'>
                                    <p><em>{Date(created_at).split(' G')[0]}</em></p>
                                    <p>Likes: {votes}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        )
};

export default CommentsList;