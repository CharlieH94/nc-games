import { useState } from "react";
import { postComment } from "../utils/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { UserContext } from '../contexts/User';
import { Link } from "react-router-dom";

const CommentAdder = ({ review_id, setComments }) => {
    const { user } = useContext(UserContext)

    const [newComment, setNewComment] = useState({
        username: user.username,
        body: ''
    });

    const onChange = (event) => {
        setNewComment({...newComment, body: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (newComment.body !== '') {
            postComment(review_id, newComment).then(postedComment => {
                setComments((currentComments) => {
                    return [postedComment, ...currentComments]
                })
            }).then(() => toast.success('Comment posted'))
            .catch(error => {
                if(error) toast.error('Comment post unsuccessful')
            })
            setNewComment({
                username: user.username,
                body: ''
            })
        }
       else toast.warn('Please enter a comment to post')
    }

    return (
        <form onSubmit={onSubmit} id='comment-adder'>
            <label htmlFor='new-comment'><strong>Comments</strong></label>
            {user.authorised ? 
                <div className='new-comment__container'>
                <textarea type='text' placeholder='Type comment...' id='new-comment' value={newComment.body} onChange={onChange} />
                <button type='submit'>Post</button>
                </div>
                : <p className='comment-login'><Link to='/'>Log in</Link> to comment or vote!</p>
            }
            <ToastContainer theme='colored'/>
        </form>
    )
};

export default CommentAdder;