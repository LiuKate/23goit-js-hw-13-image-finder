import ImageApiService from './apiService'
import image_gallery from '../templates/image_gallery.hbs'
import LoadMoreBtn from './loadMoreBtn.js'
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

const cardRef = document.querySelector('.js-card-container');
const searchFormRef = document.querySelector('.search-form');


const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

searchFormRef.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);  

function onSearch(event) {
    event.preventDefault();
    clearGalleryMarkup();

    imageApiService.query = event.currentTarget.elements.query.value;

    if (imageApiService.query === '') {
        error({text: "You need to enter at least 1 symbol", delay: 1500,});
        return;
    }
    loadMoreBtn.show();
    imageApiService.resetPage();
    fetchHits();
}

function fetchHits() {
    imageApiService.fetchImages().then(hits => {
        galleryMarkup(hits);
        loadMoreBtn.enable();
    })

}

function onLoadMore() {
 loadMoreBtn.disable();
    imageApiService.fetchImages().then(hits => {
        galleryMarkup(hits);
        loadMoreBtn.enable();
    }); 
    onScrollTo();
}
 
function galleryMarkup(hits) {
    cardRef.insertAdjacentHTML('beforeend', image_gallery(hits));
}

function clearGalleryMarkup() {
    cardRef.innerHTML = '';
} 

function onScrollTo() {
    let value = document.body.scrollHeight;
    
     setTimeout(() => {
      window.scrollTo({
        top: value,
        behavior: 'smooth',
      });
    }, 500);
}
