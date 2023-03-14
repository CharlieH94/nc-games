const CommentDeleter = ({comment_id}) => {
    
    const onSubmit = (event) => {
        event.preventDefault();
        deleteCommentById(comment_id).then(deletedComment => {
            console.log(deletedComment);
        })
    }

    return <button onSubmit={onSubmit}>X</button>;
};
