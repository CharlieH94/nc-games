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
                <Link to='/reviews' key='reviews' style={{ textDecoration: 'none' }}>
                    <li id='all-reviews'>All Reviews</li>
                </Link>
                {categories.map(category => {
                    const path = `/reviews?category=${category}`;
                    return (
                        <Link to={path} key={category} style={{ textDecoration: 'none' }}>
                            <li>{category}</li>
                        </Link>
                    )
                })} 
            </ul>
        </nav> 
    )
};

export default Nav;