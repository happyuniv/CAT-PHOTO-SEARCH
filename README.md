# CAT-PHOTO-SEARCH

[![T](https://asset.programmers.co.kr/image/origin/production/skill_check_assignment/86753/cd420a1e-8a62-4d71-931b-2ef97c4a11ad.png)](https://school.programmers.co.kr/skill_check_assignments/4)
프로그래머스 과제테스트 연습 [고양이 사진 검색 사이트](https://school.programmers.co.kr/skill_check_assignments/4)
을 구현한 웹사이트

[**프로젝트 링크**](https://happyuniv-cat-photo-search.netlify.app/)

---

### Review
* 사용자 시스템 운영체제의 다크모드나 라이트 모드를 탐지

[prefers-color-scheme](https://developer.mozilla.org/ko/docs/Web/CSS/@media/prefers-color-scheme)<br/>
[matchMedia](https://developer.mozilla.org/ko/docs/Web/API/Window/matchMedia)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #000;
    --text-color: white;
  }
}
```
```javascript
        this.$darkButton = document.createElement('span');
        this.$darkButton.className = "dark-button"
        
        this.mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
        if(this.mode == 'light') this.$darkButton.textContent = '다크모드 전환'; 
        else this.$darkButton.textContent = '라이트모드 전환';
```
CSS 에서 prefers-color-schme 미디어쿼리를 통해 OS에 설정된 다크모드를 탐지하여 CSS 스타일의 변화를 줄 수 있고<br/>
JAVASCRIPT 에서는 matchMedia(미디어쿼리문자열).matches 를 통해 OS에 설정된 다크모드를 탐지하여 기능을 변경한다
<br/>
<br/>

* Node.insertBefore , Node.appendChild 를 통한 노드 위치 조정

[insertBefore](https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore)<br/>
[appendChild](https://developer.mozilla.org/ko/docs/Web/API/Node/appendChild)
```javascript
     ...
     prevButton.addEventListener('click', () => {
        carouselContainer.insertBefore(
          carouselContainer.lastElementChild,
          carouselContainer.firstElementChild
        );
        
        ...
        
     nextButton.addEventListener('click', () => {
        carouselContainer.appendChild(carouselContainer.firstElementChild);
       
       ...
       
```
캐러셀의 이전 버튼을 누르면 Node.insertBefore 을 통해 Node의 마지막 요소[(Element.lastElementChild)](https://developer.mozilla.org/en-US/docs/Web/API/Element/lastElementChild)를 첫번째 요소[(Element.firstElementChild)](https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild)로 이동시키고 </br>
캐러셀의 다음 버튼을 누르면 Node.appendChild 를 통해 Node의 첫번째 요소를 마지막 요소 위치로 이동시킨다
<br/>
<br/>

* IntersectionObserver 를 통한 infinity scroll 과 image lazy loading

[IntersectionObserver](https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver)
```javascript
  lazyLoadObserver() {
    const options = {};
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          entry.target.src = entry.target.dataset.src;
          entry.target.className = 'loaded-image';
        
          ...
          
    const io = new IntersectionObserver(callback, options);
    const lazyImages = Array.from(document.querySelectorAll('.lazy-image'));
    lazyImages.forEach((image) => io.observe(image));
    }
```
lazyLoadObserver 함수는 지연 이미지들 각각을 observe 해 해당 이미지가  교차하면 data-src -> src 로 변경시켜 이미지를 로드시킨다.

```javascript
  scrollObserver() {
    const options = {};
    const callback = (entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
        
          ...
          
                  images = await fetch...
                  observer.observe(lastImage[lastImage.length - 1]);
                  
          ...
         
    const io = new IntersectionObserver(callback, options);
    const lazyImages = Array.from(document.querySelectorAll('.lazy-image'));
    io.observe(lazyImages[lazyImages.length - 1]);
    }
```
scrollObserver 함수는 지연 이미지의 마지막 이미지를 observe 해 해당 이미지가 교차하면 이미지 데이터를 받아오고</br>
다시 마지막 이미지를 observe 해 이미지 데이터를 받아오는 것을 반복하면서 무한 스크롤을 구현
<br/>
<br/>

[다양한 Image Lazy Loading 기법](https://helloinyong.tistory.com/297#title-4)

