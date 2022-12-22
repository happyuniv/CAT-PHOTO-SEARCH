export default class ImageInfo {
  state = {
    data: null,
    loading: false,
    error: null,
  };

  constructor({ $target }) {
    this.$target = $target;
    this.$imageInfo = document.createElement('div');
    this.$imageInfo.className = 'ImageInfo';
    $target.appendChild(this.$imageInfo);

    this.$imageInfo.addEventListener('click', (e) => {
      if (e.target.className == 'ImageInfo') this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') this.close();
    });
  }

  close() {
    this.$imageInfo.style.display = 'none';
  }

  setState(nextData) {
    this.state = nextData;
    this.render();
  }

  render() {
    if (this.state.error) {
      this.$imageInfo.style.display = 'none';
      const error = document.createElement('div');
      error.className = 'info-error';
      error.textContent = `❌ ${this.state.error.message} `;
      this.$target.appendChild(error);
      setTimeout(() => {
        this.$target.removeChild(error);
      }, 5000);

      return;
    }

    if (this.state.loading)
      this.$imageInfo.innerHTML = `
      <div class='loading-container'>
        <div class="info-loading"></div>
      </div>         
        `;
    else {
      const { name, url, temperament, origin } = this.state.data;

      this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">
                <span class="close-letter">X</span>
              </div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
      this.$imageInfo.style.display = 'block';

      document.querySelector('.close').addEventListener('click', (e) => {
        this.close();
      });
    }
    this.$imageInfo.style.display = 'block';
  }
}
