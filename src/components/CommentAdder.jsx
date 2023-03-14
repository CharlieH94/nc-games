import { useState } from "react";
import { postComment } from "../utils/api";

const CommentAdder = ({review_id, setComments}) => {
    const [newComment, setNewComment] = useState({
        username: 'jessjelly',
        body: ''
    });

    const onChange = (event) => {
        setNewComment({...newComment, body: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        postComment(review_id, newComment).then(postedComment => {
            setComments((currentComments) => {
                return [postedComment, ...currentComments]
            })
        })
        setNewComment({
            username: 'jessjelly',
            body: ''
        })
    }

    return (
        <form onSubmit={onSubmit} id='comment-adder'>
            <label htmlFor='new-comment'><strong>Comment:</strong></label>
            <div className='new-comment__container'>
                <textarea type='text' placeholder='Type comment...' id='new-comment' value={newComment.body} onChange={onChange} />
                <button type='submit'>Post</button>
            </div>
        </form>
    )
};

export default CommentAdder;