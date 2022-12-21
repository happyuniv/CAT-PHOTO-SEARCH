export default class DarkButton {
    
    constructor($target) {
        this.$darkButton = document.createElement('span');
        this.$darkButton.className = "dark-button"

        this.mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
        if(this.mode == 'light') this.$darkButton.textContent = '다크모드 전환'; 
        else this.$darkButton.textContent = '라이트모드 전환';

        this.$darkButton.addEventListener('click', (e) => {
            this.toggle()
        })
        $target.appendChild(this.$darkButton);
    }

    toggle() {
        if(this.mode == 'dark') this.mode = 'light';
        else this.mode = 'dark';
        this.render();
    }

    render() {
        const body = document.querySelector('body');
        if(this.mode == 'dark') {
            body.className = 'dark'; 
            this.$darkButton.textContent = '라이트모드 전환'
        }
        else {
            body.className = 'light'; 
            this.$darkButton.textContent = '다크모드 전환'
        }
    }
}