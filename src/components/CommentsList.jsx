import { useEffect, useState } from "react";
import { getCommentsById } from "../utils/api";
import CommentAdder from "./CommentAdder";
import CommentDeleter from "./CommentDeleter";

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
            <section>
                <ul>
                    <li>
                        <CommentAdder review_id={review_id} />
                    </li>
                    {comments.map(comment => {
                        const { author, body, created_at, votes, comment_id } = comment;
                        return (
                            <li>
                                <p>{author}</p>
                                <p>{body}</p>
                                <p>posted at {created_at}</p>
                                <p>Likes: {votes}</p>
                                {/* {isOwner && <CommentDeleter review_id={review_id}/>} */}
                            </li>
                        )
                    })}
                </ul>
            </section>
        )
};

export default CommentsList;