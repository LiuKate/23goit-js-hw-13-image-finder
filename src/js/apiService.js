
export default class ImageApiService {

    constructor() {
        this.searchQuery = '';
        this.page = 1;
     
    }
    
    fetchImages() {

    const BASE_URL = 'https://pixabay.com/api/';
            
    return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=19366770-ca18693f598aea950bc0ba083`)
     .then(response =>
                response.json())
      .then(data => {
                this.incrementPage();
                return data.hits;
      });
  }

    incrementPage() {
    this.page += 1;
  }

    resetPage() {
    this.page = 1;
  }

    get query() {
    return this.searchQuery;
  }

    set query(newQuery) {
    this.searchQuery = newQuery;
  }
}


        