import { useParams } from "react-router-dom";
import Reviews from "./Reviews";

const SingleCategory = () => {
    const { userSelectedCategory } = useParams();

    return <Reviews category={userSelectedCategory} />;
};

export default SingleCategory;