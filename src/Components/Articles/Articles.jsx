import React, { useState, useEffect } from 'react';
import './Articles.scss';
import { Container } from '../Container/Container';
import placeholderImg from '../../img/one.webp';

export const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const pageSize = 4;

    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const skip = page * pageSize;
            const response = await fetch(
                `https://dummyjson.com/posts?limit=${pageSize}&skip=${skip}&select=title,body,tags,reactions`
            );
            const data = await response.json();

            if (data.posts && data.posts.length > 0) {
                const formattedArticles = data.posts.map(item => ({
                    title: item.title,
                    description: item.body,
                    urlToImage: `https://picsum.photos/seed/${item.id}/600/400`,
                    url: item.id
                }));

                if (page === 0) {
                    setArticles(formattedArticles);
                } else {
                    setArticles(prevArticles => [...prevArticles, ...formattedArticles]);
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
                <h1 className='articles__title'>Latest News & Blog</h1>
                <ul className='articles__list'>
                    {articles.map((item, index) => (
                        <li className="articles__item" key={`${item.url}-${index}`}>
                            <img
                                className='articles__img'
                                src={item.urlToImage || placeholderImg}
                                alt={item.title}
                                loading="lazy"
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