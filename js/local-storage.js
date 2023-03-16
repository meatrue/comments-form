const COMMENTS_STORAGE_NAME = 'comments';

const storage = {
  saveComments (items) {
    items =
      (items && items.length)
        ? items
        : [];
    localStorage.setItem(COMMENTS_STORAGE_NAME, JSON.stringify(items));
  },

  getComments () {
    const data = localStorage.getItem(COMMENTS_STORAGE_NAME);
    return data ? JSON.parse(data) : [];
  }
};


export { storage };
