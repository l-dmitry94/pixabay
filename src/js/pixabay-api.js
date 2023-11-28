import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

export async function fetchImages(q, page = 1) {
    const API_KEY = '39796826-5323de49fb67ecd68459fdb2a';
    const BASE_URL = 'https://pixabay.com/api/';

    const params = new URLSearchParams({
        key: API_KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
    });

    Notiflix.Loading.standard();

    const { data } = await axios({
        method: 'GET',
        url: `${BASE_URL}?${params}`,
    });

    Notiflix.Loading.remove();

    return data;
}
