import api from './api.js';

export default class Carousel {
  state = {
    images: [],
    loading: false,
    error: null,
  };

  constructor($target) {
    this.$carousel = document.createElement('section');
    this.$carousel.className = 'carousel';
    $target.appendChild(this.$carousel);

    this.carouselWindow = document.createElement('div');
    this.carouselWindow.className = 'window';
    this.$carousel.appendChild(this.carouselWindow);

    this.init();
  }

  setState(next) {
    this.state = next;
    this.render();
  }

  async init() {
    try {
      this.setState({ ...this.state, loading: true, error: null });
      const res = await api.fetchCatsRandom();
      this.setState({
        ...this.state,
        images: res.data.slice(0, 5),
        loading: false,
      });
    } catch (e) {
      this.setState({ ...this.state, loading: false, error: e });
    }
  }

  render() {
    if (this.state.error)
      this.carouselWindow.innerHTML = `
        <div class='error'>${this.state.error.message}</div>
    `;
    else if (this.state.loading)
      this.carouselWindow.innerHTML = `
        <div class='loading'>
            <span class='spinner'>
        </div>
    `;
    else {
      this.carouselWindow.innerHTML = ``;
      const carouselContainer = document.createElement('div');
      carouselContainer.className = 'container';
      this.carouselWindow.appendChild(carouselContainer);

      carouselContainer.innerHTML = this.state.images
        .map(
          ({ url }) =>
            `
            <img class='item' src=${url} />
        `
        )
        .join('');

      let currentIndex = 1;
      const lastIndex = this.state.images.length;

      const indexContiner = document.createElement('div');
      indexContiner.className = 'index-container';
      indexContiner.textContent = ` ${currentIndex} / ${lastIndex} `;
      this.carouselWindow.appendChild(indexContiner);

      const prevButton = document.createElement('button');
      prevButton.className = 'prev';
      const nextButton = document.createElement('button');
      nextButton.className = 'next';
      this.carouselWindow.appendChild(prevButton);
      this.carouselWindow.appendChild(nextButton);

      prevButton.addEventListener('click', () => {
        carouselContainer.insertBefore(
          carouselContainer.lastElementChild,
          carouselContainer.firstElementChild
        );
        currentIndex--;
        if (currentIndex == 0) currentIndex = lastIndex;
        indexContiner.textContent = ` ${currentIndex} / ${lastIndex} `;
      });
      nextButton.addEventListener('click', () => {
        carouselContainer.appendChild(carouselContainer.firstElementChild);
        if (currentIndex == lastIndex) currentIndex = 0;
        currentIndex++;
        indexContiner.textContent = ` ${currentIndex} / ${lastIndex} `;
      });
    }
  }
}
