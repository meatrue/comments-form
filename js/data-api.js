/*const commentsDefault = [
  {
    id: 1,
    name: 'Александр',
    text: 'Это лучшее, что я видел в своей жизни',
    date: '12.03.2023',
    time: '16:31',
    like: false
  },

  {
    id: 2,
    name: 'Михаил',
    text: 'В целом всё прекрасно, но не всё...',
    date: '11.03.2023',
    time: '18:00',
    like: false
  },

  {
    id: 3,
    name: 'Кристина',
    text: 'Не представляю как можно сфотографировать море и закат лучше. Это просто апогей. После этого мы можем сжечь все фотоаппараты, потому что всё равно вершина достигнута.',
    date: '11.03.2023',
    time: '13:00',
    like: true
  },

  {
    id: 4,
    name: 'Анастасия',
    text: 'Моя бабушка снимает лучше',
    date: '10.03.2023',
    time: '11:00',
    like: false
  },

  {
    id: 5,
    name: 'Вячеслав',
    text: 'Всё отлично!',
    date: '09.03.2023',
    time: '20:03',
    like: false
  },

  {
    id: 6,
    name: 'Анна',
    text: 'Фокус размыт. Или это просто кто-то заляпал объектив?',
    date: '07.03.2023',
    time: '21:07',
    like: true
  },
];*/

class Comments {
  constructor() {
    this._comments = [];
  }

  setItems(items) {
    this._comments = [...items];
  }

  getItems() {
    return [...this._comments];
  }

  addItem(comment) {
    this._comments = [
      {
        id: Date.now(),
        ...comment,
        like: false
      },
      ...this._comments
    ];
  }

  deleteItem(id) {
    this._comments = this._comments.filter((comment) => comment.id !== id);
  }

  toggleLike(id) {
    const currentComment = this._comments.find((comment) => comment.id === id);
    currentComment.like = !currentComment.like;
  }
}

const comments = new Comments();

export { comments };
