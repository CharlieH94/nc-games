import { useState } from "react";

const CommentAdder = ({review_id}) => {
    const [newComment, setNewComment] = useState({
        username: 'benKenobi',
        body: ''
    });

    const onChange = (event) => {
        setNewComment({...newComment, body: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        postComment(review_id, newComment).then(postedComment => {
            return postedComment;
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor='new-comment'>Comment:</label>
            <input type='text' placeholder='Type comment...' id='new-comment' value={newComment} onChange={onChange} />
            <button type='submit'>Post</button>
        </form>
    )
};

export default CommentAdder;