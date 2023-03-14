import { deleteCommentById } from "../utils/api";

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
        })
    }

    return (
        <form onSubmit={onSubmit}id='delete-form'>
            <button type='submit' id='delete-form__btn'>x</button>
        </form>
    );
};

export default CommentDeleter;