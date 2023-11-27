import axios from 'axios';

export async function fetchImages(q, page = 1) {
    const API_KEY = '39796826-5323de49fb67ecd68459fdb2a';
    const BASE_URL = 'https://pixabay.com/api';

    const params = new URLSearchParams({
        key: API_KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40
    });

    const { data } = await axios({
        method: 'GET',
        url: `${BASE_URL}/?${params}`,
    });

    return data;
}
