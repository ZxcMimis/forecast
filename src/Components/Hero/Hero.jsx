import './Hero.scss'
import '../reset/reset.scss'
import search from '../../img/search.svg'

export const Hero = () => {
    return (
        <section class="hero">
            <h1 class="hero__title">Weather dashboard</h1>
            <div class="hero__content">
                <p className='hero__context'>Create your personal list of favorite cities and always be aware of the weather.</p>
                <div class="hero__divider"></div>
                <div class="hero__date">
                    <p className='hero__date-one'>October 2023</p>
                    <p className='hero__date-two'>Friday, 13<sup>th</sup></p>
                </div>
            </div>
<div class="hero__search-container">
    <input class="hero__search-input" type="text" placeholder="Search location.." />
    <button class="hero__search-button">
        <svg class="hero__search-icon">
            <use href={search}>

            </use>
        </svg>
    </button>
</div>
        </section>
    )
}