import api from './api.js';

export default class SearchResult {
  state = {
    data: [],
    loading: false,
    error: null,
  };

  constructor({ $target, onClick }) {
    this.$target = $target;
    this.$searchResult = document.createElement('section');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.onClick = onClick;

    this.$searchResult.addEventListener('click', (e) => {
      if (e.target.className == 'loaded-image')
        this.onClick(e.target.dataset.id);
    });

    const savedData = sessionStorage.getItem('data');
    if (savedData !== null) {
      this.state.data = JSON.parse(savedData);
      this.render();
    }
  }

  setState(nextData) {
    this.state = nextData;
    this.render();
  }

  lazyLoadObserver() {
    const options = {};
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          entry.target.src = entry.target.dataset.src;
          entry.target.className = 'loaded-image';
        }
      });
    };
    const io = new IntersectionObserver(callback, options);
    const lazyImages = Array.from(document.querySelectorAll('.lazy-image'));
    lazyImages.forEach((image) => io.observe(image));
  }

  scrollObserver() {
    const options = {};
    const callback = (entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const innerLoading = document.createElement('div');
          innerLoading.className = 'more-loading';
          innerLoading.textContent = '로딩중..';
          this.$searchResult.appendChild(innerLoading);
          observer.unobserve(entry.target);
          const tempData = await api.fetchCatsRandom();
          if (tempData.data == null) {
            console.log(tempData);
            const endResult = document.createElement('div');
            endResult.textContent = '끝입니다.';
            this.$searchResult.appendChild(endResult);
            this.$searchResult.removeChild(innerLoading);
            return;
          }
          tempData.data.map((cat) => {
            const loadedImage = document.createElement('img');
            loadedImage.dataset.id = cat.id;
            loadedImage.dataset.src = cat.url;
            loadedImage.alt = cat.name;
            loadedImage.className = 'lazy-image';
            this.$searchResult.appendChild(loadedImage);
          });
          this.$searchResult.removeChild(innerLoading);
          this.lazyLoadObserver();
          const lastImage = document.querySelectorAll('.lazy-image');
          observer.observe(lastImage[lastImage.length - 1]);
        }
      });
    };
    const io = new IntersectionObserver(callback, options);
    const lazyImages = Array.from(document.querySelectorAll('.lazy-image'));
    io.observe(lazyImages[lazyImages.length - 1]);
  }

  render() {
    if (this.state.error) {
      this.$searchResult.innerHTML = `
                <div class="search-error">
                    ${this.state.error.message}
                </div>
            `;
      return;
    }

    if (this.state.loading)
      this.$searchResult.innerHTML = `
            <div class="search-loading">
                로딩중...
            </div>
        `;
    else if (this.state.data == null || this.state.data.length == 0) {
      this.$searchResult.innerHTML = `
                <div class="result-none">
                    검색결과 없음
                </div>
            `;
      sessionStorage.setItem('data', '[]');
    } else {
      this.$searchResult.innerHTML = this.state.data
        .map((cat, index) => {
          if (index < 12)
            return `
                    <article class="item">
                        <img src=${cat.url} data-id=${cat.id} alt=${cat.name} class="loaded-image" />
                    </article>
                `;
          else
            return `
                    <article class="item">
                        <img data-src=${cat.url} data-id=${cat.id} alt=${cat.name} class="lazy-image" />
                    </article>
                `;
        })
        .join('');

      this.lazyLoadObserver();
      this.scrollObserver();

      sessionStorage.setItem('data', JSON.stringify(this.state.data));
    }
  }
}
