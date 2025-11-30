import React, { useState, useEffect } from 'react';
import './Articles.scss';
import { Container } from '../Container/Container';
import placeholderImg from '../../img/one.webp';

export const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const API_KEY = 'c8499d68006f42569128d5a127bc8d52';
    const pageSize = 4;

    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=pets&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
            );
            const data = await response.json();

            if (data.articles) {
                if (page === 1) {
                    setArticles(data.articles);
                } else {
                    setArticles(prevArticles => [...prevArticles, ...data.articles]);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [page]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <section className='articles'>
            <Container>
                <h1 className='articles__title'>Interacting with our pets</h1>
                <ul className='articles__list'>
                    {articles.map((item, index) => (
                        <li className="articles__item" key={`${item.url}-${index}`}>
                            <img 
                                className='articles__img' 
                                src={item.urlToImage || placeholderImg} 
                                alt={item.title} 
                            />
                            <p className='articles__info'>{item.title}</p>
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