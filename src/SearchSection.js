const TEMPLATE = '<input type="text">';

export default class SearchSection {
  constructor({ $target, onSearch }) {
    this.$target = $target;
    this.onSearch = onSearch;

    this.$searchSection = document.createElement('section');
    this.$searchSection.className = 'SearchSection';
    $target.appendChild(this.$searchSection);

    const savedKeyword = localStorage.getItem('keyword');
    if (savedKeyword) this.keywords = JSON.parse(savedKeyword);
    else this.keywords = [];

    const searchInput = document.createElement('input');
    searchInput.placeholder = '고양이를 검색해보세요.| ex)노르웨이, 먼치킨 ..';
    searchInput.className = 'SearchInput';
    searchInput.autofocus = true;
    searchInput.type = 'search';

    searchInput.addEventListener('click', (e) => {
      searchInput.value = '';
    });
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.addHistory(e.target.value);
        this.onSearch(searchInput.value);
      }
    });
    this.$searchSection.appendChild(searchInput);

    const randomButton = document.createElement('div');
    randomButton.className = 'random-btn-container';
    const randomButtonText = document.createElement('span');
    randomButtonText.className = 'random-btn-text';
    randomButtonText.innerText = '🐱랜덤 고양이 검색 버튼🐱';

    randomButtonText.addEventListener('click', (e) => {
      this.onSearch(null, true);
    });
    randomButton.appendChild(randomButtonText);
    this.$searchSection.appendChild(randomButton);

    this.history = document.createElement('div');
    this.history.className = 'History';
    this.$searchSection.appendChild(this.history);

    this.render();
  }

  addHistory(word) {
    if (this.keywords.includes(word)) return;
    if (this.keywords.length >= 5) this.keywords.shift();
    this.keywords.push(word);
    localStorage.setItem('keyword', JSON.stringify(this.keywords));
    this.render();
  }

  removeHistory(word) {
    this.keywords = this.keywords.filter((keyword) => keyword != word);
    localStorage.setItem('keyword', JSON.stringify(this.keywords));
    this.render();
  }

  render() {
    this.history.innerHTML = '';
    this.keywords.map((word) => {
      const keyword = document.createElement('div');
      keyword.className = 'keyword';
      keyword.textContent = word;

      const deleteKeyword = document.createElement('span');
      deleteKeyword.className = 'delete-keyword';
      deleteKeyword.textContent = 'x';

      this.history.appendChild(keyword);
      keyword.appendChild(deleteKeyword);
      keyword.addEventListener('click', (e) => {
        if (e.target.className == 'keyword') this.onSearch(word);
        else if (e.target.className == 'delete-keyword')
          this.removeHistory(word);
      });
    });
  }
}
