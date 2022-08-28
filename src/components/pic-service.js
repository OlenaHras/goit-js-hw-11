import axios from "axios";
import Notiflix from 'notiflix';
const API_KEY = '29464393-3094de1b222949b883fcd7df9';
const BASE_URL = 'https://pixabay.com/api/';
const picsPerPage = 40;

export default class PictureApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  };
    
  async fetchArticles(){
    const params = {
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: picsPerPage,
      page:this.page,
    }
    try {
  const response = await axios.get(BASE_URL, { params });
    if (this.page > response.data.totalHits) {
    return  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    };
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    };
    this.page += 1;
    return response.data;
    } catch (error) {
       Notiflix.Notify.failure(`Sorry, there are some problem: ${error.response} Please try again.`);
      console.log(error.response);
        };
  };
  
  resetPage() {
    this.page = 1;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

};