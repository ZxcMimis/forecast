import React, { useState, useEffect } from 'react';
import './Articles.scss';
import { Container } from '../Container/Container';
import placeholderImg from '../../img/one.webp';

export const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [afterToken, setAfterToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const SUBREDDIT = 'aww'; 
    const LIMIT = 4; 

    const fetchArticles = async (isLoadMore = false) => {
        setIsLoading(true);
        try {
            let url = `https://www.reddit.com/r/${SUBREDDIT}/hot.json?limit=${LIMIT}`;
            
            if (isLoadMore && afterToken) {
                url += `&after=${afterToken}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data.data && data.data.children) {
                setAfterToken(data.data.after);

                const newArticles = data.data.children.map(child => {
                    const item = child.data;
                    return {
                        id: item.id,
                        title: item.title,
                        urlToImage: (item.thumbnail && item.thumbnail.startsWith('http')) 
                                    ? item.thumbnail 
                                    : null,
                        url: `https://www.reddit.com${item.permalink}`
                    };
                });

                if (isLoadMore) {
                    setArticles(prevArticles => [...prevArticles, ...newArticles]);
                } else {
                    setArticles(newArticles);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles(false);
    }, []); 

    const handleLoadMore = () => {
        fetchArticles(true);
    };

    return (
        <section className='articles'>
            <Container>
                <h1 className='articles__title'>Interacting with our pets</h1>
                <ul className='articles__list'>
                    {articles.map((item) => (
                        <li className="articles__item" key={item.id}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                <img 
                                    className='articles__img' 
                                    src={item.urlToImage || placeholderImg} 
                                    alt={item.title} 
                                    onError={(e) => {e.target.src = placeholderImg}}
                                />
                                <p className='articles__info'>{item.title}</p>
                            </a>
                        </li>
                    ))}
                </ul>
                <button 
                    className='articles__btn' 
                    onClick={handleLoadMore}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'See more'}
                </button>
            </Container>
        </section>
    );
};