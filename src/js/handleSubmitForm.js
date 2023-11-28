import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createMarkupImages } from './markup';
import { fetchImages } from './pixabay-api';
import { refs } from './refs';

let page = 1;
let query = '';

let lightbox = new SimpleLightbox('.gallery__card-link', {
    captionDelay: 250,
    captionsData: 'alt',
});

let options = {
    root: null,
    rootMargin: '200px',  
    threshold: 1.0,
};

let observer = new IntersectionObserver(showMoreImages, options);

export async function handleSubmitForm(event) {
    event.preventDefault();

    observer.unobserve(refs.target)
    refs.galleryList.innerHTML = '';
    page = 1;

    const { searchQuery } = event.currentTarget.elements;

    query = searchQuery.value.trim();
    if (!query) {
        Notiflix.Notify.warning('Please enter your query');
        return;
    }

    try {
        const data = await fetchImages(query, page);

        if (!data.hits.length) {
            Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
        }

        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

        refs.galleryList.insertAdjacentHTML(
            'beforeend',
            createMarkupImages(data.hits)
        );

        lightbox.refresh();

        if (page >= Math.ceil(data.totalHits / data.hits.length)) {
            Notiflix.Notify.warning('There are no more images');
            observer.unobserve(refs.target);
            return;
        }
        
        observer.observe(refs.target);
    } catch (error) {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(
            'Sorry, something went wrong. Please try again.'
        );
    } finally {
        searchQuery.value = '';
    }
}

export async function showMoreImages(entries, observer) {
    entries.forEach(async entry => {
        if (entry.isIntersecting) {
            try {
                const data = await fetchImages(query, page += 1);
                refs.galleryList.insertAdjacentHTML(
                    'beforeend',
                    createMarkupImages(data.hits)
                );


                if (page >= Math.ceil(data.totalHits / data.hits.length)) {
                    Notiflix.Notify.warning('There are no more images');
                    observer.unobserve(refs.target);
                    return;
                }

                lightbox.refresh();
            } catch (error) {
                Notiflix.Loading.remove();
                Notiflix.Notify.failure(
                    'Sorry, something went wrong. Please try again.'
                );
            }
        }
    });
}
