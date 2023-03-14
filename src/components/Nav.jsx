import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/api";


const Nav = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(categoriesData => {
            const populatedCategories = categoriesData.map(category => category.slug)
            setCategories(populatedCategories);
        }) 
    }, [])

    return (
        <nav className='selection'>
            <ul>
                {categories.map(category => {
                    const path = `/${category}/reviews`;
                    return (
                        <Link to={path} key={category}>
                            <li>{category}</li>
                        </Link>
                    )
                })}
                <Link to='/reviews' key='reviews'>
                    <li >Reviews</li>
                </Link>
            </ul>
        </nav> 
    )
};

export default Nav;