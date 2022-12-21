export default class Carousel {
    constructor($target) {
        this.$carousel = document.createElement('div');
        this.$carousel.className = "carousel";
        $target.appendChild(this.$carousel);
        
        const carouselWindow = document.createElement('div');
        carouselWindow.className = "window";
        this.$carousel.appendChild(carouselWindow);

        const carouselContainer = document.createElement('div');
        carouselContainer.className = "container";
        carouselWindow.appendChild(carouselContainer);

        const carouselImages = [
        "https://cdn2.thecatapi.com/images/IOetZNghN.jpg",
        "https://cdn2.thecatapi.com/images/-ZBBqoWNQ.jpg", 
        "https://cdn2.thecatapi.com/images/bCHc9dHit.jpg",
        "https://cdn2.thecatapi.com/images/BDMOZo668.jpg",
        "https://cdn2.thecatapi.com/images/CDhOtM-Ig.jpg"
        ];
        carouselImages.map((url) =>{
            const item = document.createElement('img');
            item.className = "item";
            item.src = url;
            carouselContainer.appendChild(item);
        })

        let currentIndex = 1;
        this.currentIndex = currentIndex;
        const lastIndex = carouselImages.length;
        this.lastIndex = lastIndex;
        this.indexContiner = document.createElement('div');
        this.indexContiner.className = 'index-container';
        this.indexContiner.textContent = ` ${currentIndex} / ${lastIndex} `;
        carouselWindow.appendChild(this.indexContiner);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = "button-container";
        const prevButton = document.createElement('button');
        prevButton.textContent = '이전';
        const nextButton = document.createElement('button');
        nextButton.textContent = '이후';
        buttonContainer.appendChild(prevButton);
        buttonContainer.appendChild(nextButton);
        this.$carousel.appendChild(buttonContainer);

        prevButton.addEventListener('click', () => {
            carouselContainer.insertBefore(carouselContainer.lastElementChild, carouselContainer.firstElementChild);
            this.currentIndex--;
            if(this.currentIndex == 0) this.currentIndex = lastIndex;
            this.render();
        })
        nextButton.addEventListener('click', () => {
            carouselContainer.appendChild(carouselContainer.firstElementChild);
            if(this.currentIndex == lastIndex) this.currentIndex = 0;
            this.currentIndex++;
            this.render();
        })

    }

    render() {
        this.indexContiner.textContent = ` ${this.currentIndex} / ${this.lastIndex} `;
    }
}