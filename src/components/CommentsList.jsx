import { useEffect, useState } from "react";

const CommentsList = ({ review_id }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        
    }, [])

    return <p>I am the comments list</p>
};

export default CommentsList;