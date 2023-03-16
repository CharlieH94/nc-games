import { deleteCommentById } from "../utils/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/User';

const CommentDeleter = ({comment: {comment_id, author}, setComments }) => {
    const { user } = useContext(UserContext);
    const [isDisabled, setIsDisabled] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault();
        setIsDisabled(true);
        deleteCommentById(comment_id).then(() => {
            setComments((currentComments) => {
                const filteredComments = currentComments.filter(commentToDelete => {
                    return commentToDelete.comment_id !== comment_id;
                })
                return [...filteredComments]
            })
        }).then(() => toast.success('Comment deleted'))
        .catch(error => {
            if (error) {
                setIsDisabled(false);
                toast.error('Comment deletion unsuccessful')
            } 
        })
    }

    const canDelete = user.username === author ? true : false;
    
    if (canDelete) {
        return (
            <form onSubmit={onSubmit}id='delete-form'>
                <button type='submit' id='delete-form__btn' disabled={isDisabled}>x</button>
                <ToastContainer theme='colored'/>
            </form>
        );
    }
};

export default CommentDeleter;