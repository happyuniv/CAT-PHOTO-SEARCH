import api from "./api.js";
import DarkButton from "./DarkButton.js";
import Carousel from "./Carousel.js";
import SearchSection from "./SearchSection.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";

export default class App {

  constructor($target) {

    this.darkButton = new DarkButton($target);

    this.Carousel = new Carousel($target);

    this.searchSection = new SearchSection({
      $target,
      onSearch: async (keyword,isRandom) => {
        try {
          this.searchResult.setState(null, true, false);
          let res = null;
          if(isRandom) res = await api.fetchCatsRandom();
          else res = await api.fetchCats(keyword);

          this.searchResult.setState(res.data, false, false);
        } catch (e) {
          this.searchResult.setState(null, false, e);
        }
      }
    });

    this.searchResult = new SearchResult({
      $target,
      onClick: async (id) => {
        try {
          this.imageInfo.setState({
            data: null,
            loading: true,
            error: false,
          });

          let res = await api.fetchCatsID(id);
          this.imageInfo.setState({
            data: res.data,
            loading: false,
            error: false
          });
        } catch(e) {
          this.imageInfo.setState({
            data: null,
            loading: false,
            error: e
          })
        } 
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        data: null,
        loading: false,
        error: false
      }
    });
  }

}
