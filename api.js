const API_ENDPOINT =
  'https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev';

function statusResponse(res) {
  if (res.status == 200) return res.json();
  if (res.status == 400)
    throw new Error('검색 결과가 없습니다. 다른 키워드로 검색해주세요!');
  if (res.status == 500)
    throw new Error(
      '서버에서 데이터를 불러오는데 실패하였습니다. 다시 시도해 주세요!'
    );
  throw new Error();
}

const api = {
  fetchCats: async (keyword) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    return statusResponse(res);
  },

  fetchCatsRandom: async () => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    return statusResponse(res);
  },

  fetchCatsID: async (id) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
    return statusResponse(res);
  },
};

export default api;
