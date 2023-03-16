import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCategories } from "../utils/api";


const Nav = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [params, setParams] = useSearchParams();
    // const [navSelection, setNavSelection] = useState(null);

    const navOption = params.get('category');
    // if (navOption !== navSelection) setNavSelection(navOption);

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
                    {window.location.pathname === '/reviews' && navOption === null ? 
                    <Link to='/reviews' key='reviews' style={{ textDecoration: 'none' }}>
                        <li id='selected'>All Reviews</li>
                    </Link>
                    : <Link to='/reviews' key='reviews' style={{ textDecoration: 'none' }}>
                        <li>All Reviews</li>
                    </Link>
                    }
                    {categories.map(category => {
                        const navCat = category.split('-').map(word => {
                            return word[0].toUpperCase() + word.slice(1);
                    }).join(' ')
                    const path = `/reviews?category=${category}`;
                    return category === navOption ?
                        <Link to={path} key={category} style={{ textDecoration: 'none' }} >
                            <li id='selected'>{navCat}</li>
                        </Link>
                        :
                        <Link to={path} key={category} style={{ textDecoration: 'none' }}>
                            <li>{navCat}</li>
                        </Link>
                })} 
            </ul>
        </nav> 
    )
};

export default Nav;