export default class ImageInfo {
    $imageInfo = null;
    data = null;
    loading = false;
    error = false;
  
    constructor({ $target, data }) {
      this.$target = $target;
      this.$imageInfo = document.createElement("div");
      this.$imageInfo.className = "ImageInfo"
      $target.appendChild(this.$imageInfo);

      this.$imageInfo.addEventListener('click', (e) => {
          if(e.target.className == "ImageInfo") this.close();
      })

      document.addEventListener('keydown', (e) => {
          if(e.key == 'Escape') this.close();
      })
  
      this.data = data;
    }

    close() {
        this.$imageInfo.style.display = "none"
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    render() {
      if(this.data.error) {
        this.$imageInfo.style.display = "none";
        const error = document.createElement('div');
        error.className = "info-error";
        error.innerText = `❌ ${this.data.error.message} `;
        this.$target.appendChild(error);
        setTimeout(() => {
          this.$target.removeChild(error);
        }, 4000);
        
        return;
      }

      if(this.data.loading) 
        this.$imageInfo.innerHTML = 
        `         
          <div class="info-loading"></div>
        `
      else {
        const { name, url, temperament, origin } = this.data.data;
  
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
        this.$imageInfo.style.display = "block";
        
        document.querySelector(".close").addEventListener('click', (e) => {
            this.close();
        })
      }
      this.$imageInfo.style.display = "block";
    }
  }
  