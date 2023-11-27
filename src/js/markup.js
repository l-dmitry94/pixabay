export function createMarkupImages(arr) {
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
    <li class="gallery__card">
        <a class="gallery__card-link" href="${largeImageURL}">
            <img class="gallery__card-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="gallery__card-info">
                <p class="gallery__card-info-item">
                    <b>Likes</b>
                    ${likes}
                </p>
                <p class="gallery__card-info-item">
                    <b>Views</b>
                    ${views}
                </p>
                <p class="gallery__card-info-item">
                    <b>Comments</b>
                    ${comments}
                </p>
                <p class="gallery__card-info-item">
                    <b>Downloads</b>
                    ${downloads}
                </p>
            </div>
        </a>
    </li>
    `).join("")
}