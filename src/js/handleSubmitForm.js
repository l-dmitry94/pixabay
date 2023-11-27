import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

import { createMarkupImages } from './markup';
import { fetchImages } from './pixabay-api';
import { refs } from './refs';

let page = 1;
let query = "";

export async function handleSubmitForm(event) {
    event.preventDefault();

    refs.galleryList.innerHTML = '';
    refs.btnMore.hidden = true

    const { searchQuery } = event.currentTarget.elements;

    query = searchQuery.value.trim();
    if (!query) {
        Notiflix.Notify.warning("Please enter your query")
        return;
    }

    try {
        const data = await fetchImages(query, page);

        if(!data.hits.length) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return
        }

        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)

        refs.galleryList.insertAdjacentHTML(
            'beforeend',
            createMarkupImages(data.hits)
        );

        refs.btnMore.hidden = false

    } catch (error) {
        console.log(error.message);
    } finally {
        searchQuery.value = '';
    }
}

export async function showMoreImages() {
    page++;
    
    const data = await fetchImages(query, page);
    refs.galleryList.insertAdjacentHTML("beforeend", createMarkupImages(data.hits))
}