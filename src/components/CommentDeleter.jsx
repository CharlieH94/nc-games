import { deleteCommentById } from "../utils/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentDeleter = ({ comment_id, setComments }) => {
    
    const onSubmit = (event) => {
        event.preventDefault();
        deleteCommentById(comment_id).then(() => {
            setComments((currentComments) => {
                const filteredComments = currentComments.filter(commentToDelete => {
                    return commentToDelete.comment_id !== comment_id;
                })
                return [...filteredComments]
            })
        }).then(() => toast.success('Comment deleted'))
        .catch(error => {
            if(error) toast.error('Comment deletion unsuccessful')
        })
    }

    return (
        <form onSubmit={onSubmit}id='delete-form'>
            <button type='submit' id='delete-form__btn'>x</button>
            <ToastContainer theme='colored'/>
        </form>
    );
};

export default CommentDeleter;