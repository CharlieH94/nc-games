import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/api";


const Nav = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCategories().then(categoriesData => {
            const populatedCategories = categoriesData.map(category => category.slug)
            setCategories(populatedCategories);
            setIsLoading(false);
        }) 
    }, [])

    return isLoading ?
            <p className='selection'>Loading Navigation...</p>
        : (
        <nav className='selection'>
            <ul>
                <Link to='/reviews' key='reviews' style={{ textDecoration: 'none' }}>
                    <li id='all-reviews'>All Reviews</li>
                </Link>
                    {categories.map(category => {
                        const navCat = category.split('-').map(word => {
                            return word[0].toUpperCase() + word.slice(1);
                    }).join(' ')
                    const path = `/reviews?category=${category}`;
                    return (
                        <Link to={path} key={category} style={{ textDecoration: 'none' }}>
                            <li>{navCat}</li>
                        </Link>
                    )
                })} 
            </ul>
        </nav> 
    )
};

export default Nav;